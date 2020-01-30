"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cell = /** @class */ (function () {
    function Cell(x, y) {
        this.x = x;
        this.y = y;
        this.structure = null;
        this.terrain = null;
        this.defBonus = 0;
        this.controlledBy = null;
        this.passable = true;
    }
    Cell.prototype.takeDamage = function (damage) {
        this.defBonus -= damage;
    };
    Cell.prototype.fortify = function () {
        this.defBonus++;
    };
    Cell.prototype.buildStructure = function (struct) {
        if (this.structure) {
            var newStruct = new struct();
            newStruct.buildUnits = __spread(new Set(__spread(newStruct.buildUnits, this.structure.buildUnits)));
            this.structure = newStruct;
        }
        else {
            this.structure = new struct();
        }
        this.terrain = Terrain.Plains;
        this.defBonus = this.structure.initDefBonus;
        this.passable = true;
    };
    return Cell;
}());
exports.default = Cell;
var Terrain;
(function (Terrain) {
    Terrain["Plains"] = "Plains";
    Terrain["Forest"] = "Forest";
    Terrain["Mountain"] = "Mountain";
})(Terrain = exports.Terrain || (exports.Terrain = {}));
//# sourceMappingURL=Cell.js.map