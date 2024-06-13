module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
    name: "Systems2",
  
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
      let system
      if (data.ssuggest == true) system = 'Suggestions'
      return `The currently system running is: ${system}`;
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
  
    meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/systems2.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["suggests", "music", "ssuggest", "slyrics", "language", "admin", "guild"],
  
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
  
  <tab-system style="margin-top: 20px;">
  
      <tab label="Lyrics" icon="cogs">
        <div style="float: left; width: calc(50% - 12px); padding: 8px;">
        <span class="dbminputlabel">Music</span>
        <input id="music" class="round" type="text">
        </div>
    </tab>
  </tab-system>
  
    <tab label="Settings" icon="cogs">
      <div style="padding: 8px;">
        
        <dbm-checkbox style="float: left;" id="slyrics" label="Lyrics" checked></dbm-checkbox>
  
        <br><br>
  
        <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px;">
        <div style="padding-bottom: 12px; float: left; width: calc(30% - 12px);">
        <span class="dbminputlabel">Language</span>
        <select id="language" class="round">
              <option value="0">English</option>
              <option value="1">Polish</option>
        </select>
        <br>
        <span class="dbminputlabel">Admin (ROLE-ID)</span>
        <input id="admin" class="round" type="text">
        <br>
        <span class="dbminputlabel">Guild (ID)</span>
        <input id="guild" class="round" type="text">
        </div>
      </div>
    </tab>
  </tab-system>
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33msystems2; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const { msg, interaction } = cache
      const { Lyrics } = require('discord-systems')
      const data = cache.actions[cache.index];
      if (data.slyrics) {
        const text = await Lyrics.search(data.music)
        (msg ?? interaction).reply({ content: text })
      }
    },
  
    mod() {},
}
  
