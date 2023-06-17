module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Store Bot Shard Info",
  
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------
  
    section: "Discord Bots Poland",
  
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
  
    subtitle(data, presets) {
      return `Akcja stworzona przez money#6283`;
    },
  
    variableStorage(data, varType) {
        const type = parseInt(data.storage, 10);
        if (type !== varType) return;
        const info = parseInt(data.info, 10);
        let dataType = "Unknown Type";
        switch (info) {
          case 1:
            dataType = "Shards ID";
            break;
          case 2:
            dataType = "Shard Ping";
            break;
        }
        return [data.varName2, dataType];
      },
  
    meta: { version: "2.1.6", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka/autorskieakcje/blob/main/store_shard_info.js', downloadUrl: 'https://github.com/Gotowka/autorskieakcje/blob/main/store_shard_info.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["server", "varName", "info", "storage", "varName2"],
  
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
  <br><br><br><br>
  
  <div style="float: left; width: 45%;">
  <span class="dbminputlabel">Info</span><br>
  <select id="info" class="round">
    <option value="1" selected>Shard ID</option>
    <option value="2">Shard Ping</option>
  </select>
  </div><br><br><br>
  
  <div style="padding-top: 16px;">
    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
  </div>`;
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
      const data = cache.actions[cache.index];
      const client = this.getDBM().Bot;
      const info = parseInt(data.info, 10)
      let result
      switch (info) {
        case 1:
            const shards = client.shard.ids;
            result = shards.split('\n');
        break;
        case 2:
            result = targetServer.shard.ping;
        break;
        default:
        break;
      }
  
      if (result !== undefined) {
        const storage = parseInt(data.storage, 10);
        const varName2 = this.evalMessage(data.varName2, cache);
        this.storeValue(result, storage, varName2, cache);
      }
  
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
  