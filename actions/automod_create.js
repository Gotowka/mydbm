module.exports = {
  
  name: "Automod Create",

  section: "Discord",

  subtitle(data, presets) {
    return `Create automod - ${data.autoName}`;
  },

  meta: { version: "3.2.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/automod_create.js' },
  
  fields: ["autoName", "autoType", "channel", "storage", "varName", "delete", "alert" ],

  actions: [],

  html(isEvent, data) {
    return `
    <div>
    <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Help = https://discord.gg/apUVFy7SUh<br>
        Variables:<br>
        <span class="dbminputlabel">error('disabled')</span>
    </p>
</div><br>
<div style="float: left; width: 50%;">
<span class="dbminputlabel">Name</span><br>
<input id="autoName" class="round" type="text">
<br>
<span class="dbminputlabel">Type</span><br>
<select id="autoType" class="round">
  <option value="spam">Spam</options>
</select>
</div>
<br><br><br><br><br><br><br>
<div id="channel" style="float: left; padding-top: 8px; width: 100%;">
  <channel-input dropdownLabel="Source Channel" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
</div><br><br><br><br>
<div style="float: left; width: 50%;">
<dbm-checkbox id="delete" onchange="glob.changeType()" label="BlockMessage"></dbm-checkbox>
</div>
<div style="float: right; width: 50%;">
<dbm-checkbox id="alert" onchange="glob.changeType()" label="SendAlert"></dbm-checkbox>
</div>`;
},


  init() {
      const { document, glob } = this;
      glob.changeType = function() {
          const ch = document.getElementById('channel')
          const alert = document.getElementById('alert')
          const deletem = document.getElementById('delete')
          if (tp === "delete") {
            if (alert.value === 'true' && deletem.value === 'true') this.actions = ["alert", "delete"]
            else if (alert.value === 'true') this.actions = ["alert"]
            else if (deletem.value === 'true') this.actions = ["delete"]
          }
          if (alert.value === 'true') {
              ch.style.display = null
          } else {
              ch.style.display = 'none'
          }
      }
  },


  async action(cache) {
    console.log('ACTION: automod_create; [v1.1] (v3.1.1)')
    const { djsV } = require('../bot')
    const data = cache.actions[cache.index];
    if (!djsV) return console.error('Update the bot.js, https://github.com/Gotowka/mydbm/blob/v3/bot.js');
    if (!cache.server.features.includes('AUTO_MODERATION')) {
      this.storeValue('disabled', 1, 'error', cache)
      this.callNextAction(cache);
      return;
    }
    const settings = {
      actions: []
    };
    const name = this.evalMessage(data.autoName, cache);
    if (!name) return console.error('You must give the name!');
    const type = data.autoType;
    const targetChannel = await this.getChannelFromData(data.storage, data.varName, cache);
    switch(type) {
      case "spam":
        settings.triggerType = 3
        break;
    }

    if (this.actions.includes('delete')) settings.actions.push({ type: 1 })
    if (this.actions.includes('alert')) settings.actions.push({ type: 2, metadata: { channel: targetChannel } })
  
    settings.name = name;
    settings.eventType = 1;
    settings.enabled = true;

    await cache.server.autoModerationRules.create(settings);
  },

  mod() {},
};