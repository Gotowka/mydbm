module.exports = {
  
    name: "Music Player Connect",
  
    section: "Audio Control",
  
    subtitle(data, presets) {
      return `Connecting to database!`;
    },
  
    meta: { version: "3.2.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/mongodb_connect.js' },
  
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
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mconnect_music_player; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.0\x1b[30m)\x1b[0m')
      this.playerConnect()
      this.callNextAction(cache)
    },
  
    mod() {},
  };
  
