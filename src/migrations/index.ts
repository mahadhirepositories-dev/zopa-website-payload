import * as migration_20260731_083308_initial from './20260731_083308_initial';
import * as migration_20260808_200000_add_hero_cols_and_blocks from './20260808_200000_add_hero_cols_and_blocks';
import * as migration_20260808_210000_fix_header_footer_globals from './20260808_210000_fix_header_footer_globals';

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
];

