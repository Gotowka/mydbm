module.exports = {
  
    name: "Automod Delete",
  
    section: "Discord",
  
    subtitle(data, presets) {
      return `Delete automod - ${data.value}`;
    },
  
    variableStorage(data, varType) {
        if (1 !== varType) return;
        let dataType = "Check result 'notfound'/'delete'";
        return ['error', dataType];
    },
  
    meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/automod_delete.js' },
    
    fields: ["value", "type"],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help = https://discord.gg/apUVFy7SUh<br>
          Variables: error('notfound', 'delete')
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mautomod_delete; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const value = this.evalMessage(data.value, cache);
      const type = parseInt(data.type);
      let result
      switch(type) {
        case 0:
          result = cache.server.autoModerationRules.cache.find(a => a.name === value);
          break;
        case 1:
          result = cache.server.autoModerationRules.cache.get(value);
          break;
      }
  
      if (!result) {
        if (type === 1) result = await cache.server.autoModerationRules.fetch(value)
        if (!result) {
          this.storeValue('notfound', 1, 'error', cache)
          this.callNextAction(cache)
          return;
        }
      }
  
      await result.delete().catch(er => {
        console.log(er)
        this.storeValue('delete', 1, 'error', cache)
      })
      this.callNextAction(cache);
    },
  
    mod() {},
};