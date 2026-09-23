import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Corrective migration for push-era type drift in Pages version-block tables.
 *
 * Root cause: tables created by 20260812 (before 20260814 created them properly)
 * and push-era DDL left `id` / `_parent_id` / `media_id` as varchar on a family of
 * version-side block tables, while Payload's runtime joins them to integer
 * `pages.id` / `_pages_v.id`. This broke admin queries with
 * `operator does not exist: character varying = integer`.
 *
 * Safety: every affected column was audited before writing - ALL are in 0-row
 * tables, so conversions are lossless. `NULLIF(col,'')::integer` will fail loudly
 * (aborting the transaction) if non-numeric data ever appears, rather than
 * silently destroying it.
 *
 * Mechanics:
 * - FKs touching a converted column are captured (name + full definition) into
 *   `_payload_fix_dropped_fks`, dropped, and re-added (tolerantly) after all
 *   conversions, when both sides are integer.
 * - varchar `id` columns get an owned sequence + `nextval` default to match
 *   Payload's own DDL (`id integer DEFAULT nextval('<table>_id_seq')`).
 * - `enum__outcome_cta_link_v_cta_card_cta_link_appearance` was created with only
 *   'default'; 'outline' is restored to match the main-table twin.
 * - The 9 extra push-era leftover tables are intentionally left untouched.
 */

type TableFix = { t: string; id?: boolean; parent?: boolean; media?: boolean }

const TABLES: TableFix[] = [
  // Main-table block rows join to pages.id (integer)
  { t: 'pricing_cards_link', parent: true },
  { t: 'outcome_cta_link', parent: true },
  // pages version-block tables
  { t: '_pages_v_blocks_full_width_banner', id: true },
  { t: '_pages_v_blocks_full_width_banner_links', id: true, parent: true },
  { t: '_pages_v_blocks_about_section', id: true },
  { t: '_pages_v_blocks_about_us', id: true },
  { t: '_pages_v_blocks_about_us_features', id: true, parent: true },
  { t: '_pages_v_blocks_about_us_card_points', id: true, parent: true },
  { t: '_pages_v_blocks_vision_mission', id: true },
  { t: '_pages_v_blocks_vision_mission_values', id: true, parent: true },
  { t: '_pages_v_blocks_procurement_solutions', id: true },
  { t: '_pages_v_blocks_services_section', id: true },
  { t: '_pages_v_blocks_services_section_services', id: true, parent: true },
  { t: '_pages_v_blocks_service_detail_section', id: true },
  { t: '_pages_v_blocks_how_we_work', id: true },
  { t: '_pages_v_blocks_how_we_work_steps', id: true, parent: true },
  { t: '_pages_v_blocks_interest_form', id: true },
  { t: '_pages_v_blocks_who_can_benefit', id: true },
  { t: '_pages_v_blocks_who_can_benefit_items', id: true, parent: true },
  { t: '_pages_v_blocks_blog_section', id: true },
  { t: '_pages_v_blocks_product_features', parent: true },
  { t: '_pages_v_blocks_product_statcards', parent: true },
  { t: '_pages_v_blocks_pricing_cards_cards', parent: true },
  { t: '_pages_v_blocks_pricing_cards_cards_features', parent: true },
  { t: '_pages_v_blocks_recent_clients_clients', parent: true },
  // svc (Services block) version family
  { t: '_svc_v', id: true, parent: true, media: true },
  { t: '_svc_v_items', id: true, parent: true },
  { t: '_svc_v_features', id: true, parent: true },
  // custom-dbName version tables
  { t: '_pricing_cards_link_v', id: true, parent: true },
  { t: '_pricing_cards_link_v_cards', parent: true },
  { t: '_outcome_cta_link_v', id: true, parent: true },
  { t: '_outcome_cta_link_v_cards', parent: true },
]

const isTextColumn = (t: string, col: string) =>
  `EXISTS (SELECT 1 FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = '${t}'
       AND column_name = '${col}' AND data_type IN ('character varying', 'text', 'character'))`

const captureInboundFks = (t: string) => `
    FOR rec IN
      SELECT con.conname AS conname, con.conrelid::regclass::text AS child,
             pg_get_constraintdef(con.oid) AS cdef
      FROM pg_constraint con
      WHERE con.contype = 'f' AND con.confrelid = '"${t}"'::regclass
    LOOP
      INSERT INTO _payload_fix_dropped_fks VALUES (rec.conname, rec.child, rec.cdef);
      EXECUTE 'ALTER TABLE ' || rec.child || ' DROP CONSTRAINT "' || rec.conname || '"';
    END LOOP;`

const captureOutboundFks = (t: string, col: string) => `
    FOR rec IN
      SELECT con.conname AS conname, con.conrelid::regclass::text AS child,
             pg_get_constraintdef(con.oid) AS cdef
      FROM pg_constraint con
      WHERE con.contype = 'f' AND con.conrelid = '"${t}"'::regclass
        AND EXISTS (SELECT 1 FROM pg_attribute a
                    WHERE a.attrelid = con.conrelid AND a.attnum = ANY (con.conkey)
                      AND a.attname = '${col}')
    LOOP
      INSERT INTO _payload_fix_dropped_fks VALUES (rec.conname, rec.child, rec.cdef);
      EXECUTE 'ALTER TABLE ' || rec.child || ' DROP CONSTRAINT "' || rec.conname || '"';
    END LOOP;`

