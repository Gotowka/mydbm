module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
    name: "InviteLogger INFO",
  
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
      return `Invite Logger - INFO`;
    },

    variableStorage(data, varType) {
        const type = parseInt(data.storage, 10);
        if (type !== varType) return;
        const info = parseInt(data.info, 10);
        let dataType = "Unknown Type";
        switch (info) {
          case 0:
            dataType = "Invite Owner";
            break;
          case 1:
            dataType = "Invite Code";
            break;
          case 2:
            dataType = "Invite Joins"
            break;
          case 3:
            dataType = "Invite Leaves";
            break;
          case 4:
            dataType = "Invite Middle";
            break;
        }
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
  
    meta: { version: "2.1.7", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/actions/loggerinfo.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["invite", "info", "storage", "varName2"],
  
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
<span class="dbminputlabel">Invite</span>
<input id="invite" class="round" placeholder="Invite code or invite variable" type="text">

  <br>

  <div style="float: left; width: 40%;">
  <span class="dbminputlabel">Info</span>
  <select id="info" class="round">
      <option value="0">Owner</option>
      <option value="1">Code</option>
      <option value="2">Joins</option>
      <option value="3">Leaves</option>
      <option value="4">Middle</option>
  </select>
</div>

<br><br><br><br>
<store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
    },
  
    //---------------------------------------------------------------------
    // Action Editor Init Code
    //
    // When the HTML is first applied to the action editor, this code
    // is also run. This helps add modifications or setup reactionary
    // functions for the DOM elements.
    //---------------------------------------------------------------------
  
    init() {
    },
  
    //---------------------------------------------------------------------
    // Action Bot Function
    //
    // This is the function for the action within the Bot's Action class.
    // Keep in mind event calls won't have access to the "msg" parameter,
    // so be sure to provide checks for variable existence.
    //---------------------------------------------------------------------
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const invite = await this.evalMessage(data.invite, cache);
      const info = parseInt(data.info, 10)
      let result
      if (invite.includes('code:')) {
        switch(info) {
          case 0:
              result = invite.owner
              break;
          case 1:
              result = invite.code;
              break;
          case 2:
              result = invite.joins;
              break;
          case 3:
              result = invite.leaves;
              break;
          case 4: 
              result = invite.middle
              break;
          default: 
              break;
          }
      } else {
        const inv = require('../data/invites.json')
        if (!inv[invite]) return console.log(`I can't found ${invite} in database`);
        switch(info) {
          case 0:
              result = inv[invite][0].owner
              break;
          case 1:
              result = inv[invite][0].code;
              break;
          case 2:
              result = inv[invite][0].joins;
              break;
          case 3:
              result = inv[invite][0].leaves;
              break;
          case 4: 
              result = inv[invite][0].middle
              break;
          default: 
              break;
          }
      }
        if (result !== undefined) {
            const storage = parseInt(data.storage, 10);
            const varName2 = this.evalMessage(data.varName2, cache);
            this.storeValue(result, storage, varName2, cache);
          }
      
          this.callNextAction(cache);
    },

  mod() {},

  
}