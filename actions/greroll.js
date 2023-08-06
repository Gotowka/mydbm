module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Giveaway REROLL",

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

  subtitle(data, presets) {
    return `Reroll the new winner!`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    let dataType = "Winner Id";
    return ['error', '<Notfound, None>', data.varName, dataType];
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

  meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/greroll.js' },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["msgid", "storage", "varName"],

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
    </div>
    <div style="float: left; width: calc(50% - 12px);">
      <br>
      <span class="dbminputlabel">Message ID</span>
      <input id="msgid" class="round" type="text">
    </div>
    <div style="float: left; width: calc(85% - 12px);">
    <br>
    <store-in-variable dropdownLabel="Store Winner ID In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
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
    console.log('ACTION: greroll; [v1.1] (v2.1.8)');
    const { interaction, msg } = cache;
    const giveaways = require('../data/giveaways.json');
    const data = cache.actions[cache.index];
    const givid = this.evalMessage(data.msgid, cache);
    const mess = (interaction ?? msg);
    if (!giveaways[mess.guild.id]) {
      this.storeValue('notfound', 1, 'error', cache);
      this.callNextAction(cache);
      return;
    };
    const giveaway = giveaways[mess.guild.id].find(a => a.msg === givid);
    if (!giveaway) {
      this.storeValue('notfound', 1, 'error', cache);
      this.callNextAction(cache);
      return;
    };
    const winner = giveaway.members[Math.floor(Math.random() * giveaway.members.length)];
    this.storeValue('none', parseInt(data.storage, 10), 'error', cache);
    this.storeValue(winner, parseInt(data.storage, 10), data.varName, cache);
    this.callNextAction(cache);

  },
  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() {},
};
