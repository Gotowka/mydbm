module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Tempban Member",
  
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------
  
    section: "Member Control",
  
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
  
    subtitle(data, presets) {
      return `${presets.getMemberText(data.member, data.varName)}`;
    },

    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      return [data.varName, "Unix Timestamp"];
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
  
    meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/tempban_member.js', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/tempban_member.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["member", "save", "time", "reason", "storage", "varName"],
  
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
          Created by money#6283
          Help: https://discord.gg/apUVFy7SUh
      </p>
  </div><br>
  <div style="float: left; width: calc(50% - 12px);">
  <member-input style="width: calc(180% - 12px);" dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer2" variableInputId="save"></member-input>

  <br><br><br>

  <span class="dbminputlabel">Time</span>
  <input id="time" class="round" placeholder="example: 5s/5m/5h/5d" type="text">
  
  <br>

  <span class="dbminputlabel">Reason</span>
  <input id="reason" class="round" type="text">

  <br>
  
  <store-in-variable style="width: calc(180% - 12px);" dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mtempban_member; \x1b[30m[\x1b[32mv1.1\x1b[30m] \x1b[30m(\x1b[36mv2.1.8\x1b[30m)\x1b[0m');
      const bData = require('../data/bans.json');
      const fs = require('fs')
      const data = cache.actions[cache.index];
      const member = await this.getMemberFromData(data.member, data.varName, cache);
      const reason = this.evalMessage(data.reason, cache);
      let duration = this.evalMessage(data.time, cache);

      if (duration.includes("s")) {
          duration = duration.split("s")[0] * 1000;
      } else if (duration.includes("m")) {
          duration = duration.split("m")[0] * 60000;
      } else if (duration.includes("h")) {
          duration = duration.split("h")[0] * 3600000;
      } else if (duration.includes("d")) {
          duration = duration.split("d")[0] * 86400000;
      } else {
          duration = duration * 1000;
      };
  
      const endtime = new Date().getTime() + duration;
      const endban = Date.parse(new Date(new Date().getTime() + duration)) / 1000;
      
      bData[member.id] = [{
        guild: member.guild.id,
        staff: (cache.msg ?? cache.interaction).member,
        reason,
        end: endtime,
        unix: endban
      }]

      await member.ban({ reason })
      .then(() => {
        fs.writeFileSync("./data/bans.json", JSON.stringify(bData))
        this.storeValue(endban, parseInt(data.storage, 10), data.varName, cache);
        this.callNextAction(cache);
      })
      .catch(er => console.log(er))
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