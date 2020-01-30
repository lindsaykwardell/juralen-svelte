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
var Rogue = /** @class */ (function (_super) {
    __extends(Rogue, _super);
    function Rogue(x, y, playerId) {
        var _this = _super.call(this, x, y, playerId) || this;
        _this.name = "Rogue";
        _this.cost = 5;
        _this.move = 1;
        _this.movesLeft = 2;
        _this.maxMoves = 2;
        _this.attack = 3;
        _this.health = 1;
        _this.maxHealth = 1;
        _this.range = 1;
        _this.description = "Offensive unit. Can move twice, and hides in the forest.";
        return _this;
    }
    return Rogue;
}(Unit_1.default));
exports.default = Rogue;
//# sourceMappingURL=Rogue.js.map