const toInteger = (t: string, col: string) => `
      ALTER TABLE "${t}" ALTER COLUMN "${col}" DROP DEFAULT;
      ALTER TABLE "${t}" ALTER COLUMN "${col}" TYPE integer USING NULLIF("${col}", '')::integer;`

const idSequence = (t: string) => `
      EXECUTE 'DROP SEQUENCE IF EXISTS "${t}_id_seq"';
      EXECUTE 'CREATE SEQUENCE "${t}_id_seq" OWNED BY "${t}"."id"';
      EXECUTE 'ALTER TABLE "${t}" ALTER COLUMN "id" SET DEFAULT nextval(''${t}_id_seq''::regclass)';
      EXECUTE 'SELECT setval(''${t}_id_seq'', COALESCE((SELECT MAX("id") FROM "${t}"), 0) + 1, false)';`

const tableBlock = (fix: TableFix, i: number) => {
  const { t, id, parent, media } = fix
  const parts: string[] = []
  if (id) {
    parts.push(`
    IF ${isTextColumn(t, 'id')} THEN
      ${captureInboundFks(t)}
${toInteger(t, 'id')}${idSequence(t)}
    END IF;`)
  }
  if (parent) {
    parts.push(`
    IF ${isTextColumn(t, '_parent_id')} THEN
      ${captureOutboundFks(t, '_parent_id')}
${toInteger(t, '_parent_id')}
    END IF;`)
  }
  if (media) {
    parts.push(`
    IF ${isTextColumn(t, 'media_id')} THEN
      ${captureOutboundFks(t, 'media_id')}
${toInteger(t, 'media_id')}
    END IF;`)
  }
  return `DO $do_block_${i}$
DECLARE rec record;
BEGIN${parts.join('\n')}
END $do_block_${i}$;`
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 0. scratch table for captured FKs (fresh start in case of a prior failed attempt)
  await db.execute(sql.raw(`DROP TABLE IF EXISTS _payload_fix_dropped_fks;`))
  await db.execute(
    sql.raw(
      `CREATE TABLE _payload_fix_dropped_fks (conname text, child_rel text, cdef text);`,
    ),
  )

  // 1. per-table column conversions with dynamic FK capture
  for (let i = 0; i < TABLES.length; i++) {
    await db.execute(sql.raw(tableBlock(TABLES[i], i)))
  }

  // 2. restore missing enum value (version-side twin only has 'default')
  await db.execute(sql.raw(`
    DO $do_enum$
    BEGIN
      ALTER TYPE "enum__outcome_cta_link_v_cta_card_cta_link_appearance" ADD VALUE IF NOT EXISTS 'outline';
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $do_enum$;
  `))

  // 3. cosmetic drift (0-row tables): main about_section.content jsonb -> varchar
  await db.execute(sql.raw(`
    DO $do_about$
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_schema = 'public' AND table_name = 'pages_blocks_about_section'
                   AND column_name = 'content' AND data_type = 'jsonb') THEN
        ALTER TABLE "pages_blocks_about_section"
          ALTER COLUMN "content" TYPE varchar USING "content" #>> '{}';
      END IF;
    END $do_about$;
  `))

  // 4. cosmetic drift: vision_mission_values.icon varchar -> enum (main + version twin)
  await db.execute(sql.raw(`
    DO $do_vm$
    BEGIN
      IF ${isTextColumn('pages_blocks_vision_mission_values', 'icon')} THEN
        ALTER TABLE "pages_blocks_vision_mission_values"
          ALTER COLUMN "icon" TYPE enum_pages_blocks_vision_mission_values_icon
          USING NULLIF("icon", '')::text::enum_pages_blocks_vision_mission_values_icon;
      END IF;
      IF ${isTextColumn('_pages_v_blocks_vision_mission_values', 'icon')} THEN
        ALTER TABLE "_pages_v_blocks_vision_mission_values"
          ALTER COLUMN "icon" TYPE enum__pages_v_blocks_vision_mission_values_icon
          USING NULLIF("icon", '')::text::enum__pages_v_blocks_vision_mission_values_icon;
      END IF;
    EXCEPTION WHEN invalid_text_representation THEN NULL;
    END $do_vm$;
  `))

  // 5. re-add captured FKs (both sides integer now); tolerant of residual drift
  await db.execute(sql.raw(`
    DO $do_fk$
    DECLARE rec record;
    BEGIN
      FOR rec IN SELECT conname, child_rel, cdef FROM _payload_fix_dropped_fks LOOP
        BEGIN
          EXECUTE 'ALTER TABLE ' || rec.child_rel || ' ADD CONSTRAINT "' || rec.conname || '" ' || rec.cdef;
        EXCEPTION WHEN OTHERS THEN NULL;
        END;
      END LOOP;
    END $do_fk$;
  `))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS _payload_fix_dropped_fks;`))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Intentionally a no-op: restoring varchar types would re-create the bug.
}
