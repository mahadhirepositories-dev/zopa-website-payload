import * as migration_20260731_083308_initial from './20260731_083308_initial';
import * as migration_20260808_200000_add_hero_cols_and_blocks from './20260808_200000_add_hero_cols_and_blocks';
import * as migration_20260808_210000_fix_header_footer_globals from './20260808_210000_fix_header_footer_globals';
import * as migration_20260808_215000_fix_svc_description_type from './20260808_215000_fix_svc_description_type';
import * as migration_20260808_220000_add_svc_v_tables from './20260808_220000_add_svc_v_tables';
import * as migration_20260808_230000_add_uuid_to_version_tables from './20260808_230000_add_uuid_to_version_tables';

export const migrations = [
  {
    up: migration_20260731_083308_initial.up,
    down: migration_20260731_083308_initial.down,
    name: '20260731_083308_initial'
  },
  {
    up: migration_20260808_200000_add_hero_cols_and_blocks.up,
    down: migration_20260808_200000_add_hero_cols_and_blocks.down,
    name: '20260808_200000_add_hero_cols_and_blocks'
  },
  {
    up: migration_20260808_210000_fix_header_footer_globals.up,
    down: migration_20260808_210000_fix_header_footer_globals.down,
    name: '20260808_210000_fix_header_footer_globals'
  },
  {
    up: migration_20260808_215000_fix_svc_description_type.up,
    down: migration_20260808_215000_fix_svc_description_type.down,
    name: '20260808_215000_fix_svc_description_type'
  },
  {
    up: migration_20260808_220000_add_svc_v_tables.up,
    down: migration_20260808_220000_add_svc_v_tables.down,
    name: '20260808_220000_add_svc_v_tables'
  },
  {
    up: migration_20260808_230000_add_uuid_to_version_tables.up,
    down: migration_20260808_230000_add_uuid_to_version_tables.down,
    name: '20260808_230000_add_uuid_to_version_tables'
  },
];




