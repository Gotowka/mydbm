module.exports = {
  name: 'Control Server Prefix',
  section: 'Server Control',
  meta: {
    version: '3.2.1',
    preciseCheck: false,
    author: 'DBM Mods',
    authorUrl: 'https://github.com/dbm-network/mods',
    downloadURL: 'https://github.com/dbm-network/mods/blob/master/actions/control_server_prefix_MOD.js',
  },

  subtitle(data) {
    if (parseInt(data.controlType, 10) === 1) {
      return 'Delete server prefix';
    }
    return `Set server prefix: ${data.prefix}`;
  },

  fields: ['server', 'controlType', 'varName', 'prefix'],

  html() {
    return `
<server-input dropdownLabel="Source Server" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>
<br><br><br>

<div style="padding-top: 8px; width: 35%; float: left">
  <span class="dbminputlabel">Control Type</span>
  <select id="controlType" class="round" onchange="glob.onChangeControl(this)">
    <option value="0" title="Sets the prefix of the server">Set Prefix</option>
    <option value="1" title="Sets the prefix to default prefix (settings)">Delete Prefix</option>
  </select>
</div>

<div id="prefixContainer" style="padding-top: 8px; width: 60%; float: right">
  <span class="dbminputlabel">Prefix</span>
  <input id="prefix" class="round" type="text">
</div>`;
  },

  init() {
    const { glob, document } = this;

    glob.serverChange(document.getElementById('server'), 'varNameContainer');
    glob.onChangeControl = function onChangeControl(controlType) {
      document.getElementById('prefixContainer').style.display = [null, 'none'][parseInt(controlType.value, 10)];
    };

    glob.onChangeControl(document.getElementById('controlType'));
  },

  async action(cache) {
    const fs = require('fs');
    const path = require('path');
    const data = cache.actions[cache.index];
    const { Actions } = this.getDBM();

    const server = await this.getServerFromData(data.server, data.varName, cache);
    const controlType = parseInt(data.controlType, 10);
    const prefix = this.evalMessage(data.prefix, cache);
    const settingsPath = path.join('data', 'serverSettings.json');

    if (!fs.existsSync(settingsPath))
      return Actions.displayError(
        data,
        cache,
        'You must have the server_prefixes_EXT.js extension installed to use this action',
      );

    fs.readFile(settingsPath, 'utf8', (err, file) => {
      if (err) return Actions.displayError(data, cache, err);
      const json = JSON.parse(file);
      if (controlType === 0) {
        json[server.id] = prefix;
      } else if (controlType === 1 && json[server.id]) {
        delete json[server.id];
        delete server.prefix;
      }

      fs.writeFile(settingsPath, JSON.stringify(json), (err) => {
        if (err) return Actions.displayError(data, cache, err);
        server.prefix = prefix;
        Actions.callNextAction(cache);
      });
    });
  },

  mod() {},
};
