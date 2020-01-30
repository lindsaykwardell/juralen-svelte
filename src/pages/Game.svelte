<script>
  import Game from '../dist/Game/Game'
  import randomcolor from 'randomcolor'
  import Row from '../components/Row.svelte'
  import Col from '../components/Col.svelte'
  import Card from '../components/Card.svelte'
  import Button from '../components/Button.svelte'
  import config from '../util/newGameConfig'
  import isDarkColor from 'is-dark-color'

  let grid = []
  let selectedCell
  let me
  let myStats
  let myTurn = false
  let mySelectedCell

  const game = new Game(config.players, config.grid, () => {
    grid = game.Cells().grid
    selectedCell = game.selectedCell()
    myStats = me
      ? {
          ...game.Players().is(me.id).resources,
          units: game
            .Units()
            .controlledBy(me.id)
            .count(),
          towns: game
            .Cells()
            .hasStructure()
            .controlledBy(me.id)
            .count(),
          farms: game
            .Cells()
            .controlledBy(me.id)
            .count(),
          place: game.scorecard().findIndex(score => score.id === me.id) + 1,
        }
      : {}
    myTurn = me && game.activePlayer().id === me.id
    if (mySelectedCell)
      mySelectedCell = game.Cells().atLoc(mySelectedCell.x, mySelectedCell.y)
  })

  me = game
    .Players()
    .get()
    .find(player => player.isHuman)

  const command = async () => {
    if (!game.activePlayer().isHuman) {
      await game.runComputerTurn()
      endTurnHandler()
    } else {
      if (me.id !== game.activePlayer().id) {
        me = game.activePlayer()
        game.init()
      }
    }
  }

  const endTurnHandler = async () => {
    await game.endTurn()
    if (!game.gameOver) {
      newTurn()
      setTimeout(() => {
        command()
      }, 500)
    }
  }

  const newTurn = () => {
    if (myTurn && mySelectedCell)
      game.selectCell(mySelectedCell.x, mySelectedCell.y)
  }

  const cellClickHandler = (x, y) => {
    mySelectedCell = game.Cells().atLoc(x, y)
    if (myTurn) game.selectCell(x, y)
  }

  const unitClickHandler = id => {
    if (myTurn) {
      if (game.selectedUnitList.includes(id)) {
        game.unselectUnit(id)
      } else {
        game.selectUnit(id)
      }
    }
  }

  const moveUnitsHandler = (x, y) => {
    if (
      myTurn &&
      game.selectedUnitList.length > 0 &&
      !(mySelectedCell.x === x && mySelectedCell.y === y)
    ) {
      game.moveSelectedUnits(x, y)
      cellClickHandler(x, y)
    }
  }

  const buildUnitHandler = unit => {
    game.buildUnit(unit)
  }

  const buildStructureHandler = structure => {
    game.upgradeTo(structure)
  }

  setTimeout(() => {
    game.init()
    newTurn()
    command()
  }, 100)
</script>

<style>
  .cell {
    min-width: 100px;
    min-height: 100px;
    user-select: none;
    cursor: pointer;
    font-size: 12px;
  }
  table {
    width: 100%;
  }
</style>

