module.exports = {
    name: 'Play Music',
    section: 'Audio Control',
    meta: {
      version: '2.1.8',
      preciseCheck: false,
      author: 'Gotowka',
      authorUrl: 'https://github.com/Gotowka/mydbm/tree/v2-beta',
      downloadURL: 'https://github.com/Gotowka/mydbm/blob/v2-beta/actions/play_music.js',
    },
    fields: ['query', 'storage', 'varName'],
  
    subtitle(data) {
      return `${data.query}`;
    },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      return [data.varName, 'Song Data'];
    },
  
    html() {
      return `
  <div>
    <span class="dbminputlabel">YouTube Search</span><br>
    <input id="query" class="round" type="text" placeholder="Search for a song from youtube"><br>
  </div>
  <br>
  
  <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
  <br><br><br>
  
  <p>
    <u><b><span style="color: white;">NOTE:</span></b></u><br>
    required modules, npm i @discordjs/voice libsodium-wrappers ffmpeg-static ytdl-core
  </p>
  `;
    },
  
    init() {},
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mplay_music; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.8\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const voice = this.getDBM().Audio.voice;
      const ytdl = this.getDBM().Audio.ytdl;
      const voiceChannel = (cache.msg ?? cache.interaction).member.voice.channel;
  
      const query = this.evalMessage(data.query, cache);
      const connection = voice.joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
  
      const player = voice.createAudioPlayer();
      const stream = ytdl(query, { filter: 'audioonly', highWaterMark: 1<<25 });
      const resource = voice.createAudioResource(stream);
  
      player.play(resource);
      connection.subscribe(player);
  
      player.on(voice.AudioPlayerStatus.Idle, () => {
        connection.destroy();
      });

      const videoInfo = await ytdl.getInfo(query).videoDetails;

      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(videoInfo, storage, varName, cache);
      this.callNextAction(cache);
    },
  
    mod() {},
};