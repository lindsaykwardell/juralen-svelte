<script>
  import newGameConfig from '../util/newGameConfig'
  import { push } from 'svelte-spa-router'
  import randomcolor from 'randomcolor'
  import faker from 'faker'
  import Row from '../components/Row.svelte'
  import Col from '../components/Col.svelte'
  import Button from '../components/Button.svelte'
  import isDarkColor from 'is-dark-color'

  let playerCount = 12
  $: playerDetails = []

  $: if (playerCount > 0) {
    const newPlayerDetails = []
    for (let i = 0; i < playerCount; i++) {
      if (!playerDetails[i]) {
        newPlayerDetails.push({
          name: faker.name.firstName(),
          isHuman: i === 0 ? true : false,
          color: randomcolor(),
        })
      } else {
        newPlayerDetails.push(playerDetails[i])
      }
    }
    playerDetails = newPlayerDetails
  }

  let gridSize = { x: 9, y: 9 }

  const startGame = () => {
    newGameConfig.players = playerDetails
    newGameConfig.grid = gridSize
    push('/game')
  }
</script>

Player Count:
<input
  class="border-2"
  type="number"
  min="1"
  max="12"
  bind:value={playerCount} />
<hr class="m-5" />
{#each playerDetails as player}
  <Row>
    <Col>
      <input type="text" class="border-2" bind:value={player.name} />
    </Col>
    <Col>
      <label>
        <input type="checkbox" bind:checked={player.isHuman} class="border-2" />
        Human (not AI)
      </label>
    </Col>
    <Col>
      <Button
        color="none"
        text={isDarkColor(player.color) ? 'white' : 'black'}
        style="background: {player.color}"
        onClick={() => (player.color = randomcolor())}>
        Click to change
      </Button>
    </Col>
  </Row>
{/each}
<div class="pt-5">
  <Button onClick={startGame}>Start</Button>
</div>
