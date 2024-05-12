module.exports = {
  
  name: "Games",

  section: "Discord",

  subtitle(data, presets) {
      const games = ["Snake", "2048", "FastType", "Wordle", "FindEmoji", "GuessThePokemon", "MatchPairs", "WouldYouRather", "Trivia", "Slots", "Hangman", "Minesweeper", "Flood"]
    return `Starting the game: ${games[data.game]}`;
  },

  meta: { version: "3.2.4", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/games.js' },

  fields: ["game", "embeds"],

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
      <option value="4">FindEmoji</option>
      <option value="5">GuessThePokemon</option>
      <option value="6">MatchPairs</option>
      <option value="7">WouldYouRather</option>
      <option value="8">Trivia</option>
      <option value="9">Slots</option>
      <option value="10">Hangman</option>
      <option value="11">Minesweeper</option>
      <option value="12">Flood</option>
  </select>
</div>
<br><br><br>

<tab-system style="margin-top: 20px;">


  <tab label="Embeds" icon="book image">
    <div style="padding: 8px;">

      <dialog-list id="embeds" fields='["title", "overtitle", "color"]' dialogTitle="Embed Info" dialogWidth="540" dialogHeight="460" listLabel="Embeds" listStyle="height: calc(100vh - 450px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="data.title + ' - ' + data.description" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px 16px 0px 16px;">

          <tab-system>

            <tab label="General" icon="certificate">
              <div style="padding: 8px">
                <div style="float: left; width: calc(50% - 12px);">
                  <span class="dbminputlabel">Title</span><br>
                  <input id="title" class="round" type="text">

                  <br>

                  <span class="dbminputlabel">Color</span><br>
                  <input id="color" class="round" type="text" placeholder="Leave blank for default...">
                </div>

                <div style="float: right; width: calc(50% - 12px);">
                  <span class="dbminputlabel">Over Title</span><br>
                  <input id="overtitle" class="round" type="text" placeholder="Leave blank for none...">
                </div>
              </div>
            </tab>
          </tab-system>

        </div>
      </dialog-list>

    </div>
  </tab>
</tab-system>`;
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
    console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mgames; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.4\x1b[30m)\x1b[0m')
    const data = cache.actions[cache.index];
    const { Snake, TwoZeroFourEight, FastType, Wordle, FindEmoji, GuessThePokemon, MatchPairs, WouldYouRather, Slots, Hangman, Minesweeper, Flood } = require('discord-gamecord')
    const settings = {
      message: cache.interaction ?? cache.msg
    }
    if (cache.interaction) settings.isSlashGame = true
    else settings.isSlashGame = false
    let game = data.game

    const embedDatas = data.embeds;
    if (embedDatas.length === 1) {
      settings.embed = {}
      const embedData = embedDatas[0];

      if (embedData.title) settings.embed.title = this.evalMessage(embedData.title, cache);
      if (embedData.overtitle) settings.embed.overTitle = this.evalMessage(embedData.overtitle, cache)
      if (embedData.color) settings.embed.color = this.evalMessage(embedData.color, cache)
    }

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
      case "4":
          game = new FindEmoji(settings)
          break;
      case "5":
          game = new GuessThePokemon(settings)
          break;
      case "6":
          game = new MatchPairs(settings)
          break;
      case "7":
          game = new WouldYouRather(settings)
          break;
      case "8":
          game = new Trivia(settings)
          break;
      case "9":
          game = new Slots(settings)
          break;
      case "10":
          game = new Hangman(settings)
          break;
      case "11":
          game = new Minesweeper(settings)
          break;
      case "12":
          game = new Flood(settings)
          break;
      default:
        break;
    }

    game.startGame()
  },

mod() {},

}
