module.exports = {
  
    name: "Member Data Remove",
  
    section: "Data",
  
    subtitle(data, presets) {
      return `Remove users from data that aren\'t on your server`;
    },
  
    meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/member_data_remove.js' },
  
    fields: [],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh
      </p>
  </div>
  `;
    },
  
    init() {},
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mmember_data_remove; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const { readFileSync, writeFileSync } = require('fs-extra')
      const { msg, interaction } = cache;
      let file = readFileSync('./data/players.json', { encoding: 'utf8'})
      file = JSON.parse(file)

      const data = {}
      Object.keys(file).map(userId => {
        try {
            const member = (msg ?? interaction).guild.members.cache.get(userId);
            if (member) data[userId] = { ...file[userId] };
        } catch(er) {
            console.log(er)
        }
      })
      writeFileSync('./data/players.json', JSON.stringify(data))
      this.callNextAction(cache);
    },
  
    mod() {},
};  