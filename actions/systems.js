module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Systems",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Discord",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    let system
    if (data.slevel == true) system = 'levelCard'
    if (data.sjoin == true) system = 'joinCard'
    if (data.stvpis == true) system = 'tvpisCard'
    if (data.sleave == true) system = 'leaveCard'
    if (data.scalculator == true) system = 'Calculator'
    return `The currently system running is: ${system}`;
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

  meta: { version: "2.1.6", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/main/actions/systems.js' },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["levelcard", "text", "style", "joincard", "leavecard", "embeds", "slevel", "sjoin", "stvpis", "sleave", "scalculator", "language", "msgsend", "guild"],

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
      Created by money#6283
      <br>Modules = discord-systems / simply-djs
      <br>Help = discord.gg/ae8hgMDxDc
    </p>
  </div>

<tab-system style="margin-top: 20px;">


<tab label="Level" icon="align left">
  <dialog-list id="levelcard" fields='["exp", "maxexp", "level", "rank", "texth", "borderh", "background", "barh", "avatarborderh", "barbackgroundh", "member", "name"]' dialogTitle="Level System" dialogWidth="540" dialogHeight="460" listLabel="Level Settings" listStyle="height: calc(100vh - 350px);" itemName="levelss" itemTextFunction="data.name + ' - Setting'" itemCols="1" itemHeight="30px;" itemStyle="text-align: left; line-height: 30px;">

    <tab-system>

      <tab label="Numbers" icon="certificate">
      <div style="float: left; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">Exp</span>
      <input id="exp" class="round" type="text">
  
      <br>
  
      <span class="dbminputlabel">MaxExp</span>
      <input id="maxexp" class="round" type="text">
      </div>
  
      <div style="float: right; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">Level</span>
      <input id="level" class="round" type="text">
  
      <br>
  
      <span class="dbminputlabel">Rank</span>
      <input id="rank" class="round" type="text">
      </div>
      </tab>

      <tab label="Visualization" icon="list">
      <div style="float: left; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">Text (HEX)</span>
      <input id="texth" class="round" type="text">
  
      <br>
  
      <span class="dbminputlabel">Border (HEX)</span>
      <input id="borderh" class="round" type="text">

      <br>

      <span class="dbminputlabel">Background (IMGURURL)</span>
      <input id="background" class="round" type="text">
      </div>
  
      <div style="float: right; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">Bar (HEX)</span>
      <input id="barh" class="round" type="text">
  
      <br>
  
      <span class="dbminputlabel">AvatarBorder (HEX)</span>
      <input id="avatarborderh" class="round" type="text">

      <br>

      <span class="dbminputlabel">BarBackground (HEX)</span>
      <input id="barbackgroundh" class="round" type="text">
      </div>
      </tab>

      <tab label="Options" icon="user circle">
      <div style="float: left; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">Member (ID)</span>
      <input id="member" class="round" type="text">
      </div>
      <div style="float: right; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">Name (SETTING)</span>
      <input id="name" class="round" type="text">
      </div>
      </tab>

    </tab-system>

</dialog-list>
</tab>


  <tab label="Tvpis" icon="book image">
    <div style="float: left; width: calc(50% - 12px); padding: 8px;">
    <span class="dbminputlabel">Text</span>
    <input id="text" class="round" type="text">
  </div>
  <div style="float: right; width: calc(50% - 12px); padding: 8px;">
  <span class="dbminputlabel">Style</span><br>
  <select id="style" class="round">
        <option value="0">1</option>
        <option value="1">2</option>
  </select>
</div>
  </tab>

  <tab label="Join" icon="plane">
  <dialog-list id="joincard" fields='["text1", "text2", "text3", "texth", "background", "channelid", "captcha", "name", "memberid", "role"]' dialogTitle="Join System" dialogWidth="540" dialogHeight="460" listLabel="Join Settings" listStyle="height: calc(100vh - 350px);" itemName="joinn" itemTextFunction="data.name + ' - Setting'" itemCols="1" itemHeight="30px;" itemStyle="text-align: left; line-height: 30px;">

    <tab-system>

      <tab label="Texts" icon="book image">
      <div style="float: left; width: calc(60% - 13px); padding: 8px;">
      <span class="dbminputlabel">Text (1)</span><br>
      <input id="text1" class="round" type="text">

      <br>

      <span class="dbminputlabel">Text (2)</span><br>
      <input id="text2" class="round" type="text">

      <br>

      <span class="dbminputlabel">Text (3)</span><br>
      <input id="text3" class="round" type="text">
    </div>
    </tab>

    <tab label="Visualization" icon="list">
      <div style="float: left; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">Text (HEX)</span><br>
      <input id="texth" class="round" type="text">
      </div>
  
      <div style="float: right; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">Background (IMGURURL)</span><br>
      <input id="background" class="round" type="text">
      </div>
    </tab>

    <tab label="Options" icon="user circle">
      <div style="float: left; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">Channel (ID)</span><br>
      <input id="channelid" class="round" type="text">

      <br>
      <span class="dbminputlabel">Captcha</span><br>
      <select id="captcha" class="round">
            <option value="0">false</option>
            <option value="1">true</option>
      </select>

      <br>

      <span class="dbminputlabel">Name (SETTING)</span><br>
      <input id="name" class="round" type="text">
      </div>
      <div style="float: right; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">Member (ID)</span><br>
      <input id="memberid" class="round" type="text">

      <br>

      <span class="dbminputlabel">Role Add</span><br>
      <input id="role" class="round" placeholder="Only for captcha true" type="text">
      </div>
      </tab>

    </tab-system>

</dialog-list>
</tab>

<tab label="Leave" icon="plane">
<dialog-list id="leavecard" fields='["text1", "text2", "text3", "texth", "background", "channelid", "name", "memberid"]' dialogTitle="Leave System" dialogWidth="540" dialogHeight="460" listLabel="Leave Settings" listStyle="height: calc(100vh - 350px);" itemName="leavee" itemTextFunction="data.name + ' - Setting'" itemCols="1" itemHeight="30px;" itemStyle="text-align: left; line-height: 30px;">

<tab-system>

  <tab label="Texts" icon="book image">
  <div style="float: left; width: calc(60% - 13px); padding: 8px;">
  <span class="dbminputlabel">Text (1)</span><br>
  <input id="text1" class="round" type="text">

  <br>

  <span class="dbminputlabel">Text (2)</span><br>
  <input id="text2" class="round" type="text">

  <br>

  <span class="dbminputlabel">Text (3)</span><br>
  <input id="text3" class="round" type="text">
</div>
</tab>

<tab label="Visualization" icon="list">
  <div style="float: left; width: calc(50% - 12px); padding: 8px;">
  <span class="dbminputlabel">Text (HEX)</span><br>
  <input id="texth" class="round" type="text">
  </div>

  <div style="float: right; width: calc(50% - 12px); padding: 8px;">
  <span class="dbminputlabel">Background (IMGURURL)</span><br>
  <input id="background" class="round" type="text">
  </div>
</tab>

<tab label="Options" icon="user circle">
  <div style="float: left; width: calc(50% - 12px); padding: 8px;">
  <span class="dbminputlabel">Channel (ID)</span><br>
  <input id="channelid" class="round" type="text">

  <br>

  <span class="dbminputlabel">Name (SETTING)</span><br>
  <input id="name" class="round" type="text">
  </div>
  <div style="float: right; width: calc(50% - 12px); padding: 8px;">
  <span class="dbminputlabel">Member (ID)</span><br>
  <input id="memberid" class="round" type="text">
  </div>
  </tab>

</tab-system>

</dialog-list>
</tab>

<tab label="Calculator" icon="book image">
<div style="padding: 8px;">

<dialog-list id="embeds" fields='["title", "color", "timestamp", "footertext", "footericon"]' dialogTitle="Embed Info" dialogWidth="540" dialogHeight="460" listLabel="Embeds" listStyle="height: calc(100vh - 350px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="data.title + ' - ' + 'Calculator'" itemStyle="text-align: left; line-height: 30px;">
  <div style="padding: 16px 16px 0px 16px;">

    <tab-system>

      <tab label="General" icon="certificate">
        <div style="padding: 8px">
          <div style="float: left; width: calc(50% - 12px);">
            <span class="dbminputlabel">Title</span><br>
            <input id="title" class="round" type="text">

            <br>

            <span class="dbminputlabel">Color</span><br>
            <input id="color" class="round" type="text" placeholder="Leave blank for default...">
          </div>

          <div style="float: right; width: calc(50% - 12px);">
            <span class="dbminputlabel">Use Timestamp</span><br>
            <select id="timestamp" class="round">
              <option value="true">Yes</option>
              <option value="false" selected>No</option>
            </select>
          </div>

          <br><br><br><br><br><br><br>

          <hr class="subtlebar">
        </div>
      </tab>

      <tab label="Footer" icon="map outline">
        <div style="padding: 8px;">
          <span class="dbminputlabel">Footer Icon URL</span><br>
          <input id="footericon" class="round" type="text" placeholder="Leave blank for none...">

          <br>

          <span class="dbminputlabel">Footer Text</span><br>
          <textarea id="footertext" class="dbm_monospace" rows="10" placeholder="Leave blank to disallow..." style="height: calc(100vh - 234px); white-space: nowrap; resize: none;"></textarea>
        </div>
      </tab>

    </tab-system>

  </div>
</dialog-list>

</div>
</tab>

  <tab label="Settings" icon="cogs">
    <div style="padding: 8px;">
      <dbm-checkbox style="float: left;" id="slevel" label="Level" checked></dbm-checkbox>

      <dbm-checkbox style="float: left;" id="sjoin" label="Join" checked></dbm-checkbox>

      <dbm-checkbox style="float: left;" id="sleave" label="Leave" checked></dbm-checkbox>

      <dbm-checkbox style="float: left;" id="stvpis" label="Tvpis" checked></dbm-checkbox>

      <dbm-checkbox style="float: left;" id="scalculator" label="Calculator" checked></dbm-checkbox>

      <br><br>

      <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px;">

      <br>

      <div style="padding-bottom: 12px; float: left; width: calc(30% - 12px);">
      <span class="dbminputlabel">Language</span><br>
      <select id="language" class="round">
            <option value="0">English</option>
            <option value="1">Polish</option>
      </select>
      <br>
      <span class="dbminputlabel">Message</span><br>
      <select id="msgsend" class="round">
            <option value="0">Reply</option>
            <option value="1">Send</option>
      </select>
      <br>
      <span class="dbminputlabel">Guild (ID)</span><br>
      <input id="guild" class="round" type="text">
      </div>
    </div>
  </tab>
</tab-system>
`;
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
    const { interaction, msg } = cache;
    const client = this.getDBM().Bot.bot
    const { levelRank, Tvpis, joinCard, leaveCard } = require('discord-systems')
    const data = cache.actions[cache.index];
    await client.guilds.fetch()
    const guild = client.guilds.cache.get(this.evalMessage(data.guild, cache))
    if (data.slevel === true) {
      let texth = this.evalMessage(data.levelcard[0].texth, cache)
      let barh = this.evalMessage(data.levelcard[0].barh, cache)
      let borderh = this.evalMessage(data.levelcard[0].borderh, cache)
      let avatarborderh = this.evalMessage(data.levelcard[0].avatarborderh, cache)
      let background = this.evalMessage(data.levelcard[0].background, cache)
      let barbackground = this.evalMessage(data.levelcard[0].barbackgroundh, cache)
      if (texth.length < 5) texth = '#34eb89'
      if (texth.length > 5) texth = texth
      if (barh.length < 5) barh = '#FFFFFF'
      if (barh.length > 5) barh = barh
      if (borderh.length < 5) borderh = '#1f1f2f'
      if (borderh.length > 5) borderh = borderh
      if (avatarborderh.length < 5) avatarborderh = '#FF1493'
      if (avatarborderh.length > 5) avatarborderh = avatarborderh
      if (background.length < 5) background = 'brak'
      if (background.length > 30) background = background
      if (barbackground.length < 5) barbackground = '#5f5f6f'
      if (barbackground.length > 8) barbackground = barbackground
      if (background.length < 30) {
        new levelRank({
          message: {
              msg: msg ?? interaction
          },
          member: (msg ?? interaction).guild.members.cache.get(this.evalMessage(data.levelcard[0].member, cache)).user,
          exp: this.evalMessage(data.levelcard[0].exp, cache),
          maxexp: this.evalMessage(data.levelcard[0].maxexp, cache),
          level: this.evalMessage(data.levelcard[0].level, cache),
          rank: this.evalMessage(data.levelcard[0].rank, cache),
          text: texth,
          bar: barh,
          border: borderh,
          avatarborder: avatarborderh,
          barbackground: barbackground,
      }).reply()
      } else {
        new levelRank({
          message: {
              msg: msg ?? interaction
          },
          member: (msg ?? interaction).guild.members.cache.get(this.evalMessage(data.levelcard[0].member, cache)).user,
          exp: this.evalMessage(data.levelcard[0].exp, cache),
          maxexp: this.evalMessage(data.levelcard[0].maxexp, cache),
          level: this.evalMessage(data.levelcard[0].level, cache),
          rank: this.evalMessage(data.levelcard[0].rank, cache),
          text: texth,
          bar: barh,
          border: borderh,
          avatarborder: avatarborderh,
          background: background,
          barbackground: barbackground,
      }).reply()
      }
    } else if (data.stvpis === true) {
      if (data.msgsend === '0') {
        new Tvpis({
          message: {
              msg: msg ?? interaction
          },
          text: this.evalMessage(data.text, cache),
          style: data.style.replace('1', '2').replace('0', '1')
      }).reply()
      } else {
        new Tvpis({
          message: {
              msg: msg ?? interaction
          },
          text: this.evalMessage(data.text, cache),
          style: data.style.replace('1', '2').replace('0', '1')
      }).send()
      }
    } else if (data.sjoin === true) {
      let texth = this.evalMessage(data.joincard[0].texth, cache)
      let background = this.evalMessage(data.joincard[0].background, cache)
      if (texth.length < 5) texth = '#FFFFFF'
      if (texth.length > 5) texth = texth
      const channel = guild.channels.cache.get(this.evalMessage(data.joincard[0].channelid, cache))
      const member = guild.members.cache.get(this.evalMessage(data.joincard[0].memberid, cache))
      if (data.joincard[0].captcha === '0') {
        if (background.length > 30) {
          new joinCard({
            channel: channel,
            member: member,
            middle: this.evalMessage(data.joincard[0].text1, cache),
            name: this.evalMessage(data.joincard[0].text2, cache),
            bottom: this.evalMessage(data.joincard[0].text3, cache),
            text: texth,
            background: background,
        }).send()
        } else {
          new joinCard({
            channel: channel,
            member: member,
            middle: this.evalMessage(data.joincard[0].text1, cache),
            name: this.evalMessage(data.joincard[0].text2, cache),
            bottom: this.evalMessage(data.joincard[0].text3, cache),
            text: texth,
        }).send()
        }
      } else {
        if (background.length < 30) {
          new joinCard({
            channel: channel,
            member: member,
            middle: this.evalMessage(data.joincard[0].text1, cache),
            name: this.evalMessage(data.joincard[0].text2, cache),
            bottom: this.evalMessage(data.joincard[0].text3, cache),
            role: this.evalMessage(data.joincard[0].role, cache),
            text: texth,
            captcha: true,
            client: client,
            language: data.language.replace('0', 'eng').replace('1', 'pl'),
        }).send()
        } else {
          new joinCard({
            channel: channel,
            member: member,
            middle: this.evalMessage(data.joincard[0].text1, cache),
            name: this.evalMessage(data.joincard[0].text2, cache),
            bottom: this.evalMessage(data.joincard[0].text3, cache),
            role: this.evalMessage(data.joincard[0].role, cache),
            text: texth,
            background: background,
            captcha: true,
            client: client,
            language: data.language.replace('0', 'eng').replace('1', 'pl'),
        }).send()
        }
      }
    } else if (data.sleave === true) {
      const channel = guild.channels.cache.get(this.evalMessage(data.leavecard[0].channelid, cache))
      const member = client.users.cache.get(this.evalMessage(data.leavecard[0].memberid, cache))
      let texth = this.evalMessage(data.leavecard[0].texth, cache)
      let background = this.evalMessage(data.leavecard[0].background, cache)
      if (texth.length < 5) texth = '#FFFFFF'
      if (texth.length > 5) texth = texth
      if (background.length < 30) {
        new leaveCard({
          channel: channel, // CHANNEl OBJECT
          member: member, // MEMBER OBJECT
          middle: this.evalMessage(data.leavecard[0].text1, cache), // STRING
          name: this.evalMessage(data.leavecard[0].text2, cache), // STRING
          bottom: this.evalMessage(data.leavecard[0].text3, cache), // STRING
          text: texth
      }).send()
      } else {
        new leaveCard({
          channel: channel, // CHANNEl OBJECT
          member: member, // MEMBER OBJECT
          middle: this.evalMessage(data.leavecard[0].text1, cache), // STRING
          name: this.evalMessage(data.leavecard[0].text2, cache), // STRING
          bottom: this.evalMessage(data.leavecard[0].text3, cache), // STRING
          text: texth,
          background: background
      }).send()
      }
    } else if (data.scalculator == true) {
      const embed = {}
      embed.footer = {}
      embed.title = this.evalMessage(data.embeds[0].title, cache) ?? 'Calculator'
      embed.color = this.evalMessage(data.embeds[0].color, cache) ?? '#4c97ed'
      if (data.embeds[0].timestamp == true) embed.timestamp = true
      embed.footer.text = this.evalMessage(data.embeds[0].footertext, cache) ?? 'Calculator'
      embed.footer.iconURL = this.evalMessage(data.embeds[0].footericon, cache) ?? 'https://i.imgur.com/pq2ElIT.jpg'
      const test = require('simply-djs')
      test.calculator(msg ?? interaction, {
        embed: {
          title: embed.title,
          color: embed.color,
          timestamp: embed.timestamp,
          footer: {
            text: embed.footer.text,
            iconURL: embed.footer.iconURL
          },
          credit: false
        }
      })
      } else if (data.ssuggest == true) {
        const guild = client.guilds.cache.get(this.evalMessage(data.guild, cache))
        const member = guild.members.cache.get(this.evalMessage(data.suggests[0].member, cache))
        const channel = guild.channels.cache.get(this.evalMessage(data.suggests[0].channel, cache))
        const message = channel.messages.cache.get(this.evalMessage(data.suggests[0].message, cache))
        new Suggest({
          suggest: this.evalMessage(data.suggests[0].suggest, cache),
          guild: guild,
          member: member,
          message: message,
          client: client
        }).start()
      }
    },

mod() {},


}
