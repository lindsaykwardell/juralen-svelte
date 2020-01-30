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
var Structure_1 = __importDefault(require("./Structure"));
var Units_1 = require("../../Units/Units");
var Fortress = /** @class */ (function (_super) {
    __extends(Fortress, _super);
    function Fortress() {
        var _this = _super.call(this) || this;
        _this.name = 'Fortress';
        _this.buildUnits = [Units_1.Soldier, Units_1.Warrior];
        _this.initDefBonus = 7;
        return _this;
    }
    Fortress.structureName = 'Fortress';
    return Fortress;
}(Structure_1.default));
exports.default = Fortress;
//# sourceMappingURL=Fortress.js.map