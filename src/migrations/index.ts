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
    name: '20260909_133040_add_ecommerce_and_new_collections'
  },
];
