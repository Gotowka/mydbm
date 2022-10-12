module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Skip",
  
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
      return `Skip the music`;
    },
  
    meta: { version: "2.1.6", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka/autorskieakcje/blob/main/skip.js', downloadUrl: 'https://github.com/Gotowka/autorskieakcje/blob/main/skip.js' },
  
  
    fields: [""],

    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283
      </p>
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
      const { interaction } = cache
      const { musicPlayer } = require('../bot')

      if (!interaction.member.voice.channel) return interaction.reply("Error: You must join the voice channel!")
      const queue = musicPlayer.getQueue(interaction.guild)

      if (!queue) return await interaction.reply("Error: I can\'t fount the queue")

      const currentSong = queue.current

      queue.skip()

      this.storeValue(currentSong.title, 1, 'name', cache);
      this.storeValue(currentSong.url, 1, 'url', cache);
      this.storeValue(currentSong.author, 1, 'author', cache);
      this.storeValue(currentSong.views, 1, 'views', cache);
      this.storeValue(currentSong.thumbnail, 1, 'thumbnail', cache);
      this.storeValue(currentSong.duration, 1, 'duration', cache);
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