import * as migration_20260731_083308_initial from './20260731_083308_initial';

export const migrations = [
  {
    up: migration_20260731_083308_initial.up,
    down: migration_20260731_083308_initial.down,
    name: '20260731_083308_initial'
  },
];
