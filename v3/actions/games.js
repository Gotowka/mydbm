module.exports = {
  
  name: "Games",

  section: "Discord",

  subtitle(data, presets) {
      const games = ["Snake"]
    return `Starting the game: ${games[data.game]}`;
  },

  meta: { version: "3.1.1", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/v3/actions/games.js' },

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
    console.log('ACTION: games; [v1.0] (v3.1.1)')
    const data = cache.actions[cache.index];
    const { Snake } = require('discord-gamecord')
    const { djsV } = require('../bot')
    if (!djsV) return console.error('Update the bot.js, https://github.com/Gotowka/mydbm/blob/main/v14/bot.js');
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
    }

    game.startGame()
  },

mod() {},

}
