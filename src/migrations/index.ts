import * as migration_20260731_083308_initial from './20260731_083308_initial';
import * as migration_20260808_144700_add_missing_tables from './20260808_144700_add_missing_tables';

export const migrations = [
  {
    up: migration_20260731_083308_initial.up,
    down: migration_20260731_083308_initial.down,
    name: '20260731_083308_initial'
  },
  {
    up: migration_20260808_144700_add_missing_tables.up,
    down: migration_20260808_144700_add_missing_tables.down,
    name: '20260808_144700_add_missing_tables'
  },
];
