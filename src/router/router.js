import Game from '../pages/Game.svelte'
import StartGameLobby from '../pages/StartGameLobby.svelte'

const routes = {
  // Exact path
  '/': StartGameLobby,
  '/game': Game

  // // Using named parameters, with last being optional
  // '/author/:first/:last?': Author,

  // // Wildcard parameter
  // '/book/*': Book,

  // Catch-all
  // This is optional, but if present it must be the last
  // '*': NotFound,
}

export default routes
