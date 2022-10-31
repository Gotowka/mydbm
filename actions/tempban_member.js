module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Tempban Member",
  
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------
  
    section: "Member Control",
  
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
  
    subtitle(data, presets) {
      return `${presets.getMemberText(data.member, data.varName)}`;
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
  
    meta: { version: "2.1.6", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka/dbmmody/blob/main/beta/tempban_member.js', downloadUrl: 'https://github.com/Gotowka/dbmmody/blob/main/beta/tempban_member.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["title", "description", "color", "reason", "time", "member", "varName"],
  
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
          Zmienne: endtime
      </p>
  </div><br>
  <div style="float: left; width: calc(50% - 12px);">
  <span class="dbminputlabel">Title <span style="color:red">*</span></span>
  <input id="title" class="round" type="text">
  
  <br>
  
  <span class="dbminputlabel">Description</span>
  <textarea id="description" class="dbm_monospace" rows="4" placeholder="Wszystkie dostępne skróty masz dostępne w Mod Info" white-space: nowrap; resize: none;"></textarea>
  
  <br>
  
  <span class="dbminputlabel">Color</span>
  <input id="color" class="round" type="text">
  </div>
  <div style="float: right; width: calc(50% - 12px);">
  
  <br>
  <span class="dbminputlabel">Reason</span><br>
  <textarea id="reason" class="dbm_monospace" rows="3" placeholder="Insert reason here..." style="white-space: nowrap; resize: none;"></textarea>
  
  <br>
  
  <span class="dbminputlabel">Time <span style="color:red">*</span></span>
  <input id="time" class="round" type="text">
  
  <br>
  
  <member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
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
      const { MessageEmbed } = require('discord.js')
      const data = cache.actions[cache.index];
      const { interaction } = cache
      const member = await this.getMemberFromData(data.member, data.varName, cache);
      const title = this.evalMessage(data.title, cache)
      const description = this.evalMessage(data.description, cache)
      const color = this.evalMessage(data.color, cache) || 'RANDOM'
  
      let duration = this.evalMessage(data.time, cache)

      if (duration.includes("s")) {
          duration = duration.split("s")[0] * 1000;
      } else if (duration.includes("m")) {
          duration = duration.split("m")[0] * 60000;
      } else if (duration.includes("h")) {
          duration = duration.split("h")[0] * 3600000;
      } else if (duration.includes("d")) {
          duration = duration.split("d")[0] * 86400000;
      } else {
          duration = duration * 1000;
      };
  
      const endban = Date.parse(new Date(new Date().getTime() + duration)) / 1000;
      const endtime = `<t:${endban}:R>`
      this.storeValue(endtime, 1, 'endtime', cache)
      const days = '0'
      await member.createDM()
      const embed = new MessageEmbed()
      .setTitle(title)
      .setColor(color)
      if (description) embed.setDescription(description)
      member.send({ embeds: [embed] })
      await member.ban({ days, reason })
      .then(() => {
        interaction.reply({ content: 'Zbanowano!', ephemeral: true })
        setTimeout(() => {
            interaction.guild.bans.remove(member.id, reason)
            this.callNextAction(cache)
        }, dur);
      })
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
  