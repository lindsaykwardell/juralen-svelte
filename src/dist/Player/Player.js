"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = __importDefault(require("uuid/v4"));
var Standard_1 = __importDefault(require("./AI/Standard"));
var Player = /** @class */ (function () {
    function Player(name, isHuman, resources, color, ai) {
        this.id = v4_1.default();
        this.name = name;
        this.resources = resources;
        this.hasLost = false;
        this.isHuman = isHuman;
        this.ai = ai ? ai : Standard_1.default;
        this.color = color;
    }
    return Player;
}());
exports.default = Player;
var PlayerType;
(function (PlayerType) {
    PlayerType[PlayerType["Human"] = 0] = "Human";
    PlayerType[PlayerType["AI"] = 1] = "AI";
})(PlayerType = exports.PlayerType || (exports.PlayerType = {}));
//# sourceMappingURL=Player.js.map