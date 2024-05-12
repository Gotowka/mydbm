module.exports = {
  
    name: "Command Parameter Set Number Value",
  
    section: "Command",
  
    param: {
        name: '',
        min: '',
        max: ''
    },

    subtitle(data, presets) {
      return ``;
    },
  
    meta: { version: "3.2.4", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/command_param_set_value.js' },
    
    fields: ["pname", "min", "max"],
  
    html(isEvent, data) {
      return `
      <div>
      <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help = https://discord.gg/apUVFy7SUh<br>
          Parameter must by type number/integer
      </p>
  </div><br>
  <div style="float: left; width: calc(50% - 12px);">
    <span class="dbminputlabel">Parameter Name</span>
    <input id="pname" class="round" type="text">
    <br>
    <span class="dbminputlabel">Min Value</span>
    <input id="min" class="round" type="number">
    <br>
    <span class="dbminputlabel">Max Value</span>
    <input id="max" class="round" type="number">
  </div>`;
  },
  
  
    init() {
        const { document } = this;
        document.getElementById('createAction').addEventListener("click", save());
        function save() {
            const name = document.getElementById('pname').value
            const min = document.getElementById('min').value
            const max = document.getElementById('max').value

            this.param.name = name
            this.param.min = min
            this.param.max = max
        }
    },
  
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mcommand_param_set_value; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.4\x1b[30m)\x1b[0m')

      this.callNextAction(cache)
    },
  
    mod() {},
  };