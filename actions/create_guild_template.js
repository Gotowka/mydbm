module.exports = {
  
  name: "Create Guild Template",

  section: "Discord",

  subtitle(data, presets) {
    return `Guild template - ${data.name}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    let dataType = "Template URL";
    return [data.varName2, dataType];
  },

  meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/create_guild_template.js' },
  
  fields: ["server", "varName", "name", "description", "storage", "varName"],

  html(isEvent, data) {
    return `
    <div>
    <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Help: https://discord.gg/apUVFy7SUh
    </p>
</div><br>
<server-input dropdownLabel="Source Server" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>

<br><br><br><br>
<div style="float: left; width: 50%;">
<span class="dbminputlabel">Name</span><br>
<input id="name" class="round" type="text">
</div>
<br><br><br><br>
<div style="float: left; width: 50%;">
<span class="dbminputlabel">Description</span><br>
<input id="description" class="round" type="text">
</div><br><br><br>

<div style="padding-top: 16px;">
<store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>
</div>`;
  },

  init() {},


  async action(cache) {
    console.log('ACTION: create_guild_template; [v1.0] (v2.1.8)')
    const data = cache.actions[cache.index];
    const targetServer = await this.getServerFromData(data.server, data.varName, cache);
    const name = this.evalMessage(data.name, cache);
    const description = this.evalMessage(data.description, cache);
  targetServer.createTemplate(name, description)
  .then((template) => {
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(template.url, storage, varName, cache);
    this.callNextAction(cache)
  })
  .catch((err) => this.displayError(data, cache, err));
  },

  mod() {},
};