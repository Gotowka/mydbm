module.exports = {
  
  name: "Giveaway Create",

  section: "Discord",

  subtitle(data, presets) {
    const presa = data.gift
    return `Giveaway creator: ${presa}`;
  },

  variableStorage(data, varType) {
    if (1 !== varType) return;
    let dataType = "Unix Timestamp";
    return ['endTime', dataType, 'winner', '<Member>', 'check', 'boolean'];
  },

  meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/giveaway_create.js' },

  fields: ["msg", "gift", "find", "time", "type", "call"],

  html(isEvent, data) {
    return `
    <div>
        <p>
            <u>Mod Info:</u><br>
            Created by money#6283<br>
            Help: https://discord.gg/apUVFy7SUh<br>
        </p>
    </div><br>

      <div style="float: left; width: calc(50% - 12px);">
        <span class="dbminputlabel">Message (ID)</span>
        <input id="msg" class="round" type="text">

        <br>

        <span class="dbminputlabel">Gift</span>
        <input id="gift" class="round" type="text">
  
        <br>
          
        <span class="dbminputlabel">Emoji (id)</span>
        <input id="find" class="round" type="text">

      </div>
      <div style="float: right; width: calc(50% - 12px);">
      <span class="dbminputlabel">Time</span>
      <input id="time" class="round" type="text">

      <br>

      <span class="dbminputlabel">Type</span><br>
      <select id="type" class="round">
            <option value="0">Seconds</option>
            <option value="1">Minutes</option>
            <option value="2">Hours</option>
      </select>

      <br>

      <span class="dbminputlabel">Jump To Action (Giveaway End)</span><br>
      <input id="call" class="round" type="number">
    </div>
`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mgiveaway_create; \x1b[30m[\x1b[32mv1.1\x1b[30m] \x1b[30m(\x1b[36mv2.1.8\x1b[30m)\x1b[0m')
    const data = cache.actions[cache.index]
    const { interaction, msg } = cache
    const mess = (interaction ?? msg)
    let time = this.evalMessage(data.time, cache)
    const type = parseInt(data.type, 10);
    const emoji = this.evalMessage(data.find, cache)
    let duration
    let time2 = this.evalMessage(data.time, cache)
    if (type === 0) {
      duration = time2 * 1e3;
      time *= 1e3;
    }
    else if (type === 1) {
      duration = time2 * 1e3 * 60;
      time *= 1e3 * 60
    }
    else {
      duration = time2 * 1e3 * 60 * 60;
      time *= 1e3 * 60 * 60
    }
    const end = Date.parse(new Date(new Date().getTime() + duration)) / 1000;
    this.storeValue(end, 1, 'endTime', cache)
    this.storeValue(false, 1, 'check', cache)
    this.callNextAction(cache)
    setTimeout(async () => {
      const ms = await mess.channel.messages.cache.get(this.evalMessage(data.msg, cache))
      let users = await ms.reactions.cache.get(emoji).users.fetch()
      const member = users.random()
      const val = data.call
      const index = Math.max(val - 1, 0);
      cache.index = index - 1;
      this.storeValue(true, 1, 'check', cache)
      if(member.bot) {
        const member = users.random()
        const winner = mess.guild.members.cache.get(member.id)
        this.storeValue(winner, 1, 'winner', cache)
        this.callNextAction(cache);
      } else {
        const winner = mess.guild.members.cache.get(member.id)
        this.storeValue(winner, 1, 'winner', cache)
        this.callNextAction(cache);
      }
    }, time)
  },


  mod() {},
};
