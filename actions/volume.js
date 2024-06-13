module.exports = {
  
	name: "Volume",
  
	section: "Audio Control",
  
	subtitle(data, presets) {
	  return `Changing the volume`;
	},
  
	meta: { version: "2.1.9", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka/mydbm/tree/v2', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/volume.js' },
  
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
  <div style="float: left; width: calc(50% - 12px);">
    <span class="dbminputlabel">Volume</span>
    <input id="volume" class="round" type="text">
  </div>`;
	},
  
	init() {},
  
	async action(cache) {
	  console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mvolume; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m');
	  const data = cache.actions[cache.index];
	  const vol = parseInt(this.evalMessage(data.volume, cache)) / 100;
	  const queue = this.getDBM().Audio.map.get((cache.msg ?? cache.interaction).guild.id);
	  if (!queue) {
		this.storeValue('queue', 1, 'error', cache);
		this.callNextAction(cache);
		return;
	  };
      queue.volume = vol;
      await queue.resource.volume.setVolume(vol);
	  this.callNextAction(cache);
	},
  
	mod() {},
};