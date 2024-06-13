module.exports = {
  
    name: "Skip",
  
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
  
    meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka/mydbm/tree/v2', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/skip.js' },
  
  
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mskip; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const storage = parseInt(data.storage, 10);
	  const queue = this.getDBM().Audio.map.get((cache.msg ?? cache.interaction).guild.id);
	  if (!queue) {
		this.callNextAction(cache);
		return;
	  };
      await queue.player.stop();

      this.storeValue(queue.songs[0], storage, data.varName, cache);
      this.storeValue(queue.songs[1], storage, data.varName2, cache)
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