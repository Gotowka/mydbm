module.exports = {
  
  name: "Automod Create",

  section: "Discord",

  subtitle(data, presets) {
    return `Create automod - ${data.autoName}`;
  },

  meta: { version: "3.1.1", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/v3/actions/automod_create.js' },
  
  fields: ["autoName", "autoType", "autoAction", "channel", "storage", "varName"],

  html(isEvent, data) {
    return `
    <div>
    <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Help = https://discord.gg/apUVFy7SUh<br>
        Variables:(var error is required to use)<br>
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
<br>
<span class="dbminputlabel">Action</span><br>
<select id="autoAction" class="round" onchange="glob.changeType(this)">
  <option value="delete">BlockMessage</options>
  <option value="alert">SendAlert</options>
</select><br><br>
</div>
<div id="channel" style="padding-top: 8px;">
  <channel-input dropdownLabel="Source Channel" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
</div>`;
},

  init() {
      const { document, glob } = this;
      glob.changeType = function(select) {
          const ch = document.getElementById('channel')
          if (select.value === 'alert') {
              ch.style.display = null
          } else {
              ch.style.display = 'none'
          }
      }
  },


  async action(cache) {
    console.log('ACTION: automod_create; [v1.0] (v3.1.1)')
    const data = cache.actions[cache.index];
    if (!cache.server.features.includes('AUTO_MODERATION')) {
      this.storeValue('disabled', 1, 'error', cache)
      this.callNextAction(cache);
      return;
    }
    const settings = {};
    const name = this.evalMessage(data.autoName, cache);
    if (!name) return console.error('You must give the name!');
    const type = data.autoType;
    const action = data.autoAction;
    const targetChannel = await this.getChannelFromData(data.storage, data.varName, cache);
    switch(type) {
      case "spam":
        settings.triggerType = 3
        break;
    }

    switch(action) {
      case "delete":
        settings.actions = [{ type: 1 }]
        break;
      case "alert":
        settings.actions = [{ type: 2, metadata: { channel: targetChannel } }]
        break;
    }
    

    settings.name = name;
    settings.eventType = 1;
    settings.enabled = true;

    await cache.server.autoModerationRules.create(settings);
  },

  mod() {},
};