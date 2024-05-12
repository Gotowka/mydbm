module.exports = {
  
	name: "Volume",
  
	section: "Audio Control",
  
	subtitle(data, presets) {
	  return `Changing the volume`;
	},
  
	meta: { version: "3.2.4", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/volume.js' },
  
	fields: ["volume"],
  
	html(isEvent, data) {
	  return `
	  <div>
	  <p>
		  <u>Mod Info:</u><br>
		  Created by money#6283<br>
		  Help: https://discord.gg/apUVFy7SUh
	  </p>
  </div><br>
  <div>
    <span class="dbminputlabel">Volume</span>
    <input id="volume" class="round" type="text">
  </div>`;
	},
  
	init() {},
  
	async action(cache) {
	  console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mvolume; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.4\x1b[30m)\x1b[0m');
	  const data = cache.actions[cache.index];
	  const vol = parseInt(this.evalMessage(data.volume, cache));
	  const player = this.getPlayer();
	  if (!player) return console.warn('\x1b[30m[\x1b[31mERROR\x1b[30m]\x1b[36m Use action \x1b[33mconnect_music_player\x1b[36m, https://github.com/Gotowka/mydbm/blob/v3/actions/connect_music_player.js');
	  const queue = player.queues.cache.get((cache.interaction ?? cache.msg).guild.id);
	  if (!queue) {
		this.storeValue('queue', 1, 'error', cache);
		this.callNextAction(cache);
		return;
	  };
      await queue.node.setVolume(vol)
	  this.callNextAction(cache);
	},
  
	mod() {},
};