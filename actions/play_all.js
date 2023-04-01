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
      return `Muzyczka: ${data.url}`;
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
  
    meta: { version: "2.1.7", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/actions/play_all.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["cc", "cc2", "url", "type"],
  
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
          Help: discord.gg/ae8hgMDxDc
          Variables:
          <span id="cc" class="dbminputlabel">name, url, author, views, thumbnail, duration</span>
          <span id="cc2" class="dbminputlabel">tracks, name, url, thumbnail</span>
      </p>
  </div><br>
  <div>
      <span class="dbminputlabel">Music</span><br>
      <input id="url" class="round" type="text" placeholder="Choose a option below!">
      
      <br>
      <span class="dbminputlabel">Type</span><br>
      <select id="type" class="round" onchange="glob.onChange1(this)">
            <option value="0">YouTube (Song(URL))</option>
            <option value="1">Youtube (Song(Title))</option>
            <option value="2">Youtube (playlista(URL))</option>
            <option value="3">Spotify (Song(URL))</option>
      </select>
  </div>`;
    },
  
    //---------------------------------------------------------------------
    // Action Editor Init Code
    //
    // When the HTML is first applied to the action editor, this code
    // is also run. This helps add modifications or setup reactionary
    // functions for the DOM elements.
    //---------------------------------------------------------------------
  
    init() {
      const { document, glob } = this;
      glob.onChange1 = function onChange1(event) {
      const value = parseInt(event.value, 10);
      const source = document.getElementById('url')
      const cc = document.getElementById('cc')
      const cc2 = document.getElementById('cc2')
      cc.style.display = 'none'
      cc2.style.display = 'none'
      if (value === 0) {
          source.placeholder = 'Give the url to the youtube music!'
          cc.style.display = null
          cc2.style.display = 'none'
      } else if (value === 1) {
        source.placeholder = 'Give the title to the youtube music!'
        cc.style.display = null
        cc2.style.display = 'none'
      } else if (value === 2) {
        source.placeholder = 'Give the url to the youtube playlist'
        cc2.style.display = null
        cc.style.display = 'none'
      } else if (value === 3) {
        source.placeholder = 'Give the url to the spotify playlist'
        cc2.style.display = null
        cc.style.display = 'none'
      }
      };
      glob.onChange1(document.getElementById('type'));
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
      const { musicPlayer } = require('../bot')
      if (!musicPlayer) console.error('Update the bot.js, https://github.com/Gotowka/mydbm/blob/main/bot.js')
      const { QueryType } = require("discord-player")
      const type = data.type
      const { interaction } = cache
      const url = this.evalMessage(data.url, cache)
      if (!interaction.member.voice.channel) return interaction.reply("Error: You must join the voice channel!")
      const queue = musicPlayer.createQueue(interaction.guild)
      if (!queue.connection) await queue.connect(interaction.member.voice.channel).catch(async (err) => { 
      console.error(err)
      })
  let song
  let result
      if (type === '0') {
        result = await musicPlayer.search(url, {
            requestedBy: interaction.member.user,
            searchEngine: QueryType.YOUTUBE_VIDEO
        })
        if (result.tracks.length === 0) return interaction.followUp('Error: I can\'t found that music')
      };
    
     if (type === '1') {
        result = await musicPlayer.search(url, {
            requestedBy: interaction.member.user,
            searchEngine: QueryType.AUTO
        })
        if (result.tracks.length === 0) return interaction.followUp('Error: I can\'t found that music')
      };
  
      if (type === '2')  {
        result = await musicPlayer.search(url, {
          requestedBy: interaction.member.user,
          searchEngine: QueryType.YOUTUBE_PLAYLIST
      })
      if (result.tracks.length === 0) return interaction.followUp('Error: I can\'t found that music')
      };
  
      if (type === '3') {
        result = await musicPlayer.search(url, {
          requestedBy: interaction.member.user,
          searchEngine: QueryType.SPOTIFY_SONG
      })
      if (result.tracks.length === 0) return interaction.followUp('Error: I can\'t found that music')
      };
  
     song = result.tracks[0]
     if (type === '2') await queue.addTracks(result.tracks)
     if (type !== '2') await queue.addTrack(song)
     if (!queue.playing) await queue.play()
     if (type === '2') {
      const playlist = result.playlist
      this.storeValue(result.tracks.length, 1, 'tracks', cache)
      this.storeValue(playlist.title, 1, 'name', cache)
      this.storeValue(playlist.url, 1, 'url', cache)
      this.storeValue(playlist.thumbnail.url, 'thumbnail', cache)
     } else if (type === '0' || type === '1')  {
      this.storeValue(song.title, 1, 'name', cache);
      this.storeValue(song.url, 1, 'url', cache);
      this.storeValue(song.author, 1, 'author', cache);
      this.storeValue(song.views, 1, 'views', cache);
      this.storeValue(song.thumbnail, 1, 'thumbnail', cache);
      this.storeValue(song.duration, 1, 'duration', cache);
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