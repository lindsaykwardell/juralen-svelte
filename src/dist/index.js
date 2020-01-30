"use strict";
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
var inquirer_1 = __importDefault(require("inquirer"));
var Game_1 = __importDefault(require("./Game/Game"));
var readline_1 = __importDefault(require("readline"));
var Castle_1 = __importDefault(require("./Cell/Structures/Castle"));
var Town_1 = __importDefault(require("./Cell/Structures/Town"));
var table_1 = require("table");
var randomcolor_1 = __importDefault(require("randomcolor"));
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
var homedir = os_1.default.homedir();
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var renderCell, getCommand, game, playerCount, size, sizeInput, input, newPlayers, i, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                renderCell = function (cell) { return "" + (cell.controlledBy
                    ? "*** " + game.getPlayer(cell.controlledBy).name + " ***\n\n"
                    : '') + (game.isInRange(cell.x, cell.y) ? "## " + cell.terrain + " ##" : cell.terrain) + "\n" + (cell.structure
                    ? cell.structure.name + "\n"
                    : '') + game
                    .Units()
                    .atLoc(cell.x, cell.y)
                    .get()
                    .map(function (unit) {
                    var code = '';
                    switch (unit.name.toLowerCase()) {
                        case 'soldier':
                            code = 'So';
                            break;
                        case 'warrior':
                            code = 'Wa';
                            break;
                        case 'archer':
                            code = 'Ar';
                            break;
                        case 'knight':
                            code = 'Kn';
                            break;
                        case 'rogue':
                            code = 'Ro';
                            break;
                        case 'priest':
                            code = 'Pr';
                            break;
                        case 'wizard':
                            code = 'Wi';
                            break;
                    }
                    return game.selectedUnitList.includes(unit.id) ? "[" + code + "]" : code;
                }); };
                getCommand = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, actions, gold, farms, towns, units, input, command, _b, coords_1, _c, actions_1, gold_1, farms_1, towns_1, units_1, _d, coords_2, toSelect, _e, toBuild, coords, fileName, files, selected, jsonBuffer;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                console.log(table_1.table(game
                                    .Cells()
                                    .grid.map(function (row) {
                                    return row.map(function (cell) {
                                        return game.selectedCell().x === cell.x &&
                                            game.selectedCell().y === cell.y
                                            ? chalk_1.default
                                                .hex(cell.controlledBy
                                                ? game.Players().is(cell.controlledBy).color
                                                : '#FFFFFF')
                                                .inverse(renderCell(cell))
                                            : chalk_1.default.hex(cell.controlledBy
                                                ? game.Players().is(cell.controlledBy).color
                                                : '#FFFFFF')(renderCell(cell));
                                    });
                                })));
                                console.log('');
                                console.log(game.activePlayer().name + "'s turn");
                                _a = game.activePlayer().resources, actions = _a.actions, gold = _a.gold;
                                farms = game.farmsOwnedBy(game.activePlayer().id);
                                towns = game.townsOwnedBy(game.activePlayer().id);
                                units = game
                                    .Units()
                                    .controlledBy(game.activePlayer().id)
                                    .count();
                                console.log("Actions: " + actions + "\nGold: " + gold + "\nFarms: " + farms + "\nTowns/Castles: " + towns + "\nUnits: " + units + "\n");
                                console.log("You are in position " + (game
                                    .scorecard()
                                    .findIndex(function (score) { return score.id === game.activePlayer().id; }) + 1));
                                if (!!game.activePlayer().isHuman) return [3 /*break*/, 3];
                                return [4 /*yield*/, game.runComputerTurn()];
                            case 1:
                                _f.sent();
                                return [4 /*yield*/, game.endTurn()];
                            case 2:
                                _f.sent();
                                return [3 /*break*/, 32];
                            case 3: return [4 /*yield*/, askQuestion(game.activePlayer().name + " @ [" + game.selectedCell().x + "," + game.selectedCell().y + " | " + game.selectedCell().terrain + (game.selectedCell().structure
                                    ? " | " + game.selectedCell().structure.name
                                    : '') + "] Enter a command: ")];
                            case 4:
                                input = _f.sent();
                                command = input.toLowerCase().split(' ');
                                _b = command[0];
                                switch (_b) {
                                    case 'show': return [3 /*break*/, 5];
                                    case 'select': return [3 /*break*/, 6];
                                    case 'build': return [3 /*break*/, 12];
                                    case 'move': return [3 /*break*/, 22];
                                    case 'pass': return [3 /*break*/, 24];
                                    case 'save': return [3 /*break*/, 26];
                                    case 'load': return [3 /*break*/, 28];
                                    case 'exit': return [3 /*break*/, 30];
                                }
                                return [3 /*break*/, 31];
                            case 5:
                                switch (command[1]) {
                                    case 'analysis':
                                        console.log(game.analyze()[0]);
                                        break;
                                    case 'score':
                                    case 'scores':
                                        console.log(game.scorecard());
                                        break;
                                    case 'selected':
                                        switch (command[2]) {
                                            case 'cell':
                                                console.log(game.selectedCell());
                                                console.log(game
                                                    .Units()
                                                    .atLoc(game.selectedCell().x, game.selectedCell().y));
                                                break;
                                            case 'units':
                                                console.log(game.selectedUnits());
                                        }
                                        break;
                                    case 'cell':
                                        coords_1 = command[2].split(',');
                                        console.log(game
                                            .Cells()
                                            .atLoc(parseInt(coords_1[0], 10), parseInt(coords_1[1], 10)));
                                        break;
                                    case 'my':
                                        switch (command[2]) {
                                            case 'structure':
                                            case 'structures':
                                            case 'building':
                                            case 'buildings':
                                                console.log(game
                                                    .Cells()
                                                    .controlledBy(game.activePlayer().id)
                                                    .hasStructure()
                                                    .get());
                                                break;
                                            case 'castle':
                                            case 'castles':
                                                console.log(game
                                                    .Cells()
                                                    .controlledBy(game.activePlayer().id)
                                                    .hasStructure([Castle_1.default.structureName])
                                                    .get());
                                                break;
                                            case 'town':
                                            case 'towns':
                                                console.log(game
                                                    .Cells()
                                                    .controlledBy(game.activePlayer().id)
                                                    .hasStructure([Town_1.default.structureName])
                                                    .get());
                                                break;
                                            case 'cells':
                                                console.log(game
                                                    .Cells()
                                                    .controlledBy(game.activePlayer().id)
                                                    .get());
                                                break;
                                            case 'units':
                                                console.log(game
                                                    .Units()
                                                    .controlledBy(game.activePlayer().id)
                                                    .get());
                                                break;
                                            case 'resources':
                                                _c = game.activePlayer().resources, actions_1 = _c.actions, gold_1 = _c.gold;
                                                farms_1 = game.farmsOwnedBy(game.activePlayer().id);
                                                towns_1 = game.townsOwnedBy(game.activePlayer().id);
                                                units_1 = game
                                                    .Units()
                                                    .controlledBy(game.activePlayer().id)
                                                    .count();
                                                console.log("Actions: " + actions_1 + "\nGold: " + gold_1 + "\nFarms: " + farms_1 + "\nTowns/Castles: " + towns_1 + "\nUnits: " + units_1);
                                        }
                                        break;
                                    case 'range':
                                        console.log("Showing distance from " + game.selectedCell().x + "," + game.selectedCell().y);
                                        console.log("Move cost: " + game.getMoveCost());
                                        console.log(game.getCellsInRange());
                                        break;
                                }
                                return [3 /*break*/, 32];
                            case 6:
                                _d = command[1];
                                switch (_d) {
                                    case 'cell': return [3 /*break*/, 7];
                                    case 'unit': return [3 /*break*/, 8];
                                }
                                return [3 /*break*/, 11];
                            case 7:
                                coords_2 = command[2].split(',');
                                game.selectCell(parseInt(coords_2[0], 10), parseInt(coords_2[1], 10));
                                console.log("Cell " + coords_2 + " selected.");
                                return [3 /*break*/, 11];
                            case 8:
                                if (!(game.selectableUnits().length > 0)) return [3 /*break*/, 10];
                                return [4 /*yield*/, inquirer_1.default.prompt([
                                        {
                                            type: 'checkbox',
                                            name: 'selectUnit',
                                            message: 'Select units',
                                            choices: game.selectableUnits().map(function (unit) { return ({
                                                name: unit.name + " (ATK: " + unit.attack + " | HP: " + unit.health + " | Moves: " + unit.movesLeft + ")",
                                                value: unit.id
                                            }); })
                                        }
                                    ])];
                            case 9:
                                toSelect = _f.sent();
                                toSelect.selectUnit.forEach(function (id) {
                                    game.selectUnit(id);
                                });
                                return [3 /*break*/, 11];
                            case 10:
                                console.log('No units available to select!');
                                _f.label = 11;
                            case 11: return [3 /*break*/, 32];
                            case 12:
                                _e = command[1];
                                switch (_e) {
                                    case 'castle': return [3 /*break*/, 13];
                                    case 'academy': return [3 /*break*/, 13];
                                    case 'lodge': return [3 /*break*/, 13];
                                    case 'temple': return [3 /*break*/, 13];
                                    case 'city': return [3 /*break*/, 13];
                                    case 'unit': return [3 /*break*/, 15];
                                }
                                return [3 /*break*/, 21];
                            case 13: return [4 /*yield*/, game
                                    .upgradeTo(command[1])
                                    .then(function (res) { return console.log(res); })
                                    .catch(function (res) { return console.log(res); })];
                            case 14:
                                _f.sent();
                                return [3 /*break*/, 21];
                            case 15:
                                if (!!game.selectedCell().structure) return [3 /*break*/, 16];
                                console.log('There is no building here.');
                                return [3 /*break*/, 20];
                            case 16:
                                if (!(game.selectedCell().controlledBy !== game.activePlayer().id)) return [3 /*break*/, 17];
                                console.log('You do not control this cell.');
                                return [3 /*break*/, 20];
                            case 17: return [4 /*yield*/, inquirer_1.default.prompt([
                                    {
                                        type: 'list',
                                        name: 'selectUnit',
                                        message: 'Choose a unit to build',
                                        choices: game.selectedCell().structure.buildUnits
                                    }
                                ])];
                            case 18:
                                toBuild = _f.sent();
                                return [4 /*yield*/, game
                                        .buildUnit(toBuild.selectUnit.toLowerCase())
                                        .then(function (res) { return console.log(res); })
                                        .catch(function (res) { return console.log(res); })];
                            case 19:
                                _f.sent();
                                _f.label = 20;
                            case 20: return [3 /*break*/, 21];
                            case 21: return [3 /*break*/, 32];
                            case 22:
                                coords = command[1].split(',');
                                return [4 /*yield*/, game
                                        .moveSelectedUnits(parseInt(coords[0], 10), parseInt(coords[1], 10))
                                        .then(function (res) { return console.log(res); })
                                        .catch(function (res) { return console.log(res); })];
                            case 23:
                                _f.sent();
                                return [3 /*break*/, 32];
                            case 24: return [4 /*yield*/, game
                                    .endTurn()
                                    .then(function (res) { return console.log(res); })
                                    .catch(function () { return false; })];
                            case 25:
                                _f.sent();
                                return [3 /*break*/, 32];
                            case 26: return [4 /*yield*/, askQuestion('What do you want to name this game? ')];
                            case 27:
                                fileName = _f.sent();
                                if (!fs_1.default.existsSync(homedir + "/.juralen"))
                                    fs_1.default.mkdirSync(homedir + "/.juralen");
                                fs_1.default.writeFileSync(homedir + "/.juralen/" + fileName + ".json", game.export());
                                console.log(fileName + " saved!");
                                return [3 /*break*/, 32];
                            case 28:
                                files = fs_1.default.readdirSync(homedir + "/.juralen");
                                return [4 /*yield*/, inquirer_1.default.prompt([
                                        {
                                            type: 'list',
                                            name: 'selectFile',
                                            message: 'Select a file to load',
                                            choices: files.map(function (file) { return file.replace('.json', ''); })
                                        }
                                    ])];
                            case 29:
                                selected = _f.sent();
                                if (fs_1.default.existsSync(homedir + "/.juralen/" + selected.selectFile + ".json")) {
                                    jsonBuffer = fs_1.default.readFileSync(homedir + "/.juralen/" + selected.selectFile + ".json", 'utf-8');
                                    game.import(jsonBuffer.toString());
                                }
                                else
                                    console.log('File does not exist!');
                                return [3 /*break*/, 32];
                            case 30:
                                console.log('Exiting');
                                return [2 /*return*/, false];
                            case 31:
                                console.log('Unknown command');
                                _f.label = 32;
                            case 32: return [2 /*return*/, !game.gameOver ? getCommand() : null];
                        }
                    });
                }); };
                playerCount = 0;
                size = 0;
                _a.label = 1;
            case 1:
                if (!(playerCount <= 0 && size <= 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, askQuestion('Game size? ')];
            case 2:
                sizeInput = _a.sent();
                if (parseInt(sizeInput, 10) !== NaN)
                    size = parseInt(sizeInput, 10);
                else
                    console.log('Invalid input!');
                return [4 /*yield*/, askQuestion('How many players? ')];
            case 3:
                input = _a.sent();
                if (parseInt(input, 10) !== NaN)
                    playerCount = parseInt(input, 10);
                else
                    console.log('Invalid input!');
                return [3 /*break*/, 1];
            case 4:
                newPlayers = [];
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < playerCount)) return [3 /*break*/, 8];
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: "name",
                            message: "Player " + (i + 1) + " - Enter a name: ",
                            default: "Player" + (i + 1)
                        },
                        {
                            type: 'list',
                            name: "isHuman",
                            message: 'Human or AI?',
                            choices: [
                                {
                                    name: 'Human',
                                    value: true
                                },
                                {
                                    name: 'AI',
                                    value: false
                                }
                            ]
                        }
                    ])];
            case 6:
                results = _a.sent();
                newPlayers.push({
                    name: results.name,
                    isHuman: results.isHuman,
                    color: randomcolor_1.default()
                });
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8:
                game = new Game_1.default(newPlayers, { x: size, y: size });
                getCommand();
                return [2 /*return*/];
        }
    });
}); };
main();
function askQuestion(query) {
    var rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(function (resolve) {
        return rl.question(query, function (ans) {
            rl.close();
            resolve(ans);
        });
    });
}
//# sourceMappingURL=index.js.map