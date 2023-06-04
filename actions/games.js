module.exports = {
  
  name: "Games",

  section: "Discord",

  subtitle(data, presets) {
      const games = ["Snake", "2048", "FastType", "Wordle"]
    return `Starting the game: ${games[data.game]}`;
  },

  meta: { version: "3.2.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/games.js' },

  fields: ["game"],

  html(isEvent, data) {
    return `
    <div>
    <p>
      <u>Mod Info:</u><br>
      Created by money#6283<br>
      Help: https://discord.gg/apUVFy7SUh
    </p>
</div><br>
  <div style="float: left; width: calc(60% - 12px);">
  <span class="dbminputlabel">Game</span><br>
  <select id="game" class="round">
      <option value="0">Snake</option>
      <option value="1">2048</option>
      <option value="2">FastType</option>
      <option value="3">Wordle</option>
  </select>
</div>


`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mgames; \x1b[30m[\x1b[32mv1.1\x1b[30m] \x1b[30m(\x1b[36mv3.2.0\x1b[30m)')
    const data = cache.actions[cache.index];
    const { Snake, TwoZeroFourEight, FastType, Wordle } = require('discord-gamecord')
    const settings = {
      message: cache.interaction ?? cache.msg
    }
    if (cache.interaction) settings.isSlashGame = true
    else settings.isSlashGame = false
    let game = data.game
    switch(game) {
      case "0": 
          game = new Snake(settings)
          break;
      case "1":
          game = new TwoZeroFourEight(settings)
          break;
      case "2":
          game = new FastType(settings)
          break;
      case "3":
          game = new Wordle(settings)
          break;
      default:
        break;
    }

    game.startGame()
  },

mod() {},

}
