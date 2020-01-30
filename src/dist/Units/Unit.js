"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = __importDefault(require("uuid/v4"));
var Unit = /** @class */ (function () {
    function Unit(x, y, playerId) {
        this.x = x;
        this.y = y;
        this.id = v4_1.default();
        this.name = 'Unit';
        this.cost = 0;
        this.move = 0;
        this.movesLeft = 0;
        this.maxMoves = 0;
        this.attack = 0;
        this.health = 0;
        this.maxHealth = 0;
        this.range = 0;
        this.description = "You shouldn't see this.";
        this.controlledBy = playerId;
    }
    Unit.prototype.isBuilt = function () {
        // if (isElectron && sfx.built[this.name]) {
        //   const audio = new Audio();
        //   audio.src = sfx.built[this.name];
        //   audio.play();
        // }
    };
    Unit.prototype.isClicked = function () {
        // if (isElectron && sfx.clicked[this.name]) {
        //   const audio = new Audio();
        //   audio.src = sfx.clicked[this.name];
        //   audio.play();
        // }
    };
    Unit.prototype.takeDamage = function (dmg) {
        this.health -= dmg;
    };
    Unit.prototype.isDead = function () {
        if (this.health <= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return Unit;
}());
exports.default = Unit;
//# sourceMappingURL=Unit.js.map