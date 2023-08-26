module.exports = {
	//---------------------------------------------------------------------
	// Action Name
	//
	// This is the name of the action displayed in the editor.
	//---------------------------------------------------------------------
  
	name: "Loop",
  
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
				hm = 'OFF'
				break;
			case 1:
				hm = 'Track'
				break;
            case 2:
                hm  = 'Queue'
                break;
			default:
				break;
		}
	  return `Loop: ${hm}`;
	},
  
    variableStorage(data, varType) {
		if (varType !== 1) return;
		let dataType = "<Queue>";
		return ['error', dataType];
	},
  
	meta: { version: "3.2.3", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/loop.js' },
  
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
		  Help: https://discord.gg/apUVFy7SUh
		  Variables: error('queue')
	  </p>
  </div><br>
  <div>
	  <span class="dbminputlabel">Loop</span><br>
	  <select id="type" class="round">
			<option value="0">Off</option>
			<option value="1">Track</option>
            <option value="2">Queue</option>
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
	  console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mloop; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.3\x1b[30m)\x1b[0m')
	  const data = cache.actions[cache.index];
	  const source = parseInt(data.type)
	  const player = this.getPlayer()
	  if (!player) return console.warn('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[36m Use action \x1b[33mconnect_music_player\x1b[36m, https://github.com/Gotowka/mydbm/blob/v3/actions/connect_music_player.js')
	  const queue = player.queues.cache.get((cache.interaction ?? cache.msg).guild.id)
	  if (!queue) {
		this.storeValue('queue', 1, 'error', cache)
		this.callNextAction(cache);
		return;
	  }
      await queue.setRepeatMode(source)
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