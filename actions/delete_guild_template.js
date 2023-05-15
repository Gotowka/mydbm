module.exports = {
  
    name: "Delete Guild Template",
  
    section: "Discord",
  
    subtitle(data, presets) {
      return `Delete the guild template`;
    },
  
    meta: { version: "2.1.7", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/actions/delete_guild_template.js' },
    
    fields: ["server", "varName"],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Help: https://discord.gg/apUVFy7SUh
      </p>
  </div><br>
  <server-input dropdownLabel="Source Server" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>`;
    },
  
    init() {},
  
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const targetServer = await this.getServerFromData(data.server, data.varName, cache);
    const template = await targetServer.fetchTemplates()
    
    await template.delete()
    },
  
    mod() {},
  };