module.exports = {
  
    name: "MongoDB Connect",
  
    section: "MongoDB",
  
    subtitle(data, presets) {
      return `Connecting to database!`;
    },
  
    meta: { version: "3.2.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/mongodb_connect.js' },
  
    fields: ["uri"],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh
      </p>
  </div><br><br>
  <div style="float: left; width: calc(100% - 12px);">
    <span class="dbminputlabel">Connect URI</span>
    <input id="uri" class="round" type="text">
</div>`;
    },
  
    init() {}, 
  
    async action(cache) {
      console.log('ACTION: mongodb_connect; [v1.0] (v3.1.1)')
      const data = cache.actions[cache.index];

      await this.mongoConnect(data.uri)
      this.callNextAction(cache)
    },
  
    mod() {},
  };
  