<div>
  <Row gutter={2} let:gutter>
    <Col {gutter} classes="flex-shrink w:3/4">
      <table class="board">
        {#each grid as row}
          <tr>
            {#each row as cell}
              <td
                style={`border: 1px solid black; ${cell.controlledBy && `background: ${game.getPlayer(cell.controlledBy).color}; color: ${isDarkColor(game.getPlayer(cell.controlledBy).color) ? 'white' : 'black'}`}`}>
                <div
                  class="cell"
                  style={mySelectedCell && cell.x === mySelectedCell.x && cell.y === mySelectedCell.y ? 'border: 2px solid yellow' : ''}
                  on:click={() => cellClickHandler(cell.x, cell.y)}
                  on:contextmenu|preventDefault={() => moveUnitsHandler(cell.x, cell.y)}>
                  {cell.controlledBy ? ` ${game.getPlayer(cell.controlledBy).name} ` : ''}
                  <br />
                  {game.isInRange(cell.x, cell.y) ? `## ${cell.terrain} ##` : cell.terrain}
                  <br />
                  {cell.structure ? `${cell.structure.name}` : ''}
                  <br />
                  {game
                    .Units()
                    .atLoc(cell.x, cell.y)
                    .get()
                    .map(unit => {
                      let code = ''
                      switch (unit.name.toLowerCase()) {
                        case 'soldier':
                          code = 'So'
                          break
                        case 'warrior':
                          code = 'Wa'
                          break
                        case 'archer':
                          code = 'Ar'
                          break
                        case 'knight':
                          code = 'Kn'
                          break
                        case 'rogue':
                          code = 'Ro'
                          break
                        case 'priest':
                          code = 'Pr'
                          break
                        case 'wizard':
                          code = 'Wi'
                          break
                      }
                      return game.selectedUnitList.includes(unit.id) ? `[${code}]` : code
                    })}
                </div>
              </td>
            {/each}
          </tr>
        {/each}
      </table>
    </Col>
    <Col {gutter}>
      {#if me && myStats && game}
        <Card
          classes="mb-2"
          style={`background: ${me.color}; color: ${isDarkColor(me.color) ? 'white' : 'black'}`}>
          {me.name}
          <span class="float-right">Position: {myStats.place}</span>
          <br />
          <Row gutter={2} let:gutter>
            <Col {gutter}>Gold: {myStats.gold}</Col>
            <Col {gutter}>Actions: {myStats.actions}</Col>
            <Col {gutter}>Farms: {myStats.farms}</Col>
            <Col {gutter}>Towns: {myStats.towns}</Col>
            <Col {gutter}>Units: {myStats.units}</Col>
          </Row>
        </Card>
      {/if}
      {#if mySelectedCell}
        <Card
          style={`height: 30vh; ${mySelectedCell.controlledBy && `background: ${game.getPlayer(mySelectedCell.controlledBy).color}; color: ${isDarkColor(game.getPlayer(mySelectedCell.controlledBy).color) ? 'white' : 'black'}`}`}>
          <div>
            <div>
              {mySelectedCell.controlledBy ? ` ${game.getPlayer(mySelectedCell.controlledBy).name} ` : ''}
              <br />
              {game.isInRange(mySelectedCell.x, mySelectedCell.y) ? `## ${mySelectedCell.terrain} ##` : mySelectedCell.terrain}
              <br />
              {mySelectedCell.structure ? `${mySelectedCell.structure.name}` : ''}
              <br />
              {game
                .Units()
                .atLoc(mySelectedCell.x, mySelectedCell.y)
                .get()
                .map(unit => {
                  let code = ''
                  switch (unit.name.toLowerCase()) {
                    case 'soldier':
                      code = 'So'
                      break
                    case 'warrior':
                      code = 'Wa'
                      break
                    case 'archer':
                      code = 'Ar'
                      break
                    case 'knight':
                      code = 'Kn'
                      break
                    case 'rogue':
                      code = 'Ro'
                      break
                    case 'priest':
                      code = 'Pr'
                      break
                    case 'wizard':
                      code = 'Wi'
                      break
                  }
                  return game.selectedUnitList.includes(unit.id) ? `[${code}]` : code
                })}
            </div>
          </div>
        </Card>
        {#if mySelectedCell.controlledBy === me.id}
          {#if mySelectedCell.structure}
            {#each mySelectedCell.structure.buildUnits as buildableUnit}
              <Button
                classes="m-2"
                onClick={() => buildUnitHandler(buildableUnit)}>
                Build {buildableUnit}
              </Button>
            {/each}
            {#if mySelectedCell.structure.name === 'Town'}
              <Button
                color="yellow"
                text="black"
                classes="m-2"
                onClick={() => buildStructureHandler('castle')}>
                Build Castle
              </Button>
              <Button
                color="yellow"
                text="black"
                classes="m-2"
                onClick={() => buildStructureHandler('city')}>
                Build City
              </Button>
              <Button
                color="yellow"
                text="black"
                classes="m-2"
                onClick={() => buildStructureHandler('lodge')}>
                Build Lodge
              </Button>
              <Button
                color="yellow"
                text="black"
                classes="m-2"
                onClick={() => buildStructureHandler('temple')}>
                Build Temple
              </Button>
              <Button
                color="yellow"
                text="black"
                classes="m-2"
                onClick={() => buildStructureHandler('academy')}>
                Build Academy
              </Button>
            {/if}
          {/if}
          <Card classes="mt-1">
            {#each game
              .Units()
              .atLoc(mySelectedCell.x, mySelectedCell.y)
              .get() as unit}
              <div on:click={() => unitClickHandler(unit.id)}>
                <Card
                  type="flat"
                  classes="mt-1 hover:bg-indigo-100"
                  style="user-select: none; cursor: pointer">
                  <Row>
                    <Col>
                      {game.selectedUnitList.includes(unit.id) ? `[${unit.name}]` : unit.name}
                    </Col>
                    <Col>Atk: {unit.attack}</Col>
                    <Col>HP: {unit.health}/{unit.maxHealth}</Col>
                    <Col>Moves: {unit.movesLeft}</Col>
                  </Row>
                </Card>
              </div>
            {/each}
          </Card>
        {/if}
      {/if}
    </Col>
  </Row>
</div>

<div style="position: absolute; bottom: 15px; right: 15px">
  <Button color="green" disabled={!myTurn} onClick={endTurnHandler}>
    Pass Turn
  </Button>
</div>
