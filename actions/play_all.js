module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Play Music",

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
    return `I play your music!`;
  },

  variableStorage(data, varType) {
		const type = parseInt(data.storage, 10);
		if (type !== varType) return;
		let dataType = "Song Data";
		return [data.varName, dataType, "check", "<Voice/Notfound/Playlist>"];
	},

  meta: { version: "3.2.2", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/play_all.js' },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["url", "storage", "varName"],

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
        check('voice', 'notfound', 'playlist')
    </p>
</div><br>
<div>
    <span class="dbminputlabel">Music</span><br>
    <input id="url" class="round" type="text" placeholder="Give a url or title for the music">
</div><br>
<store-in-variable dropdownLabel="Store Data in" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>`;
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
    console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mplay_all; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.2\x1b[30m)\x1b[0m')
    const data = cache.actions[cache.index];
    const { interaction, msg } = cache
    const { version } = require("discord-player");
    const player = this.getPlayer()
	  if (!player) return console.warn('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[36m Use action \x1b[33mconnect_music_player\x1b[36m, https://github.com/Gotowka/mydbm/blob/v3/actions/connect_music_player.js\x1b[0m')
    if (player.extractors.size === 0) return console.warn('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[36m Update action \x1b[33mconnect_music_player\x1b[36m, https://github.com/Gotowka/mydbm/blob/v3/actions/connect_music_player.js\x1b[0m')
    if (version !== '6.6.1') console.warn('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[0m Change version module, npm i discord-player@6.6.1\x1b[0m')
    const channel = (interaction ?? msg).member.voice.channel
    const url = this.evalMessage(data.url, cache)

    if (!channel) {
      this.storeValue('voice', 1, 'check', cache)
      this.callNextAction(cache);
      return;
    }

    const queue = player.queues.cache.get((interaction ?? msg).guild.id)
    const res = await player.search(url, {
      fallbackSearchEngine: 'auto',
      requestedBy: (interaction ?? msg).member.user
    })

    if (!res.hasTracks()) {
      this.storeValue('notfound', 1, 'check', cache)
      this.callNextAction(cache);
      return;
    }

    if (!queue) {
      await player.play(channel, res.tracks[0], {
        nodeOptions: {
          metadata: interaction ?? msg
        },
        connectionOptions: {
          deaf: true
        }
      }).then(d => {
        for (i = 0; i < d.searchResult.tracks.length; i++) {
          if (i !== 0) d.queue.addTrack(res.tracks[i])
        }
      })
    } else queue.addTracks(res.tracks)
    const storage = parseInt(data.storage, cache)
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(res.hasPlaylist(), storage, 'check', cache)
    this.storeValue(res.playlist ?? res.tracks[0], storage, varName, cache);
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