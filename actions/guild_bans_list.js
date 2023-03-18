module.exports = {
  
    name: "Servers Ban List",
  
    section: "Discord",
  
    subtitle(data, presets) {
      return `See the ban list`;
    },
  
    variableStorage(data, varType) {
        const type = parseInt(data.storage, 10);
        if (type !== varType) return;
        let dataType = "BanList";
        return [data.varName2, dataType];
      },
  
    meta: { version: "2.1.6", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/actions/guild_bans_list.js' },
  
    fields: ["guild", "list", "storage", "varName2"],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: discord.gg/ae8hgMDxDc<br>
          Variables For Visualization: [id], [tag], [username], %(Next line)
      </p>
  </div><br>
  <span class="dbminputlabel">Guild ID</span>
  <input id="guild" class="round" type="text">
  <br><br>
  <span class="dbminputlabel">Visualization List</span>
  <input id="list" class="round" type="text">
  <br><br>
</div>
  <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
    },
  
    init() {},
  
    async action(cache) {
        const data = cache.actions[cache.index];
        const cc = this.getDBM().Bot.bot
        const guild = cc.guilds.cache.get(this.evalMessage(data.guild, cache))
        let list = ""
        const banCollection = await guild.bans.fetch()
        banCollection.map(ban => {
            if (list.length > 1900) {
            } else {
                const ls = this.evalMessage(data.list, cache)
                const con = replaceF(ls, ban)
                list += `${con}`
            }
        })
        const storage = parseInt(data.storage, 10);
        const varName2 = this.evalMessage(data.varName2, cache);
        if (list.length > 1) this.storeValue(list, storage, varName2, cache);
        else this.storeValue('none', storage, varName2, cache);
        this.callNextAction(cache);

        function replaceF(l, ban) {
            const test = " "
            test.length = (l.match(new RegExp("%", "g")) || []).length
            let mes = l
            for(i in test) mes = mes.replace('%', '\n')
            mes = mes.replace('[id]', ban.user.id).replace('[tag]', ban.user.tag).replace('[username]', ban.user.username)
            return mes;
        }
    },
  
    mod() {},
};