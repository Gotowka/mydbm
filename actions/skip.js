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
  
    meta: { version: "3.1.1", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/skip.js' },
  
  
    fields: ["storage", "varName"],

    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh
      </p>
  </div><br>
  <store-in-variable dropdownLabel="Store Current Song In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>`;
    },
  
    init() {},
  
    async action(cache) {
      console.log('ACTION: skip; [v1.0] (v3.1.1)')
      const { musicPlayer, djsV } = require('../bot')
      const { interaction, msg } = cache
      const { version } = require("discord-player");
      if (!musicPlayer) return console.error('Update the bot.js, https://github.com/Gotowka/mydbm/blob/v3/bot.js');
      if (!djsV) return console.error('Update the bot.js, https://github.com/Gotowka/mydbm/blob/main/v3/bot.js');
      if (version !== '6.0.0') console.error('Change version module, npm i discord-player@6.0.0');
      if (!interaction.member.voice.channel) return interaction.reply("Error: You must join the voice channel!")
      const queue = musicPlayer.queues.cache.get((interaction ?? msg).guild.id)

      if (!queue) return (interaction ?? msg).reply("Error: I can\'t found the queue");

      const currentSong = queue.currentTrack

      queue.node.skip()

      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(currentSong, storage, varName, cache);
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