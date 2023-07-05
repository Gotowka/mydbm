module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "MongoDB Store Collection Info",
  
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------
  
    section: "MongoDB",
  
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
  
    subtitle(data, presets) {
      return `Get the Information from Collection Data`;
    },
  
    //---------------------------------------------------------------------
    // Action Storage Function
    //
    // Stores the relevant variable info for the editor.
    //---------------------------------------------------------------------
  
    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      let dataType = "Information From Data";

      return [data.varName2, dataType];
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
  
    meta: { version: "2.1.8", preciseCheck: false, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/mongodb_store_collection_info.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["mdata", "info", "storage", "varName2"],
  
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
            Help: https://discord.gg/apUVFy7SUh<br>
        </p>
        </div><br>
        <div style="float: left; width: calc(50% - 12px);">
            <span class="dbminputlabel">MongoDB Collection Data</span><br>
            <input id="mdata" class="round" type="text">
        </div>
        <div style="float: rigth; width: calc(50% - 12px);">
        <span class="dbminputlabel">Source Info</span><br>
        <input id="info" class="round" type="text">
        </div>
  <br>
  
  <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mmongodb_store_collection_info; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const cData = this.evalMessage(data.mdata, cache)
      const info = this.evalMessage(data.info, cache)
      const result = cData[info]
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
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