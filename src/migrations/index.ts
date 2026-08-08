import * as migration_20260731_083308_initial from './20260731_083308_initial';
import * as migration_20260808_200000_add_hero_cols_and_blocks from './20260808_200000_add_hero_cols_and_blocks';

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
];

