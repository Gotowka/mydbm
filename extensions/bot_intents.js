//---------------------------------------------------------------------
// Defining global array of intents so they are not repeated later on.
//---------------------------------------------------------------------
const INTENTS = [
  "1",
  "2",
  "4",
  "8",
  "16",
  "32",
  "64",
  "128",
  "256",
  "512",
  "1024",
  "2048",
  "4096",
  "8192",
  "16384",
  "32768",
  "1048576",
  "2097152"
];

module.exports = {
  //---------------------------------------------------------------------
  // Editor Extension Name
  //
  // This is the name of the editor extension displayed in the editor.
  //---------------------------------------------------------------------

  name: "Bot Intents",

  //---------------------------------------------------------------------
  // Is Command Extension
  //
  // Must be true to appear in "command" context menu.
  // This means each "command" will hold its own copy of this data.
  //---------------------------------------------------------------------

  //isCommandExtension: true,

  //---------------------------------------------------------------------
  // Is Event Extension
  //
  // Must be true to appear in "event" context menu.
  // This means each "event" will hold its own copy of this data.
  //---------------------------------------------------------------------

  //isEventExtension: true,

  //---------------------------------------------------------------------
  // Is Editor Extension
  //
  // Must be true to appear in the main editor context menu.
  // This means there will only be one copy of this data per project.
  //---------------------------------------------------------------------

  isEditorExtension: true,

  //---------------------------------------------------------------------
  // Save Button Text
  //
  // Customizes the text of the "Save Extension" at the bottom
  // of the extension window.
  //---------------------------------------------------------------------

  saveButtonText: "Save Intents",

  //---------------------------------------------------------------------
  // Extension Fields
  //
  // These are the fields for the extension. These fields are customized
  // by creating elements with corresponding Ids in the HTML. These
  // are also the names of the fields stored in the command's/event's JSON data.
  //---------------------------------------------------------------------

  fields: [],

  //---------------------------------------------------------------------
  // Default Fields
  //
  // The default values of the fields.
  //---------------------------------------------------------------------

  defaultFields: {
    intents: -2,
  },

  //---------------------------------------------------------------------
  // Extension Dialog Size
  //
  // Returns the size of the extension dialog.
  //---------------------------------------------------------------------

  size: function () {
    return { width: 340, height: 610 };
  },

  //---------------------------------------------------------------------
  // Extension HTML
  //
  // This function returns a string containing the HTML used for
  // the context menu dialog.
  //---------------------------------------------------------------------

  html: function (data) {
    if (data.intents === null || data.intents === undefined) {
      data.intents = -2;
    }
    let intents = data.intents >= 0 ? data.intents : 0;
    if (data.intents === -1) {
      intents = 32767;
    } else if (data.intents === -2) {
      intents = 32509;
    }
    return `
		<div style="padding: 10px 10px 10px 10px;">
			<input type="radio" id="All" name="RatioButton" value="All" ${data.intents === -1 ? "checked" : ""}>
			<label for="All">All Intents ***</label><br>

			<input type="radio" id="NonPrivileged" name="RatioButton" value="NonPrivileged" ${data.intents === -2 ? "checked" : ""}>
			<label for="NonPrivileged">Non-Privileged</label><br>

			<input type="radio" id="Custom" name="RatioButton" value="Custom" ${data.intents >= 0 ? "checked" : ""}>
			<label for="Custom">Custom</label><br>

      <br>

			<hr>

      <br>

			<input type="checkbox" id="1" name="GUILDS" value="1" ${intents & (1 << 0) ? "checked" : ""}>
			<label for="1">Server Events</label><br>

			<input type="checkbox" id="2" name="GUILD_MEMBERS" value="2" ${
        intents & (1 << 1) ? "checked" : ""
      }>
			<label for="GUILD_MEMBERS">Server Member Events ***</label><br>

			<input type="checkbox" id="4" name="GUILD_BANS" value="4" ${intents & (1 << 2) ? "checked" : ""}>
			<label for="4">Server Ban Events</label><br>

			<input type="checkbox" id="8" name="GUILD_EMOJIS_AND_STICKERS" value="8" ${
        intents & (1 << 3) ? "checked" : ""
      }>
			<label for="8">Server Emoji and Stickers Events</label><br>

			<input type="checkbox" id="16" name="GUILD_INTEGRATIONS" value="16" ${
        intents & (1 << 4) ? "checked" : ""
      }>
			<label for="16">Server Integration Events</label><br>

			<input type="checkbox" id="32" name="GUILD_WEBHOOKS" value="32" ${
        intents & (1 << 5) ? "checked" : ""
      }>
			<label for="32">Server Webhook Events</label><br>

			<input type="checkbox" id="64" name="GUILD_INVITES" value="64" ${
        intents & (1 << 6) ? "checked" : ""
      }>
			<label for="64">Server Invite Events</label><br>

			<input type="checkbox" id="128" name="GUILD_VOICE_STATES" value="128" ${
        intents & (1 << 7) ? "checked" : ""
      }>
			<label for="128">Server Voice Events</label><br>

			<input type="checkbox" id="256" name="GUILD_PRESENCES" value="256" ${
        intents & (1 << 8) ? "checked" : ""
      }>
			<label for="256">Server Presence Events ***</label><br>

			<input type="checkbox" id="512" name="GUILD_MESSAGES" value="512" ${
        intents & (1 << 9) ? "checked" : ""
      }>
			<label for="512">Server Message Events</label><br>

			<input type="checkbox" id="1024" name="GUILD_MESSAGE_REACTIONS" value="1024" ${
        intents & (1 << 10) ? "checked" : ""
      }>
			<label for="1024">Server Message Events</label><br>

			<input type="checkbox" id="2048" name="GUILD_MESSAGE_TYPING" value="2048" ${
        intents & (1 << 11) ? "checked" : ""
      }>
			<label for="2048">Server Typing Events</label><br>

			<input type="checkbox" id="4096" name="DIRECT_MESSAGES" value="4096" ${
        intents & (1 << 12) ? "checked" : ""
      }>
			<label for="4096">Direct Message Events</label><br>

			<input type="checkbox" id="8192" name="DIRECT_MESSAGE_REACTIONS" value="8192" ${
        intents & (1 << 13) ? "checked" : ""
      }>
			<label for="8192">DM Reaction Events</label><br>

			<input type="checkbox" id="16384" name="DIRECT_MESSAGE_TYPING" value="16384" ${
        intents & (1 << 14) ? "checked" : ""
      }>
			<label for="16384">DM Typing Events</label><br>

      <input type="checkbox" id="32768" name="MESSAGE_CONTENT" value="32768" ${
        intents & (1 << 15) ? "checked" : ""
      }>
      <label for="32768">Message Content ***</label><br>

      <input type="checkbox" id="1048576" name="AUTOMOD_CONFIGURATION" value="1048576" ${
        intents & (1 << 20) ? "checked" : ""
      }>
      <label for="1048576">Automod Configuration</label><br>

      <input type="checkbox" id="2097152" name="AUTOMOD_EXECUTION" value="2097152" ${
        intents & (1 << 21) ? "checked" : ""
      }>
      <label for="2097152">Automod Execution</label><br>

      <br>

			<hr>

      <br>

			<label>*** These require your bot to have them enabled in the developer portal. Furthermore, they can only be enabled if your bot is in less than 100 servers or is whitelisted. If you enable them without turning them on in the portal, your bot will crash!</label>
		</div>`;
  },

  //---------------------------------------------------------------------
  // Extension Dialog Init Code
  //
  // When the HTML is first applied to the extension dialog, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init: function (document, globalObject) {
    const PRIVILEGED = ["256", "2", "32768"];
    function EnableAll(enable) {
      for (let i = 0; i < INTENTS.length; i++) {
        const val = document.getElementById(INTENTS[i]);
        val.disabled = !enable;
      }
    }
    document.getElementById("All").onclick = function () {
      EnableAll(false);
      for (let i = 0; i < INTENTS.length; i++) {
        const val = document.getElementById(INTENTS[i]);
        val.checked = true;
      }
    };
    document.getElementById("NonPrivileged").onclick = function () {
      EnableAll(false);
      for (let i = 0; i < INTENTS.length; i++) {
        const val = document.getElementById(INTENTS[i]);
        val.checked = PRIVILEGED.indexOf(INTENTS[i]) === -1;
      }
    };
    document.getElementById("Custom").onclick = function () {
      EnableAll(true);
    };
    if (document.getElementById("All").checked) {
      document.getElementById("All").onclick();
    }
    if (document.getElementById("NonPrivileged").checked) {
      document.getElementById("NonPrivileged").onclick();
    }
    if (document.getElementById("Custom").checked) {
      document.getElementById("Custom").onclick();
    }
  },

  //---------------------------------------------------------------------
  // Extension Dialog Close Code
  //
  // When the dialog is closed, this is called. Use it to save the data.
  //---------------------------------------------------------------------

  close: function (document, data, globalObject) {
    let result = 0;
    if (document.getElementById("All").checked) {
      result = -1;
    } else if (document.getElementById("NonPrivileged").checked) {
      result = -2;
    } else {
      for (let i = 0; i < INTENTS.length; i++) {
        const val = document.getElementById(INTENTS[i]).checked;
        if (val) result |= 1 << i;
      }
    }
    data.intents = result;
  },

  //---------------------------------------------------------------------
  // Editor Extension Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //
  // This is absolutely necessary for editor extensions since it
  // allows us to setup modifications for the necessary functions
  // we want to change.
  //
  // The client object can be retrieved from: `const bot = DBM.Bot.bot;`
  // Classes can be retrieved also using it: `const { Actions, Event } = DBM;`
  //---------------------------------------------------------------------

  mod: function (DBM) {
    DBM.Bot.intents = function () {
      const intentData = DBM.Files?.data.settings?.["Bot Intents"];
      const intents = intentData?.customData?.["Bot Intents"]?.intents;
      if (!intentData || typeof intents === "undefined") return DBM.Bot.NON_PRIVILEGED_INTENTS;
      if (intents === -1) {
        return DBM.Bot.ALL_INTENTS;
      } else if (intents === -2) {
        return DBM.Bot.NON_PRIVILEGED_INTENTS;
      } else {
        return intents;
      }
    };
  },
};
