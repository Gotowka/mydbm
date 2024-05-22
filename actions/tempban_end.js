module.exports = {
  
    name: "Tempban END",
  
    section: "Discord",
  
    subtitle(data, presets) {
      return `Unban members`;
    },

    variableStorage(data, varType) {
        const type = parseInt(data.storage, 10);
        if (type !== varType) return;
        let dataType = "Tempban Data";
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
  
    meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/tempban_end.js' },
  
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
   <div style="float: left; width: calc(100% - 12px);">
    <br>
    <store-in-variable dropdownLabel="Store Tempban In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mtempban_end; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.8\x1b[30m)\x1b[0m');
      const data = cache.actions[cache.index];
      const bans = require('../data/bans.json');
      const { writeFileSync } = require('fs');
      const client = this.getDBM().Bot.bot;

      setInterval(() => {
            Object.keys(bans).forEach(async uId => {
                const ban = bans[uId].at(0)
                if (!ban.end) {}
                else if (new Date().getTime() > ban.end) {
                    await client.guilds.cache.get(ban.guild).bans.remove(uId);
        
                    bans[uId] = [{}]
                    writeFileSync("./data/bans.json", JSON.stringify(bans));

                    const bData = { ...ban, member: uId }
                    console.log(bData)
                    this.storeValue(bData, parseInt(data.storage, 10), data.varName, cache)
                    const val = parseInt(data.call, 10);
                    const index = Math.max(val - 1, 0);
                    if (cache.actions[index]) {
                        cache.index = index - 1;
                        this.callNextAction(cache);
                    }
                }
            });
        }, 50000);
    },
 
    mod() {},
};