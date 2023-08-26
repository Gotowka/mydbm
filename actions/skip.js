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

    subtitle(data, presets) {
      return `Skip the music`;
    },

    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      const type2 = parseInt(data.storage2, 10);
      if (type !== varType && type2 !== varType) return;
      let dataType = "Song Data";
      return [data.varName, dataType, data.varName2, dataType];
    },
  
    meta: { version: "3.2.2", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/skip.js' },
  
  
    fields: ["storage", "varName", "storage2", "varName2"],

    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh
      </p>
  </div><br>
  <store-in-variable dropdownLabel="Store Current Song In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
  <br><br><br>
  <store-in-variable dropdownLabel="Store Next Song In" selectId="storage2" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
    },
  
    init() {},
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mskip; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.2\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const { interaction, msg } = cache
      const player = this.getPlayer()
      const storage = parseInt(data.storage, 10);
      if (!player) return console.warn('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[36m Use action \x1b[33mconnect_music_player\x1b[36m, https://github.com/Gotowka/mydbm/blob/v3/actions/connect_music_player.js\x1b[0m')
      if (!(interaction ?? msg).member.voice.channel) {
        this.storeValue('voice', storage, 'error', cache)
        this.callNextAction(cache)
        return;
      }
      const queue = player.queues.cache.get((interaction ?? msg).guild.id)

      if (!queue) {
        this.storeValue('queue', storage, 'error', cache)
        this.callNextAction(cache)
        return;
      }

      const currentSong = queue.currentTrack

      await queue.node.skip()

      this.storeValue(currentSong, storage, data.varName, cache);
      this.storeValue(queue.tracks[1], storage, data.varName2, cache)
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