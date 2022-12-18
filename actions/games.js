module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Games",
  
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------
  
    section: "Discord",
  
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
  
    subtitle(data, presets) {
      return `Umożliwiam zagranie w gry na discordzie`;
    },
  
    //---------------------------------------------------------------------
    // Action Meta Data
    //
    // Helps check for updates and provides info if a custom mod.
    // If this is a third-party mod, please set "author" and "authorUrl".
    //
    // It's highly recommended "preciseCheck" is set to false for third-party mods.
    // This will make it so the patch version (0.0.X) is not checked.
    //---------------------------------------------------------------------
  
    meta: { version: "2.1.6", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka/dbmmody/blob/main/beta/games.js', downloadUrl: 'https://github.com/Gotowka/dbmmody/blob/main/beta/games.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["game", "member2", "member"],
  
    //---------------------------------------------------------------------
    // Command HTML
    //
    // This function returns a string containing the HTML used for
    // editing actions.
    //
    // The "isEvent" parameter will be true if this action is being used
    // for an event. Due to their nature, events lack certain information,
    // so edit the HTML to reflect this.
    //---------------------------------------------------------------------
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
      </p>
  </div>
    <div style="float: left; width: calc(60% - 12px);">
    <span class="dbminputlabel">Game</span><br>
    <select id="game" class="round" onchange="glob.onChange1(this)">
        <option value="0">Kamień Papier Nożyce</option>
        <option value="1">Wąż</option>
        <option value="2">Kółko i Krzyżyk</option>
        <option value="3">2048</option>
        <option value="4">4 Pod rząd</option>
    </select><br>
    <span id="member2" class="dbminputlabel">Member (ID)<span style="color:red">*</span></span>
    <input id="member" class="round" placeholder="Id osoby z którą będziesz chciał walczyć!" type="text">
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
  
    init() {
        const { document, glob } = this;
        glob.onChange1 = function onChange1(event) {
        const value = parseInt(event.value, 10);
        const member = document.getElementById('member')
        const member2 = document.getElementById('member2')
    
        if (value === 0) {
            member.style.display = null
            member2.style.display = null
        } else if (value === 1) {
            member.style.display = 'none'
            member2.style.display = 'none'
        } else if (value === 2) {
            member.style.display = null
            member2.style.display = null
        } else if (value === 3) {
            member.style.display = 'none'
            member2.style.display = 'none'
        } else if (value === 4) {
            member.style.display = null
            member2.style.display = null
        }
        };
        glob.onChange1(document.getElementById('game'));
    },
  
    //---------------------------------------------------------------------
    // Action Bot Function
    //
    // This is the function for the action within the Bot's Action class.
    // Keep in mind event calls won't have access to the "msg" parameter,
    // so be sure to provide checks for variable existence.
    //---------------------------------------------------------------------
  
    async action(cache) {
      const { interaction } = cache;
      const { RPSGame, Snake, TicTacToe, TwoZeroFourEight, Connect4 } = require('dbp-games')
      const data = cache.actions[cache.index];
      let member
      if (data.member) member = interaction.guild.members.cache.get(this.evalMessage(data.member, cache)).user
      const game = parseInt(data.game)
      switch(game) {
        case 0: {
            new RPSGame({
                message: interaction,
                slash_command: true,
                opponent: member,
                //embed: {
                //    title: '',
                //    description: '',
                //    color: '',
               // }
            }).startGame()
        }
        break;
        case 1: {
            new Snake({
                message: interaction,
                slash_command: true,
                //embed: {
                //    title: '',
                //    description: '',
                //    color: '',
               // }
            }).startGame()
        }
        break;
        case 2: {
            new TicTacToe({
                message: interaction,
                slash_command: true,
                opponent: member,
                //embed: {
                //    title: '',
                //    description: '',
                //    color: '',
               // }
            }).startGame()
        }
        break;
        case 3: {
            new TwoZeroFourEight({
                message: interaction,
                slash_command: true,
                //embed: {
                //    title: '',
                //    description: '',
                //    color: '',
               // }
            }).startGame()
        }
        break;
        case 4: {
            new Connect4({
                message: interaction,
                slash_command: true,
                opponent: member,
                //embed: {
                //    title: '',
                //    description: '',
                //    color: '',
               // }
            }).startGame()
        }
        break;
      }
    },

  mod() {},

  
}
