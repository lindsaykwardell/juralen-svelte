import Unit from './Unit';
export { default as Soldier } from './Soldier';
export { default as Rogue } from './Rogue';
export { default as Knight } from './Knight';
export { default as Archer } from './Archer';
export { default as Wizard } from './Wizard';
export { default as Priest } from './Priest';
export { default as Warrior } from './Warrior';
export declare const findUnit: (name: string) => typeof Unit;
