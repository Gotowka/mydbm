module.exports = {

  name: "Timeout Member",

  section: "Member Control",

  subtitle(data, presets) {
    return `${presets.getMemberText(data.member, data.varName)}`;
  },

  meta: { version: "2.1.7", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/actions/timeout_member.js' },

  fields: ["member", "varName", "time", "reason"],

  html(isEvent, data) {
    return `
  <div>
    <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Variables: endtime
    </p>
</div><br>
<member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>

<br><br><br><br>

<div style="float: right; width: 50%;">
<span class="dbminputlabel">Time</span><br>
<input id="time" class="round" placeholder="Type: np 1s/1m/1h/1d" type="text">
</div><br><br><br>

<div style="padding-top: 16px;">
  <span class="dbminputlabel">Reason</span><br>
  <textarea id="reason" class="dbm_monospace" rows="5" placeholder="Insert reason here..." style="white-space: nowrap; resize: none;"></textarea>
</div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(data.member, data.varName, cache);
    
    let duration = this.evalMessage(data.time, cache)

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
    duration = new Date() + duration
    const endTimeout = Date.parse(new Date(new Date().getTime() + duration)) / 1000;
    const reason = this.evalMessage(data.reason, cache);
    if (member?.disableCommunicationUntil) {
      member.disableCommunicationUntil(duration, reason)
        .then(() => {
          const endtime = `<t:${endTimeout}:R>`
          this.storeValue(endtime, 1, 'endtime', cache)
          this.callNextAction(cache)
        })
        .catch((err) => this.displayError(data, cache, err));
    } else {
      this.callNextAction(cache);
    }
  },

  mod() {},
};
