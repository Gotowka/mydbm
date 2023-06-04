module.exports = {
  
    name: "MongoDB Collection Create",
  
    section: "MongoDB",
  
    subtitle(data, presets) {
      return `Create mongoDB collection data`;
    },
  
    meta: { version: "3.2.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/mongodb_collection_create.js' },
  
    fields: ["database", "cdata", "cname", "value"],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh<br>
          Collection Data is limited to 4
      </p>
  </div><br><br>
  <div style="float: left; width: calc(50% - 12px);">
    <span class="dbminputlabel">Database Name</span>
    <input id="database" class="round" type="text">
    <br>
    <span class="dbminputlabel">New Collection Data</span>
    <input id="cdata" class="round" placeholder="name:value name:value ..." type="text">
  </div>
  <div style="float: right; width: calc(50% - 12px);">
    <span class="dbminputlabel">New Collection Name</span>
    <input id="cname" class="round" type="text">
    <br>
    <span class="dbminputlabel">Find By Value</span>
    <input id="value" class="round" type="text">
  </div>`;
    },
  
    init() {}, 
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mmongodb_collection_create; \x1b[30m[\x1b[32mv1.1\x1b[30m] \x1b[30m(\x1b[36mv3.2.0\x1b[30m)')
      const data = cache.actions[cache.index];
      const mClient = this.mongoGetClient()
      const base = data.database
      const cData = this.evalMessage(data.cdata, cache)
      const t = cData.split(' ').filter(w => w === ':').length
      if (t > 4) console.warn('The New Collection Data is limited to 4, more is not created in the data!')
      const nData = []
      for (var i = 0; i + 1 === t ;i++) {
        const t = this.mongoGetSettingData(i, cData)
        if (i > 3 === false) nData.push(t)
      }
      await mClient.collection(base).insertOne({ [nData[0].name]: [nData[0].value], [nData[1].name]: [nData[1].value], [nData[2].name]: [nData[2].value], [nData[3].name]: [nData[3].value] })
      this.callNextAction(cache)
    },
  
    mod() {},
  };
  
