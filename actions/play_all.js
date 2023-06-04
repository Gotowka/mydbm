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

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: { version: "3.2.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/play_all.js' },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["variables", "url"],

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
        Playlist are disabled!<br>
        Variables:(var error is required to use)<br>
        <span id="variables" class="dbminputlabel">name, url, author, views, thumbnail, duration, error('playlist', 'voice', 'notfound')</span>
    </p>
</div><br>
<div>
    <span class="dbminputlabel">Music</span><br>
    <input id="url" class="round" type="text" placeholder="Give a url or title to music">
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
    console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mplay_all; \x1b[30m[\x1b[32mv1.1\x1b[30m] \x1b[30m(\x1b[36mv3.2.0\x1b[30m)')
    const data = cache.actions[cache.index];
    const { interaction, msg } = cache
    const { version } = require("discord-player");
    if (version !== '6.0.0') console.warn('Change version module, npm i discord-player@6.0.0');
    const player = this.getPlayer()
	  if (!player) return console.warn('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[36m Use action \x1b[33mconnect_music_player\x1b[36m, https://github.com/Gotowka/mydbm/blob/v3/actions/connect_music_player.js')
    const channel = (interaction ?? msg).member.voice.channel
    const url = this.evalMessage(data.url, cache)
    if (url.includes('playlist')) {
      this.storeValue('playlist', 1, 'error', cache)
      this.callNextAction(cache);
      return;
    }
    if (!channel) {
      this.storeValue('voice', 1, 'error', cache)
      this.callNextAction(cache);
      return;
    }
    let queue = musicPlayer.queues.cache.get((interaction ?? msg).guild.id)
    const tracks = await musicPlayer.search(url, {
      fallbackSearchEngine: 'auto',
      requestedBy: (interaction ?? msg).member.user
    })

    if (!tracks.tracks) {
      this.storeValue('notfound', 1, 'error', cache)
      this.callNextAction(cache);
      return;
    }

    if (!queue) {
      await musicPlayer.play(channel, tracks.tracks[0], {
        nodeOptions: {
          metadata: interaction ?? msg
        },
        deaf: true
      })
    } else queue.addTrack(tracks.tracks[0])

    this.storeValue(tracks.tracks[0].title, 1, 'name', cache);
    this.storeValue(tracks.tracks[0].url, 1, 'url', cache);
    this.storeValue(tracks.tracks[0].author, 1, 'author', cache);
    this.storeValue(tracks.tracks[0].views, 1, 'views', cache);
    this.storeValue(tracks.tracks[0].thumbnail, 1, 'thumbnail', cache);
    this.storeValue(tracks.tracks[0].duration, 1, 'duration', cache);
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