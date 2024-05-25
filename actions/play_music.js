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
    fields: ['query', 'call', 'callS', 'storage', 'varName'],
  
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

  <div style="float: left; width: calc(50% - 12px);">
    <span class="dbminputlabel">Jump To Action (Added to queue)</span>
    <input id="call" class="round" type="number">
    <br>
    <span class="dbminputlabel">Jump To Action (Next song playing)</span>
    <input id="callS" class="round" type="number">
  </div>
  <br><br><br>
  <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
  <br><br><br>
  
  <p>
    <u><b><span style="color: white;">NOTE:</span></b></u><br>
    required modules, npm i @discordjs/voice @discordjs/opus libsodium-wrappers ffmpeg-static ytdl-core
  </p>
  `;
    },
  
    init() {},
  
    async action(cache) {
      console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mplay_music; \x1b[30m[\x1b[32mv1.1\x1b[30m] \x1b[30m(\x1b[36mv2.1.8\x1b[30m)\x1b[0m')
      const data = cache.actions[cache.index];
      const voice = this.getDBM().Audio.voice;
      const ytdl = this.getDBM().Audio.ytdl;
      const voiceChannel = (cache.msg ?? cache.interaction).member.voice.channel;
      const dQ = this.getDBM().Audio.map;
      const query = this.evalMessage(data.query, cache);
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);

      const connection = voice.joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      const songInfo = (await ytdl.getInfo(query)).videoDetails;

      const serverQ = dQ.get((cache.msg ?? cache.interaction).guild.id);
      if (!serverQ) {
        const queue = {
          voiceChannel,
          connection,
          player: voice.createAudioPlayer(),
          songs: [],
          volume: 0.5,
          resource: null
        };
    
        dQ.set((cache.msg ?? cache.interaction).guild.id, queue);
        queue.songs.push(songInfo);
        connection.subscribe(queue.player);
        this.getDBM().Audio.playSong((cache.msg ?? cache.interaction).guild, queue.songs[0])
    
        queue.player.on(voice.AudioPlayerStatus.Idle, () => {
          queue.songs.shift();
          if (queue.songs.length > 0) {
            this.getDBM().Audio.playSong((cache.msg ?? cache.interaction).guild, queue.songs[0])
            const val = parseInt(data.callS, 10);
            const index = Math.max(val - 1, 0);
            if (cache.actions[index]) {
              cache.index = index - 1;
              this.storeValue(queue.songs[0], storage, varName, cache);
              this.callNextAction(cache);
            }
          } else {
            queue.connection.disconnect();
            dQ.delete((cache.msg ?? cache.interaction).guild.id);
          }
        });
  
        this.storeValue(songInfo, storage, varName, cache);
        this.callNextAction(cache);
      } else {
        serverQ.songs.push(songInfo);
        const val = parseInt(data.call, 10);
        const index = Math.max(val - 1, 0);
        if (cache.actions[index]) {
          cache.index = index - 1;
          this.storeValue(songInfo, storage, varName, cache);
          this.callNextAction(cache);
        }
      }
    },
  
    mod() {},
};