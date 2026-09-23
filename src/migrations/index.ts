import * as migration_20260731_083308_initial from './20260731_083308_initial';
import * as migration_20260808_200000_add_hero_cols_and_blocks from './20260808_200000_add_hero_cols_and_blocks';
import * as migration_20260808_210000_fix_header_footer_globals from './20260808_210000_fix_header_footer_globals';
import * as migration_20260808_215000_fix_svc_description_type from './20260808_215000_fix_svc_description_type';
import * as migration_20260808_220000_add_svc_v_tables from './20260808_220000_add_svc_v_tables';
import * as migration_20260808_230000_add_uuid_to_version_tables from './20260808_230000_add_uuid_to_version_tables';
import * as migration_20260812_100000_add_new_blocks from './20260812_100000_add_new_blocks';
import * as migration_20260814_064419 from './20260814_064419';
import * as migration_20260818_064111 from './20260818_064111';
import * as migration_20260909_133040_add_ecommerce_and_new_collections from './20260909_133040_add_ecommerce_and_new_collections';
import * as migration_20260910_200000_drop_not_null_block_columns from './20260910_200000_drop_not_null_block_columns';
import * as migration_20260910_210000_fix_block_enum_types from './20260910_210000_fix_block_enum_types';
import * as migration_20260911_020000_add_version_table_id_defaults from './20260911_020000_add_version_table_id_defaults';
import * as migration_20260911_070000_add_vision_mission_enums from './20260911_070000_add_vision_mission_enums';
import * as migration_20260912_080000_fix_about_section_content_type from './20260912_080000_fix_about_section_content_type';
import * as migration_20260922_061716 from './20260922_061716';
import * as migration_20260922_070000_add_media_files from './20260922_070000_add_media_files';
import * as migration_20260922_072218 from './20260922_072218';
import * as migration_20260922_124931 from './20260922_124931';
import * as migration_20260923_104853 from './20260923_104853';
import * as migration_20261001_000001_add_users_role from './20261001_000001_add_users_role';
import * as migration_20261001_100000_add_products_id_to_link_rels from './20261001_100000_add_products_id_to_link_rels';
import * as migration_20261001_120000_add_terms_content_column from './20261001_120000_add_terms_content_column';

export const migrations = [
  {
    up: migration_20260731_083308_initial.up,
    down: migration_20260731_083308_initial.down,
    name: '20260731_083308_initial',
  },
  {
    up: migration_20260808_200000_add_hero_cols_and_blocks.up,
    down: migration_20260808_200000_add_hero_cols_and_blocks.down,
    name: '20260808_200000_add_hero_cols_and_blocks',
  },
  {
    up: migration_20260808_210000_fix_header_footer_globals.up,
    down: migration_20260808_210000_fix_header_footer_globals.down,
    name: '20260808_210000_fix_header_footer_globals',
  },
  {
    up: migration_20260808_215000_fix_svc_description_type.up,
    down: migration_20260808_215000_fix_svc_description_type.down,
    name: '20260808_215000_fix_svc_description_type',
  },
  {
    up: migration_20260808_220000_add_svc_v_tables.up,
    down: migration_20260808_220000_add_svc_v_tables.down,
    name: '20260808_220000_add_svc_v_tables',
  },
  {
    up: migration_20260808_230000_add_uuid_to_version_tables.up,
    down: migration_20260808_230000_add_uuid_to_version_tables.down,
    name: '20260808_230000_add_uuid_to_version_tables',
  },
  {
    up: migration_20260812_100000_add_new_blocks.up,
    down: migration_20260812_100000_add_new_blocks.down,
    name: '20260812_100000_add_new_blocks',
  },
  {
    up: migration_20260814_064419.up,
    down: migration_20260814_064419.down,
    name: '20260814_064419',
  },
  {
    up: migration_20260818_064111.up,
    down: migration_20260818_064111.down,
    name: '20260818_064111',
  },
  {
    up: migration_20260909_133040_add_ecommerce_and_new_collections.up,
    down: migration_20260909_133040_add_ecommerce_and_new_collections.down,
    name: '20260909_133040_add_ecommerce_and_new_collections',
  },
  {
    up: migration_20260910_200000_drop_not_null_block_columns.up,
    down: migration_20260910_200000_drop_not_null_block_columns.down,
    name: '20260910_200000_drop_not_null_block_columns',
  },
  {
    up: migration_20260910_210000_fix_block_enum_types.up,
    down: migration_20260910_210000_fix_block_enum_types.down,
    name: '20260910_210000_fix_block_enum_types',
  },
  {
    up: migration_20260911_020000_add_version_table_id_defaults.up,
    down: migration_20260911_020000_add_version_table_id_defaults.down,
    name: '20260911_020000_add_version_table_id_defaults',
  },
  {
    up: migration_20260911_070000_add_vision_mission_enums.up,
    down: migration_20260911_070000_add_vision_mission_enums.down,
    name: '20260911_070000_add_vision_mission_enums',
  },
  {
    up: migration_20260912_080000_fix_about_section_content_type.up,
    down: migration_20260912_080000_fix_about_section_content_type.down,
    name: '20260912_080000_fix_about_section_content_type',
  },
  {
    up: migration_20260922_061716.up,
    down: migration_20260922_061716.down,
    name: '20260922_061716',
  },
  {
    up: migration_20260922_070000_add_media_files.up,
    down: migration_20260922_070000_add_media_files.down,
    name: '20260922_070000_add_media_files',
  },
  {
    up: migration_20260922_072218.up,
    down: migration_20260922_072218.down,
    name: '20260922_072218',
  },
  {
    up: migration_20260922_124931.up,
    down: migration_20260922_124931.down,
    name: '20260922_124931',
  },
  {
    up: migration_20260923_104853.up,
    down: migration_20260923_104853.down,
    name: '20260923_104853',
  },
  {
    up: migration_20261001_000001_add_users_role.up,
    down: migration_20261001_000001_add_users_role.down,
    name: '20261001_000001_add_users_role',
  },
  {
    up: migration_20261001_100000_add_products_id_to_link_rels.up,
    down: migration_20261001_100000_add_products_id_to_link_rels.down,
    name: '20261001_100000_add_products_id_to_link_rels'
  },
  {
    up: migration_20261001_120000_add_terms_content_column.up,
    down: migration_20261001_120000_add_terms_content_column.down,
    name: '20261001_120000_add_terms_content_column'
  },
];
