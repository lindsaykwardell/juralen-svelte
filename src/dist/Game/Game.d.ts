import 'reflect-metadata';
import Unit from '../Units/Unit';
import Cell from '../Cell/Cell';
export default class Game {
    private scenario;
    private x;
    private y;
    selectedUnitList: string[];
    gameOver: boolean;
    private callback;
    constructor(playerList: {
        name: string;
        isHuman: boolean;
        color: string;
    }[], grid?: {
        x: number;
        y: number;
    }, callback?: () => null);
    init: () => void;
    scorecard: () => {
        id: string;
        name: string;
        score: number;
    }[];
    getPlayer: (id: string) => import("../Player/Player").default | undefined;
    selectCell: (x: number, y: number) => void;
    selectUnit: (id: string) => void;
    selectableUnits: () => Unit[];
    upgradeTo: (structName: string) => Promise<unknown>;
    selectAllUnits: () => void;
    unselectUnit: (id: string) => void;
    unselectAllUnits: () => void;
    buildUnit: (unitName: string) => Promise<unknown>;
    getCellsInRange: () => {
        x: number;
        y: number;
    }[];
    moveSelectedUnits: (x: number, y: number) => Promise<unknown>;
    performCombat: (x: number, y: number) => void;
    isInRange: (x: number, y: number) => boolean;
    getMoveCost: () => number;
    endTurn: () => Promise<unknown>;
    gatherResources: () => void;
    analyze: () => any[];
    runComputerTurn: () => Promise<unknown>;
    runComputerAction: (s: any) => Promise<unknown>;
    farmsOwnedBy: (id: string) => number;
    townsOwnedBy: (id: string) => number;
    activePlayer: () => import("../Player/Player").default | undefined;
    selectedCell: () => Cell;
    selectedUnits: () => Unit[];
    private getDistance;
    Units: () => import("../Scenario/Scenario").IUnitSet;
    Cells: () => import("../Scenario/Scenario").ICellSet;
    Players: () => import("../Scenario/Scenario").IPlayerSet;
    export: () => string;
    import: (json: string) => void;
}
