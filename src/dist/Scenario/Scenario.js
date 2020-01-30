"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = __importDefault(require("../Cell/Cell"));
var Plains_1 = __importDefault(require("../Cell/Terrain/Plains"));
var Mountain_1 = __importDefault(require("../Cell/Terrain/Mountain"));
var Forest_1 = __importDefault(require("../Cell/Terrain/Forest"));
var Structures_1 = require("../Cell/Structures/Structures");
var Player_1 = __importDefault(require("../Player/Player"));
var Unit_1 = __importDefault(require("../Units/Unit"));
var Units_1 = require("../Units/Units");
var Citadel_1 = __importDefault(require("../Cell/Structures/Citadel"));
var natural_order_1 = __importDefault(require("natural-order"));
var class_transformer_1 = require("class-transformer");
var Structure_1 = __importDefault(require("../Cell/Structures/Structure"));
var Scenario = /** @class */ (function () {
    function Scenario(playerList, grid) {
        var _this = this;
        if (grid === void 0) { grid = { x: 9, y: 9 }; }
        this.generateGrid = function () {
            var grid = [];
            for (var y = 0; y < _this.y; y++) {
                var row = [];
                for (var x = 0; x < _this.x; x++) {
                    var thisCell = _this.generateCell(x, y);
                    row.push(thisCell);
                }
                grid.push(row);
            }
            return grid;
        };
        this.Units = function () {
            UnitSet.unitSet = _this.units;
            return UnitSet;
        };
        this.addUnit = function (newUnit) {
            _this.units = __spread(_this.units.map(function (unit) { return unit; }), [newUnit]);
        };
        this.removeUnit = function (deadUnit) {
            _this.units = __spread(_this.units.map(function (unit) { return unit; })).filter(function (unit) { return unit.id !== deadUnit.id; });
        };
        this.Cells = function () {
            CellSet.cellSet = [];
            CellSet.grid = _this.grid;
            CellSet.unitSet = _this.units;
            _this.grid.forEach(function (row) {
                row.forEach(function (cell) { return CellSet.cellSet.push(cell); });
            });
            return CellSet;
        };
        this.Players = function () {
            PlayerSet.playerSet = _this.players;
            return PlayerSet;
        };
        this.firstPlace = function () {
            return _this.checkScores().filter(function (player) { return player.id !== _this.activePlayer; })[0];
        };
        this.lastPlace = function () {
            return _this.checkScores()
                .filter(function (player) { return player.id !== _this.activePlayer; })
                .pop();
        };
        this.checkScores = function () {
            var scorecard = [];
            _this.Players()
                .hasNotLost()
                .get()
                .forEach(function (player) {
                var score = 0;
                score += _this.Cells()
                    .controlledBy(player.id)
                    .count();
                score += _this.Cells()
                    .controlledBy(player.id)
                    .hasStructure()
                    .count();
                score +=
                    _this.Cells()
                        .controlledBy(player.id)
                        .hasStructure(['Citadel'])
                        .count() * 2;
                _this.Units()
                    .controlledBy(player.id)
                    .get()
                    .forEach(function (unit) { return (score += unit.cost); });
                scorecard.push({ id: player.id, name: player.name, score: score });
            });
            return natural_order_1.default(scorecard, ['score'], 'desc');
        };
        this.checkObjectives = function (id) {
            return new Promise(function (resolve, reject) {
                var thisPlayer = _this.players.find(function (player) { return player.id === id; });
                _this.objectives.forEach(function (objective) {
                    switch (objective.objective) {
                        case Objective.BoardControl:
                            if (_this.Cells()
                                .controlledBy(id)
                                .count() >=
                                _this.gridSize() / objective.value) {
                                _this.players.find(function (player) { return player.id === id; }).hasLost = false;
                                reject(true);
                            }
                            break;
                        case Objective.BelowMinTownCount:
                            if (_this.Cells()
                                .controlledBy(thisPlayer.id)
                                .hasStructure()
                                .count() <= 0) {
                                _this.players.find(function (player) { return player.id === id; }).hasLost = true;
                                reject(false);
                            }
                            break;
                        default:
                        // Do nothing
                    }
                });
                resolve();
            });
        };
        this.getDistance = getDistance;
        this.getMoveCost = function (units) {
            var moveCost = 0;
            units.forEach(function (unit) {
                moveCost += unit.move;
            });
            return moveCost;
        };
        this.export = function () {
            return JSON.stringify(_this);
        };
        this.import = function (json) {
            var data = JSON.parse(json);
            _this.x = data.x;
            _this.y = data.y;
            _this.grid = data.grid.map(function (row) {
                return row.map(function (cell) {
                    var thisCell = class_transformer_1.plainToClass(Cell_1.default, __assign({}, cell));
                    thisCell.structure = cell.structure
                        ? class_transformer_1.plainToClass(Structure_1.default, __assign({}, cell.structure))
                        : cell.structure;
                    return thisCell;
                });
            });
            _this.players = data.players.map(function (player) { return class_transformer_1.plainToClass(Player_1.default, player); });
            _this.units = data.units.map(function (unit) { return class_transformer_1.plainToClass(Unit_1.default, unit); });
            _this.activePlayer = data.activePlayer;
            _this.objectives = data.objectives;
        };
        this.x = grid.x;
        this.y = grid.y;
        this.grid = this.generateGrid();
        this.players = [];
        this.units = [];
        playerList.forEach(function (newPlayer) {
            _this.players.push(new Player_1.default(newPlayer.name, newPlayer.isHuman, {
                actions: 4,
                gold: 2
            }, newPlayer.color));
        });
        this.players.forEach(function (player) {
            var done = false;
            while (!done) {
                var x = Math.floor(Math.random() * _this.x);
                var y = Math.floor(Math.random() * _this.y);
                var cell = _this.grid[y][x];
                if (!cell.structure &&
                    _this.Cells()
                        .withinDistance(1, { x: x, y: y })
                        .hasStructure()
                        .count() <= 0) {
                    cell.controlledBy = player.id;
                    cell.buildStructure(Citadel_1.default);
                    for (var i = 0; i < 3; i++) {
                        _this.units.push(new Units_1.Soldier(cell.x, cell.y, player.id));
                    }
                    done = true;
                }
            }
        });
        this.activePlayer = this.Players().random().id;
        this.objectives = [
            {
                objective: Objective.BoardControl,
                value: 2
            },
            {
                objective: Objective.BelowMinTownCount,
                value: 0
            }
        ];
    }
    Scenario.prototype.generateCell = function (x, y) {
        var roll = Math.floor(Math.random() * 101);
        if (roll <= 12) {
            // Make a Plains with a Town
            var cell_1 = new Plains_1.default(x, y);
            cell_1.buildStructure(Structures_1.Town);
            return cell_1;
        }
        if (roll > 12 && roll <= 20) {
            // Make a Mountain
            var cell_2 = new Mountain_1.default(x, y);
            return cell_2;
        }
        if (roll > 20 && roll <= 40) {
            // Make a Forest
            var cell_3 = new Forest_1.default(x, y);
            return cell_3;
        }
        var cell = new Plains_1.default(x, y);
        return cell;
    };
    Scenario.prototype.gridSize = function () {
        return this.x * this.y;
    };
    return Scenario;
}());
exports.default = Scenario;
var Objective;
(function (Objective) {
    Objective[Objective["BoardControl"] = 0] = "BoardControl";
    Objective[Objective["BelowMinTownCount"] = 1] = "BelowMinTownCount";
})(Objective || (Objective = {}));
var UnitSet = {
    unitSet: [],
    refresh: function (val) {
        this.unitSet = val;
        return this;
    },
    atLoc: function (x, y) {
        this.unitSet = this.unitSet.filter(function (unit) { return unit.x === x && unit.y === y; });
        return this;
    },
    withinDistance: function (val, cell) {
        this.unitSet = this.unitSet.filter(function (unit) {
            return val >= getDistance({ x: unit.x, y: unit.y }, { x: cell.x, y: cell.y });
        });
        return this;
    },
    controlledBy: function (id) {
        this.unitSet = this.unitSet.filter(function (unit) { return unit.controlledBy === id; });
        return this;
    },
    notControlledBy: function (id) {
        this.unitSet = this.unitSet.filter(function (unit) { return unit.controlledBy !== id; });
        return this;
    },
    is: function (names) {
        this.unitSet = this.unitSet.filter(function (unit) { return names.includes(unit.name); });
        return this;
    },
    get: function () {
        return __spread(this.unitSet);
    },
    count: function () {
        return this.unitSet.length;
    }
};
var CellSet = {
    unitSet: [],
    cellSet: [],
    grid: [],
    atLoc: function (x, y) {
        this.cellSet = this.cellSet.filter(function (cell) { return cell.x === x && cell.y === y; });
        return this.cellSet[0];
    },
    withinDistance: function (val, outerCell) {
        this.cellSet = this.cellSet.filter(function (cell) {
            return val >=
                getDistance({ x: cell.x, y: cell.y }, { x: outerCell.x, y: outerCell.y });
        });
        return this;
    },
    inRow: function (row) {
        this.cellSet = this.cellSet.filter(function (cell) { return cell.x === row; });
        return this;
    },
    inCol: function (col) {
        this.cellSet = this.cellSet.filter(function (cell) { return cell.x === col; });
        return this;
    },
    hasStructure: function (struct) {
        this.cellSet = this.cellSet.filter(function (cell) {
            return cell.structure &&
                (struct ? struct.includes(cell.structure.name) : true);
        });
        return this;
    },
    hasUnit: function (names) {
        var _this = this;
        this.cellSet = this.cellSet.filter(function (cell) {
            return UnitSet.refresh(_this.unitSet)
                .atLoc(cell.x, cell.y)
                .count() > 0 && (names ? UnitSet.is(names) : true);
        });
        return this;
    },
    controlledBy: function (id) {
        this.cellSet = this.cellSet.filter(function (cell) { return cell.controlledBy === id; });
        return this;
    },
    notControlledBy: function (id) {
        this.cellSet = this.cellSet.filter(function (cell) { return cell.controlledBy !== id; });
        return this;
    },
    get: function () {
        return this.cellSet;
    },
    count: function () {
        return this.cellSet.length;
    }
};
var PlayerSet = {
    playerSet: [],
    next: function (id) {
        var activePlayers = this.hasNotLost().get();
        var key = activePlayers.findIndex(function (player) { return player.id === id; });
        if (key + 1 === activePlayers.length)
            return activePlayers[0];
        else
            return activePlayers[key + 1];
    },
    is: function (id) {
        return this.playerSet.find(function (player) { return player.id === id; });
    },
    hasNotLost: function () {
        this.playerSet = this.playerSet.filter(function (player) { return !player.hasLost; });
        return this;
    },
    random: function () {
        return this.playerSet[Math.floor(Math.random() * this.count())];
    },
    get: function () {
        return this.playerSet;
    },
    count: function () {
        return this.playerSet.length;
    }
};
var getDistance = function (loc1, loc2) { return Math.abs(loc1.x - loc2.x) + Math.abs(loc1.y - loc2.y); };
//# sourceMappingURL=Scenario.js.map