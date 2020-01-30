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
var Academy = /** @class */ (function (_super) {
    __extends(Academy, _super);
    function Academy() {
        var _this = _super.call(this) || this;
        _this.name = 'Academy';
        _this.buildUnits = ['Soldier', 'Wizard'];
        _this.initDefBonus = 5;
        return _this;
    }
    Academy.structureName = 'Academy';
    return Academy;
}(Structure_1.default));
exports.default = Academy;
//# sourceMappingURL=Academy.js.map