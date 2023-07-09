module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Queue",
  
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
      return `See the queue`;
    },
  
    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      const map = []
      let dataType = "Queue";
      map.push("error", "<Queue/Page>")
      map.push("pages", "Only when error: page")
      map.push(data.varName2, dataType)

      return map;
    },
  
    meta: { version: "3.2.2", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/queue.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["page", "storage", "varName2"],
  
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
          Variables: error('queue', 'page'), pages
      </p>
  </div><br>
  <span class="dbminputlabel">Page (Number)</span>
  <input style="display: left; width: calc(50% - 12px);" id="page" class="round" type="text">
  <br><br>
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mqueue; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.2\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const player = this.getPlayer()
      if (!player) return console.warn('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[36m Use action \x1b[33mconnect_music_player\x1b[36m, https://github.com/Gotowka/mydbm/blob/v3/actions/connect_music_player.js\x1b[0m')
      const queue = player.queues.cache.get((cache.interaction ?? cache.msg).guild.id)
      if (!queue || !queue.isPlaying()) {
        this.storeValue('queue', parseInt(data.storage, 10), 'error', cache)
        this.callNextAction(cache);
        return;
      }
      const totalPages = Math.ceil(queue.tracks.length / 10) || 1
      const page = (this.evalMessage(data.page, cache) || 1) - 1
  
      if (page > totalPages) {
        this.storeValue('page', parseInt(data.storage, 10), 'error', cache)
        this.storeValue(totalPages, parseInt(data.storage, 10), 'pages', cache);
        this.callNextAction(cache);
        return;
      }
      
      const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
          return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
      }).join("\n")

     this.storeValue(queueString, 1, data.varName2, cache);
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