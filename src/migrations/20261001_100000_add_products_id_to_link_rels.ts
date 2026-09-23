import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Add `products_id` to the relationship join tables of every collection/global
 * that uses the shared `link()` field.
 *
 * Root cause: `src/fields/link.ts` extended `reference.relationTo` with
 * `'products'` (to make "Ecommerce Products" selectable as an internal link),
 * but the DB columns were never migrated. Payload writes relationship values
 * into `<collection>_rels` / `_<collection>_v_rels` tables with one column per
 * relationTo, so the admin Pages list query now selects
 * `"_pages_v__rels"."products_id"` which does not exist -> "Failed query".
 *
 * Affected tables (verified via information_schema):
 * - pages_rels / _pages_v_rels   (Pages blocks: hero, cta, content, product cards, ...)
 * - header_rels / footer_rels    (globals, not versioned)
 * - products_rels / _products_v_rels (Product blocks use link() too)
 *
 * Matches Payload's own DDL conventions: plain integer column, btree index
 * `<_table>_products_id_idx`, FK `<_table>_products_fk` ON DELETE SET NULL.
 */

const TABLES = [
  'pages_rels',
  '_pages_v_rels',
  'header_rels',
  'footer_rels',
  'products_rels',
  '_products_v_rels',
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of TABLES) {
    await db.execute(sql.raw(`
      DO $do_${table.replace(/[^a-z0-9]/gi, '')}$
      BEGIN
        ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "products_id" integer;
        CREATE INDEX IF NOT EXISTS "${table}_products_id_idx" ON "${table}" USING btree ("products_id");
        BEGIN
          ALTER TABLE "${table}" ADD CONSTRAINT "${table}_products_fk"
            FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE SET NULL;
        EXCEPTION WHEN duplicate_object THEN NULL;
        END;
      END $do_${table.replace(/[^a-z0-9]/gi, '')}$;
    `))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Intentionally a no-op: dropping the columns from a shared join table would
  // break any saved product links. Column is nullable, so keeping it is safe.
}