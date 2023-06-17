module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Current Unix Timestamp",
  
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
      return `Check the current unix timestamp`;
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
  
    meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/current_unix_timestamp.js' },
  
	variableStorage: function(data, varType) {
		const type = parseInt(data.storage);
		if(type !== varType) return;
		const info = parseInt(data.info);
		let dataType = "Unix Timestamp";
		switch(info) {
			case 0:
				dataType = "?";
				break;
		}
		return ([data.varName2, dataType]);
	},
  
    fields: ["storage", "varName2"],
  
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
      <div style="float: left; width: 35%;">
      Store In:<br>
      <select id="storage" class="round">
          ${data.variables[1]}
      </select>
  </div>
  <div id="varNameContainer2" style="float: right; width: 60%;">
      Variable Name:<br>
      <input id="varName2" class="round" type="text"><br>
  </div>
  `;
    },
  
    init() {},
  
    async action(cache) {
      console.log('ACTION: current_unix_timestamp; [v1.0] (v2.1.8)')
      const data = cache.actions[cache.index]
      const end = Date.parse(new Date(new Date().getTime())) / 1000;
      const storage = parseInt(data.storage);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(end, storage, varName2, cache);
      this.callNextAction(cache);
    },
  
  
    mod() {},
  };