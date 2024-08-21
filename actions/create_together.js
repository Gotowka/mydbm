module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Create Together",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Discord",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = 'Together Code'
    const map = []
    map.push(data.varName)
    map.push(dataType)

    map.push('error')
    map.push("<Voice/Together>")
    return map
  },

  subtitle(data, presets) {
    return `Start together - ${data.together}`;
  },


  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/create_together.js' },
  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["together", "storage", "varName"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
    <div>
    <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Help: https://discord.gg/apUVFy7SUh
    </p>
</div><br>
<div style="padding-top: 8px; width: 100%;">
  <span class="dbminputlabel">Source Together</span><br>
  <select id="together" class="round">
    <option value="youtube">Youtube</options>
    <option value="spellcast">Spellcast</options>
    <option value="poker">Poker</options>
    <option value="fishing">Fishing</options>
    <option value="chess">Szachy</options>
    <option value="checkers">Warcaby</options>
    <option value="sketchheads">Sketchheads</options>
    <option value="doodlecrew">Doodlecrew</options>
    <option value="wordsnack">Wordsnack</options>
    <option value="awkword">Awkword</options>
    <option value="lettertile">Letter League</options>
    <option value="puttparty">Putt Party</options>
    <option value="bobble">Bobble League</options>
    <option value="land">Landio.io</options>
    <option value="meme">Know What I Meme</options>
    <option value="askaway">Ask Away</options>
    <option value="bashout">Bash Out</options>
    <option value="puttpartyqa">Putt Part Qa</options>
    <option value="garticphone">Gartic Phone</options>
    <option value="color">Color Together</options>
    <option value="chefshowdown">Chef Showdown</options>
    <option value="scrappies">Bobble Land: Scrappies</options>
    <option value="jamspace">Jamspace</options>
    <option value="guestbook">Guestbook</options>
    <option value="krunker">Project K(Known as Krunker)</options>
    <option value="colonist">Colonist</options>
    <option value="ai">Death by AI</options>
    <option value="bopz">BOPZ.io</options>
    <option value="radio">Tuneln Radio & Podcasts</options>
    <option value="rythm">Rythm</options>
    <option value="goober">Goober Dash</options>
    <option value="farm">Farm Merge Valley</options>
    <option value="rocket">Rocket Bot Royale</options>
    <option value="amazon">Amazon Music</options>
    <option value="roll">Roll 20</options>
  </select>
</div>
<br>
<store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>
    `;
  },

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mcreate_together; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m')
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const Client = this.getTogether();
    if (!Client) return console.warn('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[36m Use action \x1b[33mconnect_together_client\x1b[36m, https://github.com/Gotowka/mydbm/blob/v2/actions/connect_together_clients\x1b[0m')
    if ((cache.interaction ?? cache.msg).member.voice.channel) {
    await Client.createTogetherCode((cache.interaction ?? cache.msg).member.voice.channelId, data.together).then(invite => {
      this.storeValue(invite.code, storage, varName, cache);
    }).catch(er => {
      console.log(er);
      this.storeValue('together', storage, 'error', cache);
    })
  } else {
    this.storeValue('voice', storage, 'error', cache);
  }
  this.callNextAction(cache);
},

  mod() {},
};