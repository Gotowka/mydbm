module.exports = {
  
    name: "Store Song Info",
  
    section: "Audio Control",
  
    subtitle(data, presets) {
      const info = [
        "Song Title",
        "Song Url",
        "Song Author",
        "Song Views",
        "Song Thumbnail",
        "Song Duration",
        "Song Description",
        "Author URL",
        "Song Publish Date",
        "Author Subscribers",
        "Author Avatar"
      ];
      return `Get the - ${info[parseInt(data.info, 10)]}`;
    },
  
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
        case 6:
         dataType = "Song Description";
         break;
        case 7:
         dataType = "Author URL";
         break;
        case 8:
         dataType = "Song Publish Date";
         break;
        case 9:
         dataType = "Author Subscribers";
         break;
        case 10:
         dataType = "Author Avatar";
         break;
      }
      return [data.varName, dataType];
    },
  
    meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka/mydbm/tree/v2', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/store_song_info.js' },
  
    fields: ["type", "song", "info", "storage", "varName"],
  
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
        <div style="float: left; width: calc(85% - 12px);">
          <retrieve-from-variable dropdownLabel="Song" selectId="type" variableContainerId="varNameContainer" variableInputId="song"></retrieve-from-variable>
        </div>
  
  <div style="float: left; width: calc(100% - 12px);">
      <span class="dbminputlabel">Source Info</span><br>
      <select id="info" class="round">
          <option value="0" selected>Song Title</option>
          <option value="1">Song Url</option>
          <option value="2">Song Author</option>
          <option value="3">Song Views</option>
          <option value="4">Song Thumbnail</option>
          <option value="5">Song Duration (seconds)</option>
          <option value="6">Song Description</option>
          <option value="7">Author URL</option>
          <option value="8">Song Publish Date</option>
          <option value="9">Song Author Subscribers</option>
          <option value="10">Song Author Avatar</option>
      </select>
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mstore_song_info; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const song = this.getVariable(parseInt(data.type), data.song, cache)
  
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
          result = song.video_url;
          break;
        case 2:
          result = song.author.name;
          break;
        case 3:
          result = song.viewCount;
          break;
        case 4:
          result = song.thumbnails[2].url;
          break;
        case 5:
          result = song.lengthSeconds;
          break;
        case 6:
          result = song.description;
          break;
        case 7:
          result = song.author.user_url;
          break;
        case 8:
          result = song.publishDate;
          break;
        case 9:
          result = song.author.subscriber_count;
          break;
        case 10:
          result = song.author.thumbnails[2].url;
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