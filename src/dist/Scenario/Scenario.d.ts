import Cell from '../Cell/Cell';
import Player from '../Player/Player';
import Unit from '../Units/Unit';
export default class Scenario {
    private x;
    private y;
    grid: Cell[][];
    private players;
    units: Unit[];
    activePlayer: string;
    private objectives;
    constructor(playerList: {
        name: string;
        isHuman: boolean;
        color: string;
    }[], grid?: {
        x: number;
        y: number;
    });
    private generateGrid;
    private generateCell;
    Units: () => IUnitSet;
    addUnit: (newUnit: Unit) => void;
    removeUnit: (deadUnit: Unit) => void;
    Cells: () => ICellSet;
    Players: () => IPlayerSet;
    firstPlace: () => {
        id: string;
        name: string;
        score: number;
    };
    lastPlace: () => {
        id: string;
        name: string;
        score: number;
    } | undefined;
    checkScores: () => {
        id: string;
        name: string;
        score: number;
    }[];
    checkObjectives: (id: string) => Promise<unknown>;
    private gridSize;
    getDistance: (loc1: {
        x: number;
        y: number;
    }, loc2: {
        x: number;
        y: number;
    }) => number;
    getMoveCost: (units: Unit[]) => number;
    export: () => string;
    import: (json: any) => void;
}
export interface IUnitSet {
    unitSet: Unit[];
    refresh: (val: Unit[]) => IUnitSet;
    atLoc: (x: number, y: number) => IUnitSet;
    withinDistance: (val: number, cell: {
        x: number;
        y: number;
    }) => IUnitSet;
    controlledBy: (id: string) => IUnitSet;
    notControlledBy: (id: string) => IUnitSet;
    get: () => Unit[];
    is: (names: string[]) => IUnitSet;
    count(): number;
}
export interface ICellSet {
    unitSet: Unit[];
    cellSet: Cell[];
    grid: Cell[][];
    atLoc: (x: number, y: number) => Cell;
    withinDistance: (val: number, cell: {
        x: number;
        y: number;
    }) => ICellSet;
    inRow: (row: number) => ICellSet;
    inCol: (col: number) => ICellSet;
    hasStructure: (name?: string[]) => ICellSet;
    hasUnit: (name?: string[]) => ICellSet;
    controlledBy: (id: string) => ICellSet;
    notControlledBy: (id: string) => ICellSet;
    get: () => Cell[];
    count: () => number;
}
export interface IPlayerSet {
    playerSet: Player[];
    next: (id: string) => Player;
    is: (id: string) => Player | undefined;
    hasNotLost: () => IPlayerSet;
    random: () => Player;
    get: () => Player[];
    count: () => number;
}
