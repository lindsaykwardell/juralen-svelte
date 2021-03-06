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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = __importStar(require("../Cell"));
var Forest = /** @class */ (function (_super) {
    __extends(Forest, _super);
    function Forest(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.terrain = Cell_1.Terrain.Forest;
        _this.defBonus = 1;
        return _this;
    }
    return Forest;
}(Cell_1.default));
exports.default = Forest;
//# sourceMappingURL=Forest.js.map