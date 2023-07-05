module.exports = {
  
    name: "MongoDB Collection Get",
  
    section: "MongoDB",
  
    subtitle(data, presets) {
      return `Get mongoDB collection data`;
    },
  
    meta: { version: "2.1.8", preciseCheck: false, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/mongodb_collection_get.js' },
  
    fields: ["database", "findby", "cname", "value", "storage", "varName"],
  
    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      return [data.varName, "Collection Data"];
    },
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh
      </p>
  </div><br><br>
  <div style="float: left; width: calc(50% - 12px);">
    <span class="dbminputlabel">Database Name</span>
    <input id="database" class="round" type="text">
    <br>
    <span class="dbminputlabel">Find Data By</span>
    <input id="findby" class="round" type="text">
  </div>
  <div style="float: right; width: calc(50% - 12px);">
    <span class="dbminputlabel">Collection Name</span>
    <input id="cname" class="round" type="text">
    <br>
    <span class="dbminputlabel">Find By Value</span>
    <input id="value" class="round" type="text">
  </div>
  <div style="float: left; width: calc(100% - 12px);">
  <br>
  <store-in-variable dropdownLabel="Store Data In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>
  </div>`;
    },
    init() {}, 
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mmongodb_collection_get; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const mClient = this.mongoGetClient();
      const fBy = this.evalMessage(data.findby, cache)
      const val = this.evalMessage(data.value, cache)
      const bsName = this.evalMessage(data.database, cache)
      const cName = this.evalMessage(data.cname, cache)
      const col = mClient.db(bsName).collection(cName)
      const t = await col.findOne({ [fBy]: val })
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(t, storage, varName, cache);
      this.callNextAction(cache);
    },
  
    mod() {},
};