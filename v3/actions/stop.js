module.exports = {
	//---------------------------------------------------------------------
	// Action Name
	//
	// This is the name of the action displayed in the editor.
	//---------------------------------------------------------------------
  
	name: "Stop",
  
	//---------------------------------------------------------------------
	// Action Section
	//
	// This is the section the action will fall into.
	//---------------------------------------------------------------------
  
	section: "Audio Control",
  
	//---------------------------------------------------------------------
	// Action Subtitle
	//
	// This function generates the subtitle displayed next to the name.
	//---------------------------------------------------------------------
  
	subtitle(data, presets) {
	  return `Stop music playing!`;
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
  
	meta: { version: "3.1.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/v3/actions/stop.js' },
  
	//---------------------------------------------------------------------
	// Action Fields
	//
	// These are the fields for the action. These fields are customized
	// by creating elements with corresponding IDs in the HTML. These
	// are also the names of the fields stored in the action's JSON data.
	//---------------------------------------------------------------------
  
	fields: [],
  
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
  </div>`;
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
	  const data = cache.actions[cache.index];
	  const source = parseInt(data.type)
      const { interaction, msg } = cache
      const { musicPlayer } = require('../bot')
      const { version } = require("discord-player");
	  if (!musicPlayer) console.error('Update the bot.js, https://github.com/Gotowka/mydbm/blob/main/v14/bot.js')
      if (version !== '6.0.0') console.error('Change version module, npm i discord-player@6.0.0')
	  const queue = musicPlayer.queues.cache.get((interaction ?? msg).guild?.id)
	  if (!queue) return (interaction ?? msg).reply("Error: I can\'t found the queue");
      await (msg ?? interaction).guild?.members?.me?.voice?.disconnect()
      queue.delete()
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