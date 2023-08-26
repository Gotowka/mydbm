module.exports = {
  
  name: "Music Player Connect",

  section: "Audio Control",

  subtitle(data, presets) {
    let list = 0
    if (data.youtube) list = list + 1
    if (data.spotify) list = list + 1
    if (data.soundcloud) list = list + 1
    if (data.applemusic) list = list + 1
    if (data.vimeo) list = list + 1
    if (data.reverbnation) list = list + 1
    return `Connecting Music Player with ${list}/6 extractors!`;
  },

  meta: { version: "3.2.3", preciseCheck: false, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/connect_music_player.js' },

  fields: ["youtube", "spotify", "soundcloud", "applemusic", "vimeo", "reverbnation"],

  html(isEvent, data) {
    return `
    <div>
      <p>
        <u>Mod Info:</u><br>
        Created by money#6283<br>
        Help: https://discord.gg/apUVFy7SUh
      </p>
    </div>
    <br>
    <div style="display: left;">

      <dbm-checkbox id="youtube" label="Youtube" checked></dbm-checkbox>
      <br>
      <dbm-checkbox id="spotify" label="Spotify" checked></dbm-checkbox>
      <br>
      <dbm-checkbox id="soundcloud" label="SoundCloud"></dbm-checkbox>
      <br>
      <dbm-checkbox id="applemusic" label="AppleMusic"></dbm-checkbox>
      <br>
      <dbm-checkbox id="vimeo" label="Vimeo"></dbm-checkbox>
      <br>
      <dbm-checkbox id="reverbnation" label="Reverbnation"></dbm-checkbox>
    </div>
    `;
  },

  init() {}, 

  async action(cache) {
    console.log('\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33mconnect_music_player; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv3.2.3\x1b[30m)\x1b[0m')
    const { SpotifyExtractor, SoundCloudExtractor, YoutubeExtractor, AppleMusicExtractor, VimeoExtractor, ReverbnationExtractor } = require('@discord-player/extractor')
    const data = cache.actions[cache.index]
    const player = this.playerConnect()

    if (data.youtube && data.spotify && data.soundcloud && data.applemusic && data.vimeo && data.reverbnation) {
      await player.extractors.loadDefault()
      return this.callNextAction(cache);
    };
    
    if (data.youtube) await player.extractors.register(YoutubeExtractor, {})
    if (data.spotify) await player.extractors.register(SpotifyExtractor, {})
    if (data.soundcloud) await player.extractors.register(SoundCloudExtractor, {})
    if (data.applemusic) await player.extractors.register(AppleMusicExtractor, {})
    if (data.vimeo) await player.extractors.register(VimeoExtractor, {})
    if (data.reverbnation) await player.extractors.register(ReverbnationExtractor, {})

    this.callNextAction(cache)
  },

  mod() {},
};