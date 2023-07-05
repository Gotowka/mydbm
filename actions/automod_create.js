module.exports = {
  
  name: "Automod Create",

  section: "Discord",

  subtitle(data, presets) {
    return `Create automod - ${data.autoName}`;
  },

  variableStorage(data, varType) {
        if (1 !== varType) return;
        let dataType = "Check result 'create'";
        return ['error', dataType];
    },

  meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/automod_create.js' },
  
  fields: ["autoName", "autoType", "channel", "storage", "varName", "delete", "alert"],

  html(isEvent, data) {
    return `
    <div>
    <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Help = https://discord.gg/apUVFy7SUh<br>
        Variables:<br>
        <span class="dbminputlabel">error('disabled', 'create')</span>
    </p>
</div><br>
<div style="float: left; width: 50%;">
<span class="dbminputlabel">Name</span><br>
<input id="autoName" class="round" type="text">
<br>
<span class="dbminputlabel">Type</span><br>
<select id="autoType" class="round">
  <option value="SPAM">Spam</options>
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
          const ch = document.getElementById('channel');
          const alert = document.getElementById('alert');
          if (alert.value === true) {
              ch.style.display = null;
          } else {
              ch.style.display = 'none';
          }
      }
  },


  async action(cache) {
    console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mautomod_create; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
    const data = cache.actions[cache.index];
    let functions = []
    const settings = {
      name: this.evalMessage(data.autoName, cache),
      eventType: 'MESSAGE_SEND',
      triggerType: "SPAM",
      enabled: true,
      actions: []
    };
    const targetChannel = await this.getChannelFromData(data.storage, data.varName, cache);

    if (data.alert === true && data.delete === true) functions = ["delete", "alert"];
    else if (data.alert === true) functions = ["alert"];
    else if (data.delete === true) functions = ["delete"];

    if (functions.includes('delete')) settings.actions.push({ type: "BLOCK_MESSAGE" })
    if (functions.includes('alert')) settings.actions.push({ type: "SEND_ALERT_MESSAGE", metadata: { channel: targetChannel } })

    await cache.server.autoModerationRules.create(settings).catch(er => {
      console.log(er)
      this.storeValue('create', 1, 'error', cache)
    });
    this.callNextAction(cache);
  },



  mod() {},
};