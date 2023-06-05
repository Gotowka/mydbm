module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Store Song Info",
  
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
        "Song Title",
        "Song Url",
        "Song Author",
        "Song Views",
        "Song Thumbnail",
        "Song Duration",
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
          dataType = "Song Title";
          break;
        case 1:
          dataType = "Song Url";
          break;
        case 2:
         dataType = "Song Author";
         break;
        case 3:
         dataType = "Song Views";
         break;
        case 4:
         dataType = "Song Thumbnail";
         break;
        case 5:
         dataType = "Song Duration";
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
  
    meta: { version: "3.2.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/store_song_info.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["song", "info", "storage", "varName2"],
  
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
            <span class="dbminputlabel">Song Object</span><br>
            <input id="song" class="round" type="text">
        </div>
  
  <div style="padding-top: 8px;">
      <span class="dbminputlabel">Source Info</span><br>
      <select id="info" class="round">
          <option value="0" selected>Song Title</option>
          <option value="1">Song Url</option>
          <option value="2">Song Author</option>
          <option value="3">Song Views</option>
          <option value="4">Song Thumbnail</option>
          <option value="5">Song Duration</option>
      </select>
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mstore_song_info; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.0\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const song = this.evalMessage(data.song, cache)
  
      if (!song) {
        this.callNextAction(cache);
        return;
      }
  
      const info = parseInt(data.info, 10);
  
      let result;
      switch (info) {
        case 0:
          result = song.title;
          break;
        case 1:
          result = song.url;
          break;
        case 2:
          result = song.author;
          break;
        case 3:
          result = song.views;
          break;
        case 4:
          result = song.thumbnail;
          break;
        case 5:
          result = song.duration;
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
  