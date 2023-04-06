module.exports = {
  
  name: "Automod Create",

  section: "Discord",

  subtitle(data, presets) {
    return `Create automod - ${data.autoName}`;
  },

  meta: { version: "3.0.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/v3/actions/automod_create.js' },
  
  fields: ["autoName", "autoType", "autoAction", "textTime", "autoTime"],

  html(isEvent, data) {
    return `
    <div>
    <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Help = discord.gg/ae8hgMDxDc<br>
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
  <option value="timeout">TimeoutMember</options>
</select><br>
<span id="textTime" style="display: none;" class="dbminputlabel">Time</span><br>
<input id="autoTime" style="display: none;" class="round" placeholder="Timeout in seconds" type="text">
</div>`;
},

  init() {
      const { document, glob } = this;
      glob.changeType = function(select) {
          const timeDoc = document.getElementById('autoTime')
          const timeText = document.getElementById('textTime')
          if (select.value === 'timeout') {
              timeDoc.style.display = null
              timeText.style.display = null
          } else {
              timeDoc.style.display = 'none'
              timeText.style.display = 'none'
          }
      }
  },


  async action(cache) {
    const data = cache.actions[cache.index];
    if (!cache.server.features.includes('AUTO_MODERATION')) {
      this.storeValue('disabled', 1, 'error', cache)
      this.callNextAction(cache);
      return;
    }
    const settings = {};
    const name = this.evalMessage(data.autoName, cache);
    const type = data.autoType;
    const action = data.autoAction;
    const time = this.evalMessage(data.autoTime, cache);

    switch(type) {
      case "spam":
        settings.triggerType = 3
        break;
    }

    switch(action) {
      case "delete":
        settings.actions = [{ type: 1 }]
        break;
      case "timeout":
        settings.actions = [{ type: 3, metadata: { durationSeconds: parseInt(time) } }]
        break;
    }
    
    if (!name) return console.error('You must give the name!');
    if (action === 'timeout' && !time) return console.error('You must give the time!');

    settings.name = name;
    settings.eventType = 1;
    settings.enabled = true;

    await cache.server.autoModerationRules.create(settings);
  },

  mod() {},
};