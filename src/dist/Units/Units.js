"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Unit_1 = __importDefault(require("./Unit"));
var Soldier_1 = __importDefault(require("./Soldier"));
var Archer_1 = __importDefault(require("./Archer"));
var Rogue_1 = __importDefault(require("./Rogue"));
var Knight_1 = __importDefault(require("./Knight"));
var Priest_1 = __importDefault(require("./Priest"));
var Wizard_1 = __importDefault(require("./Wizard"));
var Warrior_1 = __importDefault(require("./Warrior"));
var Soldier_2 = require("./Soldier");
exports.Soldier = Soldier_2.default;
var Rogue_2 = require("./Rogue");
exports.Rogue = Rogue_2.default;
var Knight_2 = require("./Knight");
exports.Knight = Knight_2.default;
var Archer_2 = require("./Archer");
exports.Archer = Archer_2.default;
var Wizard_2 = require("./Wizard");
exports.Wizard = Wizard_2.default;
var Priest_2 = require("./Priest");
exports.Priest = Priest_2.default;
var Warrior_2 = require("./Warrior");
exports.Warrior = Warrior_2.default;
exports.findUnit = function (name) {
    switch (name.toLowerCase()) {
        case 'soldier':
            return Soldier_1.default;
        case 'archer':
            return Archer_1.default;
        case 'rogue':
            return Rogue_1.default;
        case 'knight':
            return Knight_1.default;
        case 'priest':
            return Priest_1.default;
        case 'wizard':
            return Wizard_1.default;
        case 'warrior':
            return Warrior_1.default;
        default:
            return Unit_1.default;
    }
};
//# sourceMappingURL=Units.js.map