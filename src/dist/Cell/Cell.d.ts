import Structure from './Structures/Structure';
export default class Cell {
    x: number;
    y: number;
    structure: Structure | null;
    terrain: Terrain | null;
    defBonus: number;
    controlledBy: string | null;
    passable: boolean;
    constructor(x: number, y: number);
    takeDamage(damage: any): void;
    fortify(): void;
    buildStructure(struct: typeof Structure): void;
}
export declare enum Terrain {
    Plains = "Plains",
    Forest = "Forest",
    Mountain = "Mountain"
}
