import Scenario from '../../Scenario/Scenario';
declare const _default: (scenario: Scenario) => IAction[];
export default _default;
interface IAction {
    x: number;
    y: number;
    action: string;
    desc: string;
    id: string[];
    coords?: {
        x: number;
        y: number;
    };
    score?: number;
}
