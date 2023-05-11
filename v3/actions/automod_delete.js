module.exports = {
  
    name: "Automod Delete",
  
    section: "Discord",
  
    subtitle(data, presets) {
      return `Delete automod - ${data.value}`;
    },
  
    meta: { version: "3.1.1", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/v3/actions/automod_delete.js' },
    
    fields: ["value", "type"],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help = https://discord.gg/apUVFy7SUh<br>
          Variables:(var error is required to use)<br>
          <span class="dbminputlabel">error('disabled', 'delete')</span>
      </p>
  </div><br>
  <div style="float: left; width: 50%;">
  <span class="dbminputlabel">Value</span><br>
  <input id="value" class="round" type="text">
  <br>
  <span class="dbminputlabel">Delete by</span><br>
  <select id="type" class="round">
    <option value="0">Name</options>
    <option value="1">Id</options>
  </select>
  </div>`;
  },
  
    init() {},
  
    async action(cache) {
      console.log('ACTION: automod_delete; [v1.0] (v3.1.1)')
      const data = cache.actions[cache.index];
      const value = this.evalMessage(data.value, cache)
      const type = parseInt(data.type)
      if (!cache.server.features.includes('AUTO_MODERATION')) {
        this.storeValue('disabled', 1, 'error', cache)
        this.callNextAction(cache);
        return;
      }
      
      let result
      switch(type) {
        case 0:
            result = cache.server.autoModerationRules.cache.find(a => a.name === value)
            break;
        case 1:
            result = cache.server.autoModerationRules.cache.get(value)
            break;
      }
      await result.delete().catch(er => {
        this.storeValue('delete', 1, 'error', cache)
        console.error(er)
      })
      this.callNextAction(cache);
    },
  
    mod() {},
  };