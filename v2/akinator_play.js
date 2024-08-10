module.exports = {
  
    name: "Akinator Play",
  
    section: "Discord",
  
    subtitle(data, presets) {
      return `Play akinator`;
    },
  
    variableStorage(data, varType) {
      if (1 !== varType) return;
      return ["question", "<Text>", "answers", "Array<Text>", "progress", "<Number>", "name", "<Text>", "description", "<Text>", "photo", "<Url>", "pseudo", "<Text>"];
    },
  
    meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/akinator_play.js' },
    
    fields: ["answer"],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh
          Variables: name, description, photo and pseudo exist only when guess complete
      </p>
  </div><br>  
  <div style="float: left; width: 50%;">
  <span class="dbminputlabel">Answer</span><br>
  <input id="answer" class="round" type="text">
  </div>`;
    },
  
    init() {},
  
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33makinator_play; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
      const { msg, interaction } = cache
      const data = cache.actions[cache.index]

      let aki

      if (this.getDBM().Actions.akinatorGet((msg ?? interaction).user.id)) {
        aki = this.getDBM().Actions.akinatorGet((msg ?? interaction).user.id)
        await aki.step(this.evalMessage(data.answer, cache))
      }
      else {
       this.callNextAction(cache)
      }

      const answers = "* " + aki.answers.join("\n* ")

      if (aki.guess) {
        this.storeValue(aki.guess.name_proposition, 1, 'name', cache)
        this.storeValue(aki.guess.description_proposition, 1, 'description', cache)
        this.storeValue(aki.guess.photo, 1, 'photo', cache)
        this.storeValue(aki.guess.pseudo, 1, 'pseudo', cache)
      }

      this.storeValue(aki.question, 1, 'question', cache)
      this.storeValue(answers, 1, 'answers', cache)
      this.storeValue(aki.progress?.split('.')?.at(0), 1, 'progress', cache)
      this.callNextAction(cache)
    },
  
    mod() {},
};