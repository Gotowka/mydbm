module.exports = {
  
    name: "MongoDB Collection Create",
  
    section: "MongoDB",
  
    subtitle(data, presets) {
      return `Create mongoDB collection data`;
    },
  
    meta: { version: "2.1.8", preciseCheck: false, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/mongodb_collection_create.js' },
  
    fields: ["database", "cname", "cdata"],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh<br>
      </p>
  </div><br><br>
  <div style="float: left; width: calc(50% - 12px);">
    <span class="dbminputlabel">Database Name</span>
    <input id="database" class="round" type="text">
  </div>
  <div style="float: right; width: calc(50% - 12px);">
    <span class="dbminputlabel">Collection Name</span>
    <input id="cname" class="round" type="text">
  </div>
  <div style="float: left; width: calc(100% - 12px);">
  <br>
  <span class="dbminputlabel">New Collection Data</span>
  <input id="cdata" class="round" placeholder="name:value name:value ..." type="text">
  </div>`;
    },
  
    init() {}, 
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mmongodb_collection_create; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const mClient = this.mongoGetClient()
      const base = data.database
      const colname = data.cname
      const cData = this.evalMessage(data.cdata, cache)
      const t = cData.split('').filter(w => w === ':').length
      let nData = {}
      for (var i = 0; i + 1 !== t ;i++) {
        const d = this.mongoGetSettingData(i, cData)
        nData[d.name] = d.value
      }

      await mClient.db(base).collection(colname).insertOne(nData)
      this.callNextAction(cache)
    },
  
    mod() {},
};