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
  
	variableStorage(data, varType) {
		if (varType !== 1) return;
		let dataType = "Error ('queue')";
		return ['error', dataType];
	},

	fields: ["type"],
  
	html(isEvent, data) {
	  return `
	  <div>
	  <p>
		  <u>Mod Info:</u><br>
		  Created by money#6283<br>
		  Help: https://discord.gg/apUVFy7SUh<br>
		  Variables: error('queue')
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
	  console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mpause; \x1b[30m[\x1b[32mv1.2\x1b[30m] \x1b[30m(\x1b[36mv3.2.0\x1b[30m)\x1b[0m')
	  const data = cache.actions[cache.index];
	  const player = this.getPlayer()
	  const source = parseInt(data.type)
	  if (!player) return console.warn('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[36m Use action \x1b[33mconnect_music_player\x1b[36m, https://github.com/Gotowka/mydbm/blob/v3/actions/connect_music_player.js')
	  const queue = player.queues.cache.get((cache.interaction ?? cache.msg).guild.id)

	  if (!queue) {
		this.storeValue('queue', 1, 'error', cache)
		this.callNextAction(cache);
		return;
	  }
			  
	  switch(source) {
		case 0:
			await queue.node.resume()
			break;
		case 1:
			await queue.node.pause()
			break;
		default:
			break;
	  }
	  this.callNextAction(cache);
	},

	mod() {},

};