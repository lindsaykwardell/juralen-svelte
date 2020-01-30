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
var Cell_1 = __importDefault(require("../../Cell/Cell"));
var Unit_1 = __importDefault(require("../../Units/Unit"));
var class_transformer_1 = require("class-transformer");
var Structure_1 = __importDefault(require("../../Cell/Structures/Structure"));
exports.default = (function (scenario) {
    var thisPlayer = scenario.Players().is(scenario.activePlayer);
    var enemyCells = scenario
        .Cells()
        .notControlledBy(scenario.activePlayer)
        .get();
    var getMoveList = function () {
        var results = [];
        scenario
            .Cells()
            .controlledBy(thisPlayer.id)
            .get()
            .forEach(function (cell) {
            if (cell.structure) {
                cell.structure.buildUnits.forEach(function (unit) {
                    var cost = function () {
                        switch (unit.toLowerCase()) {
                            case 'soldier':
                                return 1;
                            case 'warrior':
                                return 2;
                            case 'archer':
                                return 3;
                            case 'priest':
                                return 4;
                            case 'rogue':
                                return 5;
                            case 'knight':
                                return 6;
                            case 'wizard':
                                return 7;
                            default:
                                return 0;
                        }
                    };
                    if (thisPlayer.resources.gold >= cost()) {
                        results.push({
                            x: cell.x,
                            y: cell.y,
                            action: "build:" + unit,
                            desc: "Build " + unit,
                            id: []
                        });
                    }
                });
                if (cell.structure.name === 'Town' &&
                    thisPlayer.resources.gold >= 7) {
                    var roll = Math.floor(Math.random() * 51);
                    if (roll >= 0 && roll <= 10) {
                        results.push({
                            x: cell.x,
                            y: cell.y,
                            action: 'upgrade:Lodge',
                            desc: 'Upgrade to Lodge',
                            id: []
                        });
                    }
                    if (roll > 10 && roll <= 20) {
                        results.push({
                            x: cell.x,
                            y: cell.y,
                            action: 'upgrade:City',
                            desc: 'Upgrade to City',
                            id: []
                        });
                    }
                    if (roll > 20 && roll <= 30) {
                        results.push({
                            x: cell.x,
                            y: cell.y,
                            action: 'upgrade:Castle',
                            desc: 'Upgrade to Castle',
                            id: []
                        });
                    }
                    if (roll > 30 && roll <= 40) {
                        results.push({
                            x: cell.x,
                            y: cell.y,
                            action: 'upgrade:Academy',
                            desc: 'Upgrade to Academy',
                            id: []
                        });
                    }
                    if (roll > 40 && roll <= 50) {
                        results.push({
                            x: cell.x,
                            y: cell.y,
                            action: 'upgrade:Temple',
                            desc: 'Upgrade to Temple',
                            id: []
                        });
                    }
                    results.push({
                        x: cell.x,
                        y: cell.y,
                        action: 'upgrade:Castle',
                        desc: 'Upgrade to Castle',
                        id: []
                    });
                }
            }
            findUnitMoves(cell).forEach(function (result) { return results.push(result); });
        });
        return results;
    };
    var findUnitMoves = function (cell, units) {
        if (units === void 0) { units = []; }
        var results = [];
        scenario
            .Units()
            .atLoc(cell.x, cell.y)
            .controlledBy(thisPlayer.id)
            .get()
            .filter(function (unit) { return !units.find(function (u) { return u.id === unit.id; }); })
            .forEach(function (unit) {
            var baseMoveCost = unit.move;
            units.forEach(function (unit) {
                baseMoveCost += unit.move;
            });
            // Need to add Wizard check
            if (unit.movesLeft > 0 &&
                baseMoveCost <= thisPlayer.resources.actions) {
                var optimalMoves = getOptimalMove(cell, __spread(units, [unit]));
                optimalMoves.forEach(function (thisOptimalMove) {
                    if (thisOptimalMove.score > 0) {
                        results.push({
                            x: cell.x,
                            y: cell.y,
                            action: thisOptimalMove.isCombat ? 'attack' : 'move',
                            desc: "Move " + __spread(units, [unit]).map(function (unit) { return unit.name; }),
                            id: __spread(units, [unit]).map(function (unit) { return unit.id; }),
                            coords: { x: thisOptimalMove.x, y: thisOptimalMove.y }
                        });
                    }
                });
                results = __spread(results, findUnitMoves(cell, __spread(units, [unit])));
            }
        });
        return results;
    };
    var getOptimalMove = function (thisCell, units) {
        var moveOptions = [];
        scenario
            .Cells()
            .get()
            .forEach(function (cell) {
            if (cell.terrain !== 'Mountain') {
                var distance = scenario.getDistance(thisCell, cell);
                var moveCost = scenario.getMoveCost(units);
                var thisCost = distance * moveCost;
                var score = 10;
                if (thisPlayer.resources.actions >= thisCost && distance !== 0) {
                    var distanceToEnemy_1 = 100;
                    enemyCells.forEach(function (enemyCell) {
                        var thisDistanceToEnemy = scenario.getDistance(cell, enemyCell);
                        if (distanceToEnemy_1 > thisDistanceToEnemy) {
                            distanceToEnemy_1 = thisDistanceToEnemy;
                        }
                    });
                    var isCombat = false;
                    if (scenario
                        .Units()
                        .atLoc(cell.x, cell.y)
                        .notControlledBy(thisPlayer.id)
                        .count() > 0) {
                        var won = 0;
                        var lost = 0;
                        for (var i = 0; i < 5; i++) {
                            if (simulateCombat({ x: cell.x, y: cell.y }, { x: thisCell.x, y: thisCell.y }))
                                won++;
                            else
                                lost++;
                        }
                        // console.log('Won', won, 'Lost', lost)
                        if (won > lost) {
                            isCombat = true;
                            score += 15;
                        }
                        else
                            score -= 1000;
                    }
                    var thisMove = {
                        x: cell.x,
                        y: cell.y,
                        cost: distance * moveCost,
                        structure: cell.structure,
                        distanceToEnemy: distanceToEnemy_1,
                        score: score,
                        isCombat: isCombat
                    };
                    moveOptions.push(thisMove);
                }
            }
        });
        return moveOptions;
    };
    var simulateCombat = function (defCell, atkCell) {
        var thisCell = class_transformer_1.plainToClass(Cell_1.default, __assign({}, scenario.Cells().atLoc(defCell.x, defCell.y)));
        thisCell.structure = class_transformer_1.plainToClass(Structure_1.default, __assign({}, thisCell.structure));
        var notMe = scenario
            .Units()
            .atLoc(defCell.x, defCell.y)
            .notControlledBy(thisPlayer.id)
            .get()[0].controlledBy;
        var atkPlr = thisPlayer;
        var defPlr = scenario.Players().is(notMe);
        var units = __spread(scenario
            .Units()
            .atLoc(defCell.x, defCell.y)
            .get(), scenario
            .Units()
            .atLoc(atkCell.x, atkCell.y)
            .get()).map(function (unit) { return class_transformer_1.plainToClass(Unit_1.default, __assign({}, unit)); });
        var atkUnits = function () { return units.filter(function (unit) { return unit.controlledBy === atkPlr.id; }); };
        var defUnits = function () {
            return units.filter(function (unit) { return unit.controlledBy === defPlr.id; });
        };
        var _loop_1 = function () {
            var attacker = Math.floor(Math.random() * atkUnits().length);
            var defender = Math.floor(Math.random() * defUnits().length);
            // Attacker deals first damage
            // If cell has defBonus, and attacker is me, hit that first.
            // Rogues don't care about cell defBonus.
            // Priests don't attack
            if (atkUnits()[attacker].name !== 'Priest') {
                if (thisCell.defBonus > 0 &&
                    atkPlr.id === thisPlayer.id &&
                    atkUnits()[attacker].name !== 'Rogue') {
                    thisCell.takeDamage(atkUnits()[attacker].attack);
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
                // If structure has health, and defender is me, hit that first.
                // Rogues don't care about structure health.
                if (thisCell.defBonus > 0 &&
                    defPlr.id === thisPlayer.id &&
                    defUnits()[defender].name !== 'Rogue') {
                    thisCell.defBonus -= defUnits()[defender].attack;
                }
                else {
                    atkUnits()[attacker].health -= defUnits()[defender].attack;
                }
            }
            // If one of the characters is a priest,
            // heal all of that player's units by one
            // (except the priest)
            if (atkUnits()[attacker].name === 'Priest') {
                atkUnits().forEach(function (unit, index) {
                    if (index !== attacker && unit.health < unit.maxHealth) {
                        unit.health++;
                    }
                });
            }
            if (defUnits()[defender].name === 'Priest') {
                defUnits().forEach(function (unit, index) {
                    if (index !== defender && unit.health < unit.maxHealth) {
                        unit.health++;
                    }
                });
            }
            // Remove defender if dead.
            if (defUnits()[defender].health <= 0) {
                units = units.filter(function (unit) { return unit.id !== defUnits()[defender].id; });
            }
            // Remove attacker if dead.
            if (atkUnits()[attacker].health <= 0) {
                units = units.filter(function (unit) { return unit.id !== atkUnits()[attacker].id; });
            }
            if (units.filter(function (unit) { return unit.name !== 'Priest'; }).length <= 0) {
                units.forEach(function (unit) {
                    unit.controlledBy = notMe;
                });
            }
            // Switch who goes first
            if (atkPlr === thisPlayer) {
                atkPlr = scenario.Players().is(notMe);
                defPlr = thisPlayer;
            }
            else {
                atkPlr = thisPlayer;
                defPlr = scenario.Players().is(notMe);
            }
        };
        while (atkUnits().length > 0 && defUnits().length > 0) {
            _loop_1();
        }
        return units.filter(function (unit) { return unit.controlledBy === thisPlayer.id; }).length > 0;
    };
    var scoreMove = function (a) {
        var score = 10;
        if (a.action.includes('attack')) {
            score +=
                10 -
                    scenario.getDistance({ x: a.x, y: a.y }, { x: a.coords.x, y: a.coords.y });
            if (scenario.Cells().atLoc(a.coords.y, a.coords.y).structure)
                score += 100;
            // Give precedence to attacking the current leader or the weakest opponent.
            if (scenario.Cells().atLoc(a.coords.y, a.coords.y).controlledBy ===
                scenario.firstPlace().id ||
                scenario.Cells().atLoc(a.coords.y, a.coords.y).controlledBy ===
                    scenario.lastPlace().id)
                score += 15;
        }
        if (a.action.includes('build')) {
            var action_1 = a.action.split(':');
            if (scenario
                .Units()
                .atLoc(a.x, a.y)
                .count() > 4)
                score -= scenario
                    .Units()
                    .atLoc(a.x, a.y)
                    .count();
            var cost = function () {
                switch (action_1[1]) {
                    case 'Soldier':
                        return 1;
                    case 'Warrior':
                        score++;
                        return 2;
                    case 'Archer':
                        score++;
                        return 3;
                    case 'Priest':
                        if (scenario
                            .Units()
                            .atLoc(a.x, a.y)
                            .controlledBy(thisPlayer.id)
                            .count() <= 0)
                            score -= 1000;
                        else {
                            var onlyPriests_1 = true;
                            scenario
                                .Units()
                                .atLoc(a.x, a.y)
                                .controlledBy(thisPlayer.id)
                                .get()
                                .forEach(function (unit) {
                                if (unit.name !== 'Priest') {
                                    onlyPriests_1 = false;
                                    if (unit.health < unit.maxHealth)
                                        score += 3;
                                }
                            });
                            if (onlyPriests_1)
                                score -= 1000;
                            else
                                score++;
                        }
                        return 4;
                    case 'Rogue':
                        score += 2;
                        return 5;
                    case 'Knight':
                        score += 3;
                        return 6;
                    case 'Wizard':
                        score += 2;
                        return 7;
                    default:
                        return 0;
                }
            };
            if (scenario
                .Units()
                .controlledBy(thisPlayer.id)
                .count() >=
                scenario
                    .Cells()
                    .controlledBy(thisPlayer.id)
                    .count() ||
                thisPlayer.resources.gold < cost()) {
                score -= 1000;
            }
            else {
                score += Math.abs(scenario
                    .Units()
                    .atLoc(a.x, a.y)
                    .count() - 8);
                if (scenario
                    .Cells()
                    .controlledBy(thisPlayer.id)
                    .count() /
                    2 >=
                    scenario
                        .Units()
                        .controlledBy(thisPlayer.id)
                        .count())
                    score += 2;
                var distanceToEnemy_2 = 100;
                scenario
                    .Cells()
                    .notControlledBy(thisPlayer.id)
                    .hasUnit()
                    .get()
                    .forEach(function (cell) {
                    var thisDistanceToEnemy = scenario.getDistance({ x: a.x, y: a.y }, { x: cell.x, y: cell.y });
                    if (distanceToEnemy_2 < thisDistanceToEnemy)
                        distanceToEnemy_2 = thisDistanceToEnemy;
                });
                if (distanceToEnemy_2 <= 4) {
                    if (scenario
                        .Units()
                        .atLoc(a.x, a.y)
                        .count() <=
                        scenario
                            .Units()
                            .notControlledBy(thisPlayer.id)
                            .withinDistance(4, { x: a.x, y: a.y })
                            .count()) {
                        score += 100;
                    }
                }
            }
        }
        if (a.action.includes('move')) {
            score +=
                5 -
                    scenario.getDistance({ x: a.x, y: a.y }, { x: a.coords.x, y: a.coords.y });
            if (scenario.Cells().atLoc(a.coords.x, a.coords.y).controlledBy !==
                thisPlayer.id)
                score += 5;
            if (scenario
                .Cells()
                .controlledBy(thisPlayer.id)
                .count() <=
                scenario
                    .Units()
                    .controlledBy(thisPlayer.id)
                    .count()) {
                score += 10;
            }
            if (scenario.Cells().atLoc(a.x, a.y).structure &&
                scenario
                    .Units()
                    .atLoc(a.x, a.y)
                    .count() -
                    a.id.length <=
                    0) {
                score -= 5;
            }
            if (scenario
                .Units()
                .notControlledBy(thisPlayer.id)
                .withinDistance(1, { x: a.coords.x, y: a.coords.y })
                .get()
                .find(function (unit) { return scenario.Cells().atLoc(unit.x, unit.y).structure; })) {
                score += scenario
                    .Units()
                    .atLoc(a.coords.x, a.coords.y)
                    .controlledBy(thisPlayer.id)
                    .count();
            }
            if (scenario
                .Units()
                .controlledBy(thisPlayer.id)
                .atLoc(a.coords.x, a.coords.y)
                .count() > 4) {
                score -= 1000;
            }
            if (scenario.Cells().atLoc(a.coords.x, a.coords.y).structure &&
                scenario.Cells().atLoc(a.coords.x, a.coords.y).controlledBy !=
                    thisPlayer.id &&
                scenario
                    .Units()
                    .atLoc(a.coords.x, a.coords.y)
                    .count() <= 0)
                score += 100;
            // Give precedence to attacking the current leader or the weakest opponent.
            if (scenario.Cells().atLoc(a.coords.y, a.coords.y).controlledBy ===
                scenario.firstPlace().id ||
                scenario.Cells().atLoc(a.coords.y, a.coords.y).controlledBy ===
                    scenario.lastPlace().id)
                score += 15;
        }
        return score;
    };
    var results = getMoveList();
    results.forEach(function (result) {
        result.score = scoreMove(result);
    });
    results.sort(function (a, b) {
        var scorea = a.score;
        var scoreb = b.score;
        if (scorea === scoreb) {
            enemyCells.forEach(function (cell) {
                var adiff = scenario.getDistance({ x: a.x, y: a.y }, { x: cell.x, y: cell.y });
                var bdiff = scenario.getDistance({ x: b.x, y: b.y }, { x: cell.x, y: cell.y });
                if (adiff > bdiff)
                    scoreb++;
                if (adiff < bdiff)
                    scorea++;
            });
        }
        return scoreb - scorea;
    });
    return results;
});
//# sourceMappingURL=Standard.js.map