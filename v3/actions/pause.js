module.exports = {
	//---------------------------------------------------------------------
	// Action Name
	//
	// This is the name of the action displayed in the editor.
	//---------------------------------------------------------------------
  
	name: "Pause",
  
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
		const type = parseInt(data.type)
		let hm
		switch(type) {
			case 0:
				hm = 'UnPaused'
				break;
			case 1:
				hm = 'Paused'
				break;
			default:
				break;
		}
	  return `The music are ${hm}`;
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
  
	meta: { version: "3.0.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/v3/actions/qause.js' },
  
	//---------------------------------------------------------------------
	// Action Fields
	//
	// These are the fields for the action. These fields are customized
	// by creating elements with corresponding IDs in the HTML. These
	// are also the names of the fields stored in the action's JSON data.
	//---------------------------------------------------------------------
  
	fields: ["type"],
  
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
		  Help: https://discord.gg/apUVFy7SUh<br>
		  Variables:(var error is required to use)<br>
		  <span id="variables" class="dbminputlabel">error('dontplay')</span>
	  </p>
  </div><br>
  <div>
	  <span class="dbminputlabel">Paused</span><br>
	  <select id="type" class="round">
			<option value="0">False</option>
			<option value="1">True</option>
	  </select>
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
	  const { musicPlayer, djsV } = require('../bot')
	  const { interaction, msg } = cache
	  const { version } = require("discord-player");
	  if (!musicPlayer) return console.error('Update the bot.js, https://github.com/Gotowka/mydbm/blob/main/v14/bot.js');
	  if (!djsV) return console.error('Update the bot.js, https://github.com/Gotowka/mydbm/blob/main/v14/bot.js');
	  if (version !== '6.0.0') return console.error('Change version module, npm i discord-player@6.0.0');
	  const queue = musicPlayer.queues.cache.get((interaction ?? msg).guild.id)

	  if (!queue) {
		this.storeValue('dontplay', 1, 'error', cache)
		this.callNextAction(cache);
		return;
	  }
			  
	  switch(source) {
		case 0:
			await queue.node.setPaused(false)
			break;
		case 1:
			await queue.node.setPaused(true)
			break;
		default:
			break;
	  }
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