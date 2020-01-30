export default class Unit {
    id: string;
    name: string;
    cost: number;
    move: number;
    movesLeft: number;
    maxMoves: number;
    attack: number;
    health: number;
    maxHealth: number;
    range: number;
    description: string;
    controlledBy: string;
    x: number;
    y: number;
    constructor(x: number, y: number, playerId: string);
    isBuilt(): void;
    isClicked(): void;
    takeDamage(dmg: any): void;
    isDead(): boolean;
}
