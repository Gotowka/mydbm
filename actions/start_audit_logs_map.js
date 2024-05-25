module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Start Audit Logs Map",
  
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------
  
    section: "Discord Bot Maker",
  
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
  
    subtitle(data, presets) {
      return `Start map!`;
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
  
    meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/start_audit_logs_map.js' },
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["variables", "type", "array"],
  
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
  <div style="padding-top: 8px; width: 100%;">
    <span class="dbminputlabel">Variables (In Array)</span>
    <input id="variables" class="round" placeholder="variable:variable:variable" type="text">
    <br>
    <retrieve-from-variable dropdownLabel="Array" selectId="type" variableContainerId="varNameContainer" variableInputId="array"></retrieve-from-variable>
  </div>`;
    },
  
    init() {},
    //
    //---------------------------------------------------------------------
    // Action Bot Function
    //
    // This is the function for the action within the Bot's Action class.
    // Keep in mind event calls won't have access to the "msg" parameter,
    // so be sure to provide checks for variable existence.
    //---------------------------------------------------------------------
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mstart_audit_logs_map; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const array = this.getVariable(parseInt(data.type), data.array, cache)
      let i = 0
      const map = []
      array.map(object => {
        console.log(object)
        console.log('Log ^ is for the autor if you have error with it!')
        i = i + 1
        const count = data.variables.split('').filter(w => w === ':').length + 1
        getVariables(data.variables, count, map)
        for (let o = 0; o < map.length ;o++) this.storeValue(object[map[o]], 1, map[o], cache)
        if (i === array.length) {
          this.storeValue(true, 1, 'check', cache);
          this.callNextAction(cache);
        } else {
          this.storeValue(false, 1, 'check', cache);
          this.callNextAction(cache)
        }
      })

      function getVariables(variables, num, ar) {
        let d
        for(let i = 0; i < num; i++) {
          if (i === 0) d = variables.split(':').at(i)
          else d = variables.split(':').at(i).split(':').at(0)
          ar.push(d)
        }
      }
    },
  
    mod() {},
};