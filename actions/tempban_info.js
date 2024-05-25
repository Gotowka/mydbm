module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Tempban INFO",
  
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
      let dataType
      switch(data.source) {
        case "guild":
          dataType = "Guild ID";
          break;
        case "staff":
          dataType = "Staff";
          break;
        case "reason":
          dataType = "Reason";
          break;
        case "end":
          dataType = "Time";
          break;
        case "unix":
          dataType = "Unix Timestamp";
          break;
        case "member":
          dataType = "Member";
          break;
      }
      return `Get ${dataType}!`;
    },
  
    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      let dataType;
      switch (data.source) {
        case "guild":
          dataType = "Text";
          break;
        case "staff":
          dataType = "Member";
          break;
        case "reason":
          dataType = "Text";
          break;
        case "end":
          dataType = "Time";
          break;
        case "unix":
          dataType = "Unix Timestamp";
          break;
        case "member":
          dataType = "Text";
          break;
      }
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
  
    meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/ginfo.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["type", "tempban", "source", "storage", "varName"],
  
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
      </div>
      <div style="float: left; width: calc(85% - 12px);">
        <br>
        <retrieve-from-variable dropdownLabel="Tempban Data" selectId="type" variableContainerId="varNameContainer" variableInputId="tempban"></retrieve-from-variable>
      </div>
      <div style="float: left; width: calc(50% - 12px);">
        <span class="dbminputlabel">Information</span><br>
        <select id="source" class="round">
         ${isEvent && '<option value="guild">Guild (ID)</option>'}
         ${isEvent && '<option value="staff">Staff (member)</option>'}
         ${isEvent && '<option value="reason">Reason</option>'}
         ${isEvent && '<option value="end">Time</option>'}
         ${isEvent && '<option value="unix">Unix Timestamp</option>'}
        </select>
      </div>
      <div style="float: left; width: calc(85% - 12px);">
      <br>
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mtempban_info; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const tempban = this.getVariable(parseInt(data.type), data.tempban, cache)

      this.storeValue(tempban[data.source], parseInt(data.storage, 10), data.varName, cache);
      this.callNextAction(cache);
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