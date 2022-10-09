module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Giveaway END",
  
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
      return `Ending the giveaway`;
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
  
    meta: { version: "2.1.6", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/actions/gend.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["style", "label", "call"],
  
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
          variables: prize, hoster, message, users, icon, name
      </p>
  </div><br><br>
  <div style="float: left; width: calc(100% - 12px);">
  <span class="dbminputlabel">Button (Style)<span style="color:red">*</span></span>
  <input id="style" class="round" placeholder="DANGER, PRIMARY, SECONDARY, SUCCESS" type="text">
<br>
<span class="dbminputlabel">Button (Label)<span style="color:red">*</span></span>
<input id="label" class="round" placeholder="[users] = Users from the giveaway" type="text">

<br>

<div id="varNameContainer" style="float: left; width: 60%;">
Jump to Action:<br>
<input id="call" class="round" type="number">
</div>
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
      const { MessageButton, MessageActionRow } = require('discord.js')
      const data = cache.actions[cache.index];
      const giveaways = require('../data/giveaways.json')
      const fs = require('fs')
      const client = this.getDBM().Bot.bot

      setInterval(() => {
        Object.keys(giveaways).forEach(giveawayid => {
            for (i = 0; i < giveaways[giveawayid].length; i++) {
                if (new Date().getTime() > giveaways[giveawayid][i].end && giveaways[giveawayid][i].ended == false) {
                    let winner = [];
    
                    if (giveaways[giveawayid][i].members.length > 0) {
                        while(winner.length < giveaways[giveawayid][i].winners && winner.length < giveaways[giveawayid][i].members.length){
                            for (o = 0; o < giveaways[giveawayid][i].winners; o++) {
                                let winnerr = giveaways[giveawayid][i].members[Math.floor(Math.random() * giveaways[giveawayid][i].members.length)]
    
                                if (!winner.includes(winnerr)) {
                                    winner.push(winnerr);
                                };
                            };
                        };
                    };
    
                    giveaways[giveawayid][i].ended = true;
                    giveaways[giveawayid][i].end = new Date().getTime();
                    
                    fs.writeFileSync("./data/giveaways.json", JSON.stringify(giveaways));
                    const messageid = giveaways[giveawayid][i].msg
                    const channelid = giveaways[giveawayid][i].channel
                    const guildid = giveaways[giveawayid][i].guild
                    const guild = client.guilds.cache.get(guildid)
                    const channel = guild.channels.cache.get(channelid)
                    const message = channel.messages.cache.get(messageid)
                    const footer = message.embeds[0].footer.text
                    const users = footer.split(' ')[2]
                    const prize = giveaways[giveawayid][i].prize
                    const hoster = giveaways[giveawayid][i].hoster
                    this.storeValue(prize, 1, 'prize', cache)
                    this.storeValue(hoster, 1, 'hoster', cache)
                    this.storeValue(message, 1, 'message', cache)
                    this.storeValue(users, 1, 'users', cache)
                    this.storeValue(guild.iconURL({ dynamic: true}), 1, 'icon', cache)
                    this.storeValue(guild.name, 1, 'name', cache)
                    this.storeValue(`<@!${winner.join(">, <@!")}>`, 1, 'winner', cache)
                    const button = new MessageActionRow().addComponents(
                        new MessageButton()
                        .setCustomId('gend')
                        .setStyle(this.evalMessage(data.style, cache))
                        .setDisabled(true)
                        .setLabel(this.evalMessage(data.label, cache).replace('[users]', users))
                    )
                    message.edit({ components: [button]})
                    const val = parseInt(this.evalMessage(data.call, cache), 10);
                    const index = Math.max(val - 1, 0);
                    if (cache.actions[index]) {
                      cache.index = index - 1;
                      this.callNextAction(cache);
                    }
                } else if (new Date().getTime() > giveaways[giveawayid][i].end + 1000 * 60 * 60 && giveaways[giveawayid][i].ended == true) {
                    giveaways[giveawayid].splice(i, 1);
                    const messageid = giveaways[giveawayid][i].msg
                    const channelid = giveaways[giveawayid][i].channel
                    const guildid = giveaways[giveawayid][i].guild
                    const guild = client.guilds.cache.get(guildid)
                    const channel = guild.channels.cache.get(channelid)
                    const message = channel.messages.cache.get(messageid)
                    const footer = message.embeds[0].footer.text
                    const users = footer.split(' ')[2]
                    const prize = giveaways[giveawayid][i].prize
                    const hoster = giveaways[giveawayid][i].hoster
                    this.storeValue(prize, 1, 'prize', cache)
                    this.storeValue(guild.iconURL({ dynamic: true}), 1, 'icon', cache)
                    this.storeValue(guild.name, 1, 'name', cache)
                    this.storeValue(hoster, 1, 'hoster', cache)
                    this.storeValue(message, 1, 'message', cache)
                    this.storeValue(users, 1, 'users', cache)
                    this.storeValue(`<@!${winner.join(">, <@!")}>`, 1, 'winner', cache)
                    const button = new MessageActionRow().addComponents(
                        new MessageButton()
                        .setCustomId('gend')
                        .setStyle(this.evalMessage(data.style, cache))
                        .setDisabled(true)
                        .setLabel(this.evalMessage(data.label, cache).replace('[users]', users))
                    )
                    message.edit({ components: [button]})
                    const val = parseInt(this.evalMessage(data.call, cache), 10);
                    const index = Math.max(val - 1, 0);
                    if (cache.actions[index]) {
                      cache.index = index - 1;
                      this.callNextAction(cache);
                    }
                    fs.writeFileSync("./data/giveaways.json", JSON.stringify(giveaways));
                };
            };
        });
    }, 1000);
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
  
