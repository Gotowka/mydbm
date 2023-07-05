module.exports = {
  
    name: "MongoDB Collection Edit",
  
    section: "MongoDB",
  
    subtitle(data, presets) {
      return `Edit mongoDB collection data`;
    },
  
    meta: { version: "2.1.8", preciseCheck: false, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/mongodb_collection_edit.js' },
  
    fields: ["database", "fdata", "cname", "udata"],
  
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
    <br>
    <span class="dbminputlabel">Find By</span>
    <input id="fdata" class="round" placeholder="example ID:userID" type="text">
  </div>
  <div style="float: right; width: calc(50% - 12px);">
    <span class="dbminputlabel">Collection Name</span>
    <input id="cname" class="round" type="text">
    <br>
    <span class="dbminputlabel">New Collection Data</span>
    <input id="udata" class="round" placeholder="name:value name:value ..." type="text">
  </div>`;
    },
  
    init() {}, 
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mmongodb_collection_edit; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const mClient = this.mongoGetClient()
      const base = data.database
      const colname = data.cname
      const fData = this.evalMessage(data.fdata, cache)
      const uData = this.evalMessage(data.udata, cache)
      const t = uData.split('').filter(w => w === ':').length
      let nData = {}
      let oData = {}
      for (var i = 0; i + 1 !== t ;i++) {
        const d = this.mongoGetSettingData(i, uData)
        nData[d.name] = d.value
      }
      oData[fData.split(':').at(0)] = fData.split(':').at(1)

      await mClient.db(base).collection(colname).findOneAndUpdate(oData, nData)
      this.callNextAction(cache)
    },
  
    mod() {},
};