"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Unit_1 = __importDefault(require("./Unit"));
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    function Wizard(x, y, playerId) {
        var _this = _super.call(this, x, y, playerId) || this;
        _this.name = "Wizard";
        _this.cost = 7;
        _this.move = 0.5;
        _this.movesLeft = 2;
        _this.maxMoves = 2;
        _this.attack = 2;
        _this.health = 2;
        _this.maxHealth = 2;
        _this.range = 2;
        _this.description =
            "Highly mobile unit. Capable of teleporting other units across the board. Can also move twice.";
        return _this;
    }
    return Wizard;
}(Unit_1.default));
exports.default = Wizard;
//# sourceMappingURL=Wizard.js.map