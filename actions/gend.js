module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Giveaway END",
  
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
      return `Ending the giveaway`;
    },

    variableStorage(data, varType) {
        const type = parseInt(data.storage, 10);
        if (type !== varType) return;
        let dataType = "Giveaway Data";
        return [data.varName, dataType];
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
  
    meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/gend.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["call", "storage", "varName"],
  
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
          Help: https://discord.gg/apUVFy7SUh
      </p>
  </div><br>
  <div style="float: left; width: calc(50% - 12px);">
    <span class="dbminputlabel">Jump To Action</span>
    <input id="call" class="round" type="number">
   </div>
   </div>
   <div style="float: left; width: calc(100% - 12px);">
    <br>
    <store-in-variable dropdownLabel="Store Giveaway In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
   </div>
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
      console.log('ACTION: gend; [v1.1] (v2.1.8)')
      const data = cache.actions[cache.index];
      const giveaways = require('../data/giveaways.json')
      const { writeFileSync } = require('fs')
      const client = this.getDBM().Bot.bot

      setInterval(() => {
        Object.keys(giveaways).forEach(async giveawayid => {
            for (var i in giveaways[giveawayid]) {
                const giveaway = giveaways[giveawayid].at(i)
                if (new Date().getTime() > giveaway.end && giveaway.ended == false) {
                    let winner = [];
    
                    if (giveaway.members.length > 0) {
                        while(winner.length < giveaway.winners && winner.length < giveaway.members.length){
                            for (o = 0; o < giveaway.winners; o++) {
                                let winnerr = giveaway.members[Math.floor(Math.random() * giveaway.members.length)]
    
                                if (!winner.includes(winnerr)) {
                                    winner.push(winnerr);
                                };
                            };
                        };
                    };
    
                    giveaway.ended = true;
                    giveaway.end = new Date().getTime();

                    writeFileSync("./data/giveaways.json", JSON.stringify(giveaways));
                    const gData = {};
                    gData.guild = client.guilds.cache.get(giveaway.guild);
                    gData.channel = gData.guild.channels.cache.get(giveaway.channel) || await gData.guild.channels.fetch(giveaway.channel);
                    gData.message = gData.channel.messages.cache.get(giveaway.msg) || await gData.channel.messages.fetch(giveaway.msg);
                    gData.users = giveaway.members.length;
                    gData.prize = giveaway.prize;
                    gData.host = giveaway.host;
                    gData.winners = `<@!${winner.join(">, <@!")}>`;

                    this.storeValue(gData, parseInt(data.storage, 10), data.varName, cache)
                    const val = parseInt(data.call, 10);
                    const index = Math.max(val - 1, 0);
                    if (cache.actions[index]) {
                      cache.index = index - 1;
                      this.callNextAction(cache);
                    }
                }
            };
        });
    }, 1000);
    },
    //---------------------------------------------------------------------
    // Action Bot Mod
    //
    // Upon initialization of the bot, this code is run. Using the bot's
    // DBM namespace, one can add/modify existing functions if necessary.
    // In order to reduce conflicts between mods, be sure to alias
    // functions you wish to overwrite.
    //---------------------------------------------------------------------
  
    mod() {},
};