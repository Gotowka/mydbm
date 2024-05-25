module.exports = {
  
  name: "Automod Create",

  section: "Discord",

  subtitle(data, presets) {
    let fn
    if (data.aspam) fn = "spam";
    else if (data.akeyword) fn = "keyword";
    else if (data.amentionspam) fn = "mention_spam";
    else fn = "none";
    return `Create automod - ${fn}`;
  },

  variableStorage(data, varType) {
        if (1 !== varType) return;
        let dataType = "Check result 'channel'/'create'";
        return ['error', dataType];
    },

  meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/automod_create.js' },
  
  fields: ["spam", "keyword", "mention_spam", "aspam", "akeyword", "amentionspam"],

  html(isEvent, data) {
    return `
    <div>
    <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Help = https://discord.gg/apUVFy7SUh<br>
        Variables: error('channel', 'create')
    </p>

  <tab-system style="margin-top: 20px;">


    <tab label="Spam" icon="align left">
      <dialog-list id="spam" fields='["autoName", "delete", "alert", "autoMsg", "storage", "varName", "autoRole", "autoChannel", "name"]' dialogTitle="Automod Spam" dialogWidth="540" dialogHeight="460" listLabel="Automod Settings" listStyle="height: calc(100vh - 350px);" itemName="spams" itemTextFunction="data.name + ' - Setting'" itemCols="1" itemHeight="30px;" itemStyle="text-align: left; line-height: 30px;">
    
        <tab-system>
    
          <tab label="Automod" icon="certificate">
            <div style="float: left; width: calc(50% - 12px); padding: 8px;">
              <span class="dbminputlabel">Name</span>
              <input id="autoName" class="round" type="text">
            </div>
          </tab>
    
          <tab label="Actions" icon="list">
            <div style="float: left; padding: 8px;">
              <dbm-checkbox id="delete" label="BlockMessage"></dbm-checkbox>
            </div>

            <div style="float: right; padding: 8px;">
              <dbm-checkbox id="alert" label="SendAlert"></dbm-checkbox>
            </div>
          </tab>

          <tab label="Actions Settings" icon="list">
            <div style="float: left; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">customMessage (SendAlert)</span>
            <input id="autoMsg" class="round" placeholder="Leave blank for default" type="text">
            </div>

            <div style="float: left; width: calc(100% - 12px); padding: 8px;">
              <channel-input dropdownLabel="Source Channel" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
            </div>
          </tab>

          <tab label="Exempt" icon="certificate">
            <div style="float: left; width: calc(50% - 12px); padding: 8px;">
              <span class="dbminputlabel">Exempt Role (ID)</span>
              <input id="autoRole" class="round" placeholder="Leave blank for none" type="text">
            </div>

            <div style="float: right; width: calc(50% - 12px); padding: 8px;">
              <span class="dbminputlabel">Exempt Channel (ID)</span>
              <input id="autoChannel" class="round" placeholder="Leave blank for none" type="text">
            </div>
          </tab>

          <tab label="Settings" icon="user circle">
            <div style="float: left; width: calc(50% - 12px); padding: 8px;">
              <span class="dbminputlabel">Name (SETTING)</span>
              <input id="name" class="round" type="text">
            </div>
          </tab>
    
        </tab-system>
      </dialog-list>
    </tab>
    
    
    <tab label="Keyword" icon="book image">
      <dialog-list id="keyword" fields='["autoName", "autoFilter", "delete", "timeout", "alert", "autoTime", "autoMsg", "storage", "varName", "autoRole", "autoChannel", "name"]' dialogTitle="Automod Keyword" dialogWidth="540" dialogHeight="460" listLabel="Automod Settings" listStyle="height: calc(100vh - 350px);" itemName="keywords" itemTextFunction="data.name + ' - Setting'" itemCols="1" itemHeight="30px;" itemStyle="text-align: left; line-height: 30px;">
    
      <tab-system>

        <tab label="Automod" icon="certificate">
          <div style="float: left; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Name</span>
            <input id="autoName" class="round" type="text">
          </div>
  
          <div style="float: right; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Filter</span>
            <input id="autoFilter" class="round" placeholder="WORD WORD WORD ..." type="text">
          </div>
        </tab>

        <tab label="Actions" icon="list">
          <div style="float: left; padding: 8px;">
            <dbm-checkbox id="delete" label="BlockMessage"></dbm-checkbox>
            <br>
            <dbm-checkbox id="timeout" label="Timeout"></dbm-checkbox>
          </div>

          <div style="float: right; padding: 8px;">
            <dbm-checkbox id="alert" label="SendAlert"></dbm-checkbox>
          </div>
        </tab>

        <tab label="Actions Settings" icon="list">
          <div style="float: left; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Time (Timeout)</span>
            <input id="autoTime" class="round" placeholder="Time in seconds" type="text">
          </div>

          <div style="float: right; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">customMessage (SendAlert)</span>
            <input id="autoMsg" class="round" placeholder="Leave blank for default" type="text">
          </div>

          <div style="float: left; width: calc(100% - 12px); padding: 8px;">
            <channel-input dropdownLabel="Source Channel" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
          </div>
        </tab>

        <tab label="Exempt" icon="certificate">
          <div style="float: left; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Exempt Role (ID)</span>
            <input id="autoRole" class="round" placeholder="Leave blank for none" type="text">
          </div>

          <div style="float: right; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Exempt Channel (ID)</span>
            <input id="autoChannel" class="round" placeholder="Leave blank for none" type="text">
          </div>
        </tab>

        <tab label="Settings" icon="user circle">
          <div style="float: left; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Name (SETTING)</span>
            <input id="name" class="round" type="text">
          </div>
        </tab>

      </tab-system>
    </dialog-list>
  </tab>
    
  <tab label="Mention Spam" icon="plane">
    <dialog-list id="mention_spam" fields='["autoName", "autoLimit", "delete", "timeout", "alert", "autoTime", "autoMsg", "storage", "varName", "autoRole", "autoChannel", "name"]' dialogTitle="Automod Mention Spam" dialogWidth="540" dialogHeight="460" listLabel="Automod Settings" listStyle="height: calc(100vh - 350px);" itemName="mentionspams" itemTextFunction="data.name + ' - Setting'" itemCols="1" itemHeight="30px;" itemStyle="text-align: left; line-height: 30px;">
    
      <tab-system>

        <tab label="Automod" icon="certificate">
          <div style="float: left; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Name</span>
            <input id="autoName" class="round" type="text">
          </div>

          <div style="float: right; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Mention Limit</span>
            <input id="autoLimit" class="round" placeholder="Mention limit in message" type="text">
          </div>
        </tab>

        <tab label="Actions" icon="list">
          <div style="float: left; padding: 8px;">
            <dbm-checkbox id="delete" label="BlockMessage"></dbm-checkbox>
            <br>
            <dbm-checkbox id="timeout" label="Timeout"></dbm-checkbox>
          </div>

          <div style="float: right; padding: 8px;">
            <dbm-checkbox id="alert" label="SendAlert"></dbm-checkbox>
          </div>
        </tab>

        <tab label="Actions Settings" icon="list">
          <div style="float: left; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Time (Timeout)</span>
            <input id="autoTime" class="round" placeholder="Time in seconds" type="text">
          </div>

          <div style="float: right; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">customMessage (SendAlert)</span>
            <input id="autoMsg" class="round" placeholder="Leave blank for default" type="text">
          </div>

          <div style="float: left; width: calc(100% - 12px); padding: 8px;">
            <channel-input dropdownLabel="Source Channel" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
          </div>
        </tab>

        <tab label="Exempt" icon="certificate">
          <div style="float: left; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Exempt Role (ID)</span>
            <input id="autoRole" class="round" placeholder="Leave blank for none" type="text">
          </div>

          <div style="float: right; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Exempt Channel (ID)</span>
            <input id="autoChannel" class="round" placeholder="Leave blank for none" type="text">
          </div>
        </tab>

        <tab label="Settings" icon="user circle">
          <div style="float: left; width: calc(50% - 12px); padding: 8px;">
            <span class="dbminputlabel">Name (SETTING)</span>
            <input id="name" class="round" type="text">
          </div>
        </tab>
    
      </tab-system>
    </dialog-list>
  </tab>
    
    
  <tab label="Settings" icon="cogs">
    <div style="padding: 8px;">
      <dbm-checkbox style="float: left;" id="aspam" label="Spam" checked></dbm-checkbox>
    
      <dbm-checkbox style="float: left;" id="akeyword" label="Keyword" checked></dbm-checkbox>
    
      <dbm-checkbox style="float: left;" id="amentionspam" label="MentionSPam" checked></dbm-checkbox>
    
      <br><br>
    
      <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px;">
    </div>
  </tab>
</tab-system>
    `;
  },


  init() {},

  async action(cache) {
    console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mautomod_create; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
    const data = cache.actions[cache.index];
    const option = checkAutoMod()
    const autoMod = data[option][0]
    const settings = {
      name: this.evalMessage(autoMod.autoName, cache),
      eventType: 'MESSAGE_SEND',
      triggerType: option.toUpperCase(),
      enabled: true,
      actions: [],
      triggerMetadata: {}
    }

    if (autoMod.delete) settings.actions.push({ type: "BLOCK_MESSAGE" });
    if (autoMod.alert) {
      const targetChannel = await this.getChannelFromData(autoMod.storage, autoMod.varName, cache);
      if (!targetChannel) {
        this.storeValue('channel', 1, 'error', cache)
        this.callNextAction(cache);
      }
      if (autoMod.autoMsg) settings.actions.push({ type: "SEND_ALERT_MESSAGE", metadata: { channel: targetChannel, customMessage: this.evalMessage(autoMod.autoMsg, cache) } });
      else settings.actions.push({ type: "SEND_ALERT_MESSAGE", metadata: { channel: targetChannel } });
    };
    if (autoMod.timeout) settings.actions.push({ type: "TIMEOUT", metadata: { durationSeconds: autoMod.autoTime ? this.evalMessage(autoMod.autoTime, cache) : 10 } });
    if (this.evalMessage(autoMod.autoRole, cache)) {
      let d = this.evalMessage(autoMod.autoRole, cache)
      d = cache.server.roles.cache.get(d)
      if (typeof d === 'object') settings.exemptRoles = [d]
    }
    if (this.evalMessage(autoMod.autoChannel, cache)) {
      let d = this.evalMessage(autoMod.autoChannel, cache)
      d = cache.server.channels.cache.get(d)
      if (typeof d === 'object') settings.exemptChannels = [d]
    }
    if (this.evalMessage(autoMod.autoFilter, cache)) {
      const d = this.evalMessage(autoMod.autoFilter, cache).split(' ')
      settings.triggerMetadata.keywordFilter = d
    }
    if (settings.triggerType === 'MENTION_SPAM') settings.triggerMetadata.mentionTotalLimit = autoMod.autoLimit ? parseInt(this.evalMessage(autoMod.autoLimit, cache)) : 1

    await cache.server.autoModerationRules.create(settings).catch(er => {
      console.log(er)
      this.storeValue('create', 1, 'error', cache)
      this.callNextAction(cache)
      return;
    });
    this.storeValue('none', 1, 'error', cache)
    this.callNextAction(cache);

    function checkAutoMod() {
      const t = getAutomod(data)
      if (t !== "none") return t;

      console.log('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[0m Automod is required!\x1b[0m');
      this.callNextAction(cache);
    }

    function getAutomod() {
      if (data.aspam) return "spam";
      else if (data.akeyword) return "keyword";
      else if (data.amentionspam) return "mention_spam";
      else return "none";
    }
  },



  mod() {},
};