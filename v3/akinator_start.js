module.exports = {
  
    name: "Akinator Start",
  
    section: "Discord",
  
    subtitle(data, presets) {
      return `Play akinator`;
    },
  
    variableStorage(data, varType) {
      if (1 !== varType) return;
      return ["question", "<Text>", "answers", "Array<Text>"];
    },
  
    meta: { version: "3.2.4", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/akinator_start.js' },
    
    fields: ["region", "proxy"],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh
      </p>
  </div><br>  
  <div style="float: left; width: 50%;">
  <span class="dbminputlabel">Region</span><br>
  <select id="region" class="round">
    <option value="en">English</options>
    <option value="pl">Poland</options>
  </select>
  <br><br>
  <span class="dbminputlabel">Proxy</span><br>
  <input id="proxy" class="round" type="text" placeholder="leave blank for default">
  </div>`;
    },
  
    init() {},
  
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33makinator_start; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.4\x1b[30m)\x1b[0m')
      const { Aki } = require('aki-api');
      const { msg, interaction } = cache
      const data = cache.actions[cache.index];

      const region = data.region
      const childMode = false
      const proxy = this.evalMessage(data.proxy, cache) || undefined

      const aki = new Aki({ region, childMode, proxy })

      await aki.start()

      this.getDBM().Actions.akinatorSet((msg ?? interaction).user.id, aki)

      const answers = "* " + aki.answers.join("\n* ")

      this.storeValue(aki.question, 1, 'question', cache)
      this.storeValue(answers, 1, 'answers', cache)
      this.callNextAction(cache)
    },
  
    mod() {},
};