module.exports = {
  
    name: "MongoDB Connect",
  
    section: "MongoDB",
  
    subtitle(data, presets) {
      return `Connecting to database!`;
    },
  
    meta: { version: "2.1.8", preciseCheck: false, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/mongodb_connect.js' },
  
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mmongodb_connect; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];

      await this.mongoConnect(data.uri)
      this.callNextAction(cache)
    },
  
    mod() {},
};