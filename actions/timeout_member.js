module.exports = {

  name: "Timeout Member",

  section: "Member Control",

  subtitle(data, presets) {
    return `${presets.getMemberText(data.member, data.varName)}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName, "Unix Timestamp"];
  },

  meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/timeout_member.js' },

  fields: ["member", "varName2", "time", "reason", "storage", "varName"],

  html(isEvent, data) {
    return `
  <div>
    <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Help: https://discord.gg/apUVFy7SUh
    </p>
</div><br>
<member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer2" variableInputId="varName2"></member-input>

<br><br><br>

<div style="float: left; width: 50%;">
<span class="dbminputlabel">Time</span><br>
<input id="time" class="round" placeholder="Type: np 1s/1m/1h/1d" type="text">
<br>
<span class="dbminputlabel">Reason</span><br>
<input id="reason" class="round" type="text">
</div><br><br><br><br><br><br><br>

<store-in-variable style="width: calc(80% - 12px);" dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(data.member, data.varName2, cache);
    
    let duration = this.evalMessage(data.time, cache);

    if (duration.includes("s")) {
        duration = duration.split("s")[0] * 1e3;
    } else if (duration.includes("m")) {
        duration = duration.split("m")[0] * 1e3 * 60;
    } else if (duration.includes("h")) {
        duration = duration.split("h")[0] * 1e3 * 60 * 60;
    } else if (duration.includes("d")) {
        duration = duration.split("d")[0] * 1e3 * 60 * 60 * 60;
    } else {
        duration = 5 * 1e3;
    };
    const endTimeout = Date.parse(new Date(new Date().getTime() + duration)) / 1000;
    duration = Date.now() + duration;
    const reason = this.evalMessage(data.reason, cache);
    if (member?.disableCommunicationUntil) {
      member.disableCommunicationUntil(duration, reason)
        .then(() => {
          this.storeValue(endTimeout, parseInt(data.storage, 10), data.varName, cache);
          this.callNextAction(cache)
        })
        .catch((err) => this.displayError(data, cache, err));
    } else {
      this.callNextAction(cache);
    }
  },

  mod() {},
};