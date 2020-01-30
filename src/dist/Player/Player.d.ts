import Scenario from '../Scenario/Scenario';
export default class Player {
    id: string;
    name: string;
    resources: IResources;
    hasLost: boolean;
    isHuman: boolean;
    ai: (scenario: Scenario) => any[];
    color: string;
    constructor(name: string, isHuman: boolean, resources: IResources, color: string, ai?: (scenario: Scenario) => any[]);
}
interface IResources {
    actions: number;
    gold: number;
}
export declare enum PlayerType {
    Human = 0,
    AI = 1
}
export {};
