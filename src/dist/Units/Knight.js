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
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(x, y, playerId) {
        var _this = _super.call(this, x, y, playerId) || this;
        _this.name = "Knight";
        _this.cost = 6;
        _this.move = 1;
        _this.movesLeft = 3;
        _this.maxMoves = 3;
        _this.attack = 2;
        _this.health = 4;
        _this.maxHealth = 4;
        _this.range = 1;
        _this.description = "Strong mobile unit. Can move three times.";
        return _this;
    }
    return Knight;
}(Unit_1.default));
exports.default = Knight;
//# sourceMappingURL=Knight.js.map