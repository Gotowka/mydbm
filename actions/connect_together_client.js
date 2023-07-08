module.exports = {
  
    name: "Together Client Connect",
  
    section: "Discord",
  
    subtitle(data, presets) {
      return `Connecting Together Client!`;
    },
  
    meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/connect_together_client.js' },
  
    fields: [],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh
      </p>
  </div>`;
    },
  
    init() {}, 
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mconnect_together_client; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.8\x1b[30m)\x1b[0m')
      this.togetherConnect()

      this.callNextAction(cache)
    },
  
    mod() {},
};