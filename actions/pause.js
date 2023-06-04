module.exports = {
  
	name: "Pause",
  
	section: "Audio Control",
  
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
  
	meta: { version: "3.2.0", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/pause.js' },
  
	fields: ["type"],
  
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
  
	init() {},
  
	async action(cache) {
	  console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mpause; \x1b[30m[\x1b[32mv1.1\x1b[30m] \x1b[30m(\x1b[36mv3.2.0\x1b[30m)')
	  const data = cache.actions[cache.index];
	  const source = parseInt(data.type)
	  const { musicPlayer } = require('../bot')
	  const { interaction, msg } = cache
	  const { version } = require("discord-player");
	  if (!musicPlayer) return console.error('Update the bot.js, https://github.com/Gotowka/mydbm/blob/v3/bot.js');
	  if (version !== '6.0.0') console.warn('Change version module, npm i discord-player@6.0.0');
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

	mod() {},
  };