module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Store Playlist2 Info",
  
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------
  
    section: "Audio Control",
  
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
  
    subtitle(data, presets) {
      const info = [
        "Title",
        "ID",
        "Url",
        "Author Name",
        "Author Url",
        "Thumbnail",
        "Description",
        "Source",
        "Songs Length",
        "Current Song"
      ];
      return `Get the - ${info[parseInt(data.info, 10)]}`;
    },
  
    //---------------------------------------------------------------------
    // Action Storage Function
    //
    // Stores the relevant variable info for the editor.
    //---------------------------------------------------------------------
  
    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      const info = parseInt(data.info, 10);
      let dataType = "Unknown Type";
      switch (info) {
        case 0:
        case 1:
         dataType = "Text";
         break;
        case 2:
         dataType = "Url";
         break;
        case 3:
         dataType = "Text";
         break;
        case 4:
        case 5:
         dataType = "Url";
         break;
        case 6:
        case 7:
         dataType = "Text";
         break;
        case 8:
         dataType = "Number";
         break;
        case 9:
         dataType = "Sonng Data";
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
  
    meta: { version: "3.2.2", preciseCheck: false, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/store_playlist_info.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["playlist", "info", "storage", "varName"],
  
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
          <span class="dbminputlabel">Playlist</span><br>
          <input id="playlist" class="round" placeholder="Only the variable name" type="text">
          <br>
          <span class="dbminputlabel">Source Info</span><br>
          <select id="info" class="round">
              <option value="0">Playlist Title</option>
              <option value="1">Playlist ID</option>
              <option value="2">Playlist Url</option>
              <option value="3">Playlist Author Name</option>
              <option value="4">Playlist Author Url</option>
              <option value="5">Playlist Thumbnail</option>
              <option value="6">Playlist Description</option>
              <option value="7">Playlist Source</option>
              <option value="8">Playlist Songs Length</option>
              <option value="9">Playlist Current Song</option>
          </select>
      </div>
  
      <div style="float: left; width: calc(100% - 12px); padding-top: 8px;">
        <br>
        <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mstore_playlist_info; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.2\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const playlist = cache.temp[this.evalMessage(data.playlist, cache)]
  
      if (!playlist) {
        this.callNextAction(cache);
        return;
      }
  
      const info = parseInt(data.info, 10);
  
      let result;
      switch (info) {
        case 0:
          result = playlist.title;
          break;
        case 1:
          result = playlist.id
        case 2:
          result = playlist.url;
          break;
        case 3:
          result = playlist.author.name;
          break;
        case 4:
          result = playlist.author.url;
          break;
        case 5:
          result = playlist.thumbnail;
          break;
        case 6:
          result = playlist.description;
        case 7:
          result = playlist.source;
          break;
        case 8:
          result = playlist.tracks.length
          break;
        case 9:
          result = playlist.tracks[0]
          break;
        default:
          break;
      }
  
      if (result !== undefined) {
        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);
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