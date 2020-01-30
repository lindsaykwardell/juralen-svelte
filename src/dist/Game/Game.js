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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Scenario_1 = __importDefault(require("../Scenario/Scenario"));
var Castle_1 = __importDefault(require("../Cell/Structures/Castle"));
var Units_1 = require("../Units/Units");
var Structure_1 = __importDefault(require("../Cell/Structures/Structure"));
var Academy_1 = __importDefault(require("../Cell/Structures/Academy"));
var Temple_1 = __importDefault(require("../Cell/Structures/Temple"));
var City_1 = __importDefault(require("../Cell/Structures/City"));
var Lodge_1 = __importDefault(require("../Cell/Structures/Lodge"));
var Game = /** @class */ (function () {
    function Game(playerList, grid, callback) {
        var _this = this;
        if (grid === void 0) { grid = { x: 9, y: 9 }; }
        if (callback === void 0) { callback = function () { return null; }; }
        this.gameOver = false;
        this.init = function () {
            _this.callback();
        };
        this.scorecard = function () {
            return _this.scenario.checkScores();
        };
        this.getPlayer = function (id) {
            return _this.scenario.Players().is(id);
        };
        this.selectCell = function (x, y) {
            _this.x = x;
            _this.y = y;
            _this.selectedUnitList = [];
            _this.callback();
        };
        this.selectUnit = function (id) {
            _this.selectedUnitList.push(id);
            _this.callback();
        };
        this.selectableUnits = function () {
            return _this.scenario
                .Units()
                .atLoc(_this.selectedCell().x, _this.selectedCell().y)
                .controlledBy(_this.activePlayer().id)
                .get()
                .filter(function (unit) { return unit.movesLeft > 0 && !_this.selectedUnitList.includes(unit.id); });
        };
        this.upgradeTo = function (structName) {
            return new Promise(function (resolve, reject) {
                if (_this.selectedCell().structure &&
                    _this.selectedCell().structure.name === 'Town' &&
                    _this.activePlayer().resources.gold >= 7) {
                    var struct = Structure_1.default;
                    switch (structName) {
                        case 'castle':
                            struct = Castle_1.default;
                            break;
                        case 'academy':
                            struct = Academy_1.default;
                            break;
                        case 'temple':
                            struct = Temple_1.default;
                            break;
                        case 'city':
                            struct = City_1.default;
                            break;
                        case 'lodge':
                            struct = Lodge_1.default;
                            break;
                    }
                    _this.activePlayer().resources.gold -= 7;
                    _this.selectedCell().buildStructure(struct);
                    _this.callback();
                    resolve("A " + struct.structureName + " has been built at " + _this.selectedCell().x + "," + _this.selectedCell().y + " by " + _this.activePlayer().name);
                }
                else
                    reject('You cannot build a ${struct.structureName} here.');
            });
        };
        this.selectAllUnits = function () {
            _this.selectedUnitList = _this.scenario
                .Units()
                .atLoc(_this.selectedCell().x, _this.selectedCell().y)
                .controlledBy(_this.activePlayer().id)
                .get()
                .map(function (unit) { return unit.id; });
            _this.callback();
        };
        this.unselectUnit = function (id) {
            _this.selectedUnitList = _this.selectedUnitList.filter(function (unit) { return unit !== id; });
            _this.callback();
        };
        this.unselectAllUnits = function () {
            _this.selectedUnitList = [];
            _this.callback();
        };
        this.buildUnit = function (unitName) {
            var unit = Units_1.findUnit(unitName);
            return new Promise(function (resolve, reject) {
                var newUnit = new unit(_this.selectedCell().x, _this.selectedCell().y, _this.scenario.activePlayer);
                if (_this.activePlayer().resources.gold - newUnit.cost < 0)
                    reject("You do not have enough gold!");
                else if (_this.farmsOwnedBy(_this.activePlayer().id) <=
                    _this.scenario
                        .Units()
                        .controlledBy(_this.activePlayer().id)
                        .count())
                    reject("You do not have enough farms!");
                else {
                    _this.scenario.addUnit(newUnit);
                    _this.activePlayer().resources.gold -= newUnit.cost;
                    resolve(_this.activePlayer().name + " built a " + unit.name + " in " + _this.selectedCell().x + ", " + _this.selectedCell().y);
                }
                _this.callback();
            });
        };
        this.getCellsInRange = function () {
            var inRangeCells = [];
            _this.scenario
                .Cells()
                .get()
                .forEach(function (cell) {
                if (_this.isInRange(cell.x, cell.y)) {
                    inRangeCells.push({ x: cell.x, y: cell.y });
                }
            });
            return inRangeCells;
        };
        this.moveSelectedUnits = function (x, y) {
            return new Promise(function (resolve, reject) {
                if (_this.isInRange(x, y) &&
                    _this.getDistance({ x: _this.selectedCell().x, y: _this.selectedCell().y }, { x: x, y: y }) > 0) {
                    _this.activePlayer().resources.actions -=
                        _this.getMoveCost() *
                            _this.getDistance({ x: x, y: y }, { x: _this.selectedCell().x, y: _this.selectedCell().y });
                    _this.selectedUnits().forEach(function (unit) {
                        unit.x = x;
                        unit.y = y;
                        unit.movesLeft--;
                    });
                    _this.selectedUnitList = [];
                    _this.selectCell(x, y);
                    if (_this.scenario
                        .Units()
                        .atLoc(x, y)
                        .notControlledBy(_this.activePlayer().id)
                        .count() > 0) {
                        _this.performCombat(x, y);
                    }
                    _this.scenario.Cells().atLoc(x, y).controlledBy = _this.scenario
                        .Units()
                        .atLoc(x, y)
                        .get()[0].controlledBy;
                    resolve(_this.activePlayer().name + " has moved units to " + x + "," + y);
                }
                else {
                    reject("We can't get there.");
                }
                _this.callback();
            });
        };
        this.performCombat = function (x, y) {
            var thisCell = _this.scenario.Cells().atLoc(x, y);
            var notMe = _this.scenario
                .Units()
                .atLoc(x, y)
                .notControlledBy(_this.activePlayer().id)
                .get()[0].controlledBy;
            var atkPlr = _this.activePlayer();
            var defPlr = _this.getPlayer(notMe);
            var atkUnits = function () {
                return _this.scenario
                    .Units()
                    .atLoc(x, y)
                    .controlledBy(atkPlr.id)
                    .get();
            };
            var defUnits = function () {
                return _this.scenario
                    .Units()
                    .atLoc(x, y)
                    .controlledBy(defPlr.id)
                    .get();
            };
            var _loop_1 = function () {
                var attacker = Math.floor(Math.random() * atkUnits().length);
                var defender = Math.floor(Math.random() * defUnits().length);
                console.log(atkUnits()[attacker].name + " is attacking " + defUnits()[defender].name);
                // Attacker deals first damage
                // If cell has defBonus, and attacker is me, hit that first.
                // Rogues don't care about cell defBonus.
                // Priests don't attack
                if (atkUnits()[attacker].name !== 'Priest') {
                    if (thisCell.defBonus > 0 &&
                        atkPlr.id === _this.activePlayer().id &&
                        atkUnits()[attacker].name !== 'Rogue') {
                        thisCell.takeDamage(atkUnits()[attacker].attack);
                        console.log("Defense bonus reduced to " + thisCell.defBonus);
                    } // Otherwise, hit the unit.
                    else {
                        defUnits()[defender].health -= atkUnits()[attacker].attack;
                    }
                }
                // If defender is still alive AND is in range, attack back.
                // Priests don't attack, but are never in range.
                // So we don't need an additional check for priest here.
                if (defUnits()[defender].health > 0 &&
                    defUnits()[defender].range >= atkUnits()[attacker].range) {
                    console.log(defUnits()[defender].name + " is attacking " + atkUnits()[attacker].name);
                    // If structure has health, and defender is me, hit that first.
                    // Rogues don't care about structure health.
                    if (thisCell.defBonus > 0 &&
                        defPlr.id === _this.activePlayer().id &&
                        defUnits()[defender].name !== 'Rogue') {
                        thisCell.defBonus -= defUnits()[defender].attack;
                        console.log("Defense bonus reduced to " + thisCell.defBonus);
                    }
                    else {
                        atkUnits()[attacker].health -= defUnits()[defender].attack;
                    }
                }
                // If one of the characters is a priest,
                // heal all of that player's units by one
                // (except the priest)
                if (atkUnits()[attacker].name === 'Priest') {
                    console.log(atkPlr.name + "'s priest is healing the party...");
                    atkUnits().forEach(function (unit, index) {
                        if (index !== attacker && unit.health < unit.maxHealth) {
                            unit.health++;
                        }
                    });
                }
                if (defUnits()[defender].name === 'Priest') {
                    console.log(defPlr.name + " priest is healing the party...");
                    defUnits().forEach(function (unit, index) {
                        if (index !== defender && unit.health < unit.maxHealth) {
                            unit.health++;
                        }
                    });
                }
                // Remove defender if dead.
                if (defUnits()[defender].health <= 0) {
                    console.log(defPlr.name + "'s " + defUnits()[defender].name + " is dead!");
                    _this.scenario.removeUnit(defUnits()[defender]);
                }
                // Remove attacker if dead.
                if (atkUnits()[attacker].health <= 0) {
                    console.log(atkPlr.name + "'s " + atkUnits()[attacker].name + " is dead!");
                    _this.scenario.removeUnit(atkUnits()[attacker]);
                }
                if (_this.scenario
                    .Units()
                    .atLoc(x, y)
                    .get()
                    .filter(function (unit) { return unit.name !== 'Priest'; }).length <= 0) {
                    _this.scenario
                        .Units()
                        .atLoc(x, y)
                        .controlledBy(_this.activePlayer().id)
                        .get()
                        .forEach(function (unit) {
                        console.log(_this.activePlayer().name + "'s " + unit.name + " has surrendered and joined with " + _this.getPlayer(notMe).name + "!");
                        unit.controlledBy = notMe;
                    });
                }
                // Switch who goes first
                if (atkPlr === _this.activePlayer()) {
                    atkPlr = _this.getPlayer(notMe);
                    defPlr = _this.activePlayer();
                }
                else {
                    atkPlr = _this.activePlayer();
                    defPlr = _this.getPlayer(notMe);
                }
            };
            while (atkUnits().length > 0 && defUnits().length > 0) {
                _loop_1();
            }
        };
        this.isInRange = function (x, y) {
            return (_this.selectedUnitList.length > 0 &&
                _this.scenario.Cells().atLoc(x, y).passable !== false &&
                _this.activePlayer().resources.actions >=
                    _this.getMoveCost() *
                        _this.getDistance({ x: x, y: y }, { x: _this.selectedCell().x, y: _this.selectedCell().y }));
        };
        this.getMoveCost = function () {
            var cost = 0;
            var wizard = null;
            _this.selectedUnits().forEach(function (unit) {
                cost += unit.move;
                if (unit.name === 'Wizard')
                    wizard = unit;
            });
            if (wizard) {
                cost = _this.selectedUnitList.length * wizard.move;
            }
            return cost;
        };
        this.endTurn = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var allPriests, prevPlayer;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.scenario
                                        .Cells()
                                        .hasStructure()
                                        .get()
                                        .forEach(function (cell) {
                                        if (cell.defBonus < cell.structure.initDefBonus)
                                            cell.defBonus++;
                                    });
                                    this.scenario
                                        .Units()
                                        .get()
                                        .forEach(function (unit) {
                                        unit.movesLeft = unit.maxMoves;
                                    });
                                    allPriests = this.scenario
                                        .Units()
                                        .is(['Priest'])
                                        .get();
                                    allPriests.forEach(function (priest) {
                                        var units = _this.scenario
                                            .Units()
                                            .atLoc(priest.x, priest.y)
                                            .get();
                                        units.forEach(function (unit) {
                                            if (unit.id !== priest.id && unit.health < unit.maxHealth) {
                                                console.log('Healing!');
                                                unit.health++;
                                            }
                                        });
                                    });
                                    prevPlayer = this.activePlayer().id;
                                    this.scenario.activePlayer = this.scenario
                                        .Players()
                                        .next(this.activePlayer().id).id;
                                    return [4 /*yield*/, this.scenario.checkObjectives(prevPlayer).catch(function (result) {
                                            if (result) {
                                                console.log(_this.scenario.Players().is(prevPlayer).name + " has won!");
                                                _this.gameOver = true;
                                                reject();
                                            }
                                            else {
                                                console.log(_this.scenario.Players().is(prevPlayer).name + " has lost!");
                                            }
                                        })];
                                case 1:
                                    _a.sent();
                                    if (this.scenario
                                        .Players()
                                        .hasNotLost()
                                        .count() === 1) {
                                        console.log(this.scenario
                                            .Players()
                                            .hasNotLost()
                                            .get()[0].name + " has won!");
                                        this.gameOver = true;
                                        reject();
                                    }
                                    this.gatherResources();
                                    this.callback();
                                    resolve(this.activePlayer().name + "'s turn");
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        }); };
        this.gatherResources = function () {
            var farms = _this.farmsOwnedBy(_this.activePlayer().id);
            var towns = _this.townsOwnedBy(_this.activePlayer().id);
            _this.activePlayer().resources.actions = towns + 3;
            _this.activePlayer().resources.gold += farms;
        };
        this.analyze = function () {
            return _this.activePlayer().ai(_this.scenario);
        };
        this.runComputerTurn = function () {
            return new Promise(function (resolve, reject) {
                var prevOption = {};
                var prevCount = 0;
                var runningTurn = setInterval(function () {
                    _this.callback();
                    var options = _this.analyze();
                    var action = options.length > 0 ? options[0] : null;
                    if (!action)
                        resolve();
                    if (options.length > 0 && options[0].score >= 0) {
                        if (JSON.stringify(prevOption) === JSON.stringify(options[0])) {
                            if (prevCount >= 5) {
                                clearInterval(runningTurn);
                                resolve();
                            }
                            else {
                                prevCount++;
                                _this.runComputerAction(options[0])
                                    .then(function (res) { return console.log(res); })
                                    .catch(function (res) { return console.log(res); });
                            }
                        }
                        else {
                            prevOption = options[0];
                            _this.runComputerAction(options[0])
                                .then(function (res) { return console.log(res); })
                                .catch(function (res) { return console.log(res); });
                        }
                    }
                    else {
                        clearInterval(runningTurn);
                        resolve();
                    }
                }, 500);
            });
        };
        this.runComputerAction = function (s) { return __awaiter(_this, void 0, void 0, function () {
            var option, option;
            var _this = this;
            return __generator(this, function (_a) {
                if (s.action.includes('build')) {
                    option = s.action.split(':');
                    this.selectCell(s.x, s.y);
                    return [2 /*return*/, this.buildUnit(option[1])];
                }
                if (s.action.includes('upgrade')) {
                    option = s.action.split(':');
                    this.selectCell(s.x, s.y);
                    return [2 /*return*/, this.upgradeTo(option[1].toLowerCase())];
                }
                if (s.action.includes('move') || s.action.includes('attack')) {
                    this.selectCell(s.x, s.y);
                    s.id.forEach(function (id) {
                        _this.selectUnit(id);
                    });
                    return [2 /*return*/, this.moveSelectedUnits(s.coords.x, s.coords.y)];
                }
                return [2 /*return*/];
            });
        }); };
        this.farmsOwnedBy = function (id) {
            return _this.scenario
                .Cells()
                .controlledBy(id)
                .count();
        };
        this.townsOwnedBy = function (id) {
            return _this.scenario
                .Cells()
                .controlledBy(id)
                .hasStructure()
                .count();
        };
        this.activePlayer = function () {
            return _this.scenario.Players().is(_this.scenario.activePlayer);
        };
        this.selectedCell = function () { return _this.scenario.Cells().atLoc(_this.x, _this.y); };
        this.selectedUnits = function () {
            return _this.scenario
                .Units()
                .get()
                .filter(function (unit) { return _this.selectedUnitList.includes(unit.id); });
        };
        this.getDistance = function (loc1, loc2) { return Math.abs(loc1.x - loc2.x) + Math.abs(loc1.y - loc2.y); };
        this.Units = function () { return _this.scenario.Units(); };
        this.Cells = function () { return _this.scenario.Cells(); };
        this.Players = function () { return _this.scenario.Players(); };
        this.export = function () {
            return JSON.stringify(__assign(__assign({}, _this), { scenario: _this.scenario.export() }));
        };
        this.import = function (json) {
            var data = JSON.parse(json);
            _this.scenario.import(data.scenario);
            _this.x = data.x;
            _this.y = data.y;
            _this.gameOver = data.gameOver;
        };
        this.scenario = new Scenario_1.default(playerList, grid);
        var startingCell = this.scenario
            .Cells()
            .controlledBy(this.scenario.activePlayer)
            .hasStructure(['Citadel'])
            .get()[0];
        this.x = startingCell.x;
        this.y = startingCell.y;
        this.selectedUnitList = [];
        this.callback = callback;
        console.log('The Game has begun!');
        console.log(this.activePlayer().name + " will begin.");
        console.log(' ');
    }
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=Game.js.map