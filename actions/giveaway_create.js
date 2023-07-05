module.exports = {
  
  name: "Giveaway Create",

  section: "Discord",

  subtitle(data, presets) {
    const presa = data.nagroda
    return `Giveaway creator: ${presa}`;
  },

  meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/giveaway_create.js' },

  fields: ["title", "description", "color", "footertext", "footericon", "info", "time", "type", "nagroda", "find"],

  html(isEvent, data) {
    return `
    <div>
        <p>
            <u>Mod Info:</u><br>
            Created by money#6283<br>
            Help: https://discord.gg/apUVFy7SUh<br>
            [end] = End time, [presa] = Prize, [author.tag] = Name + tag, [author.username] = Username, [author.id] = Id
        </p>
    </div><br>

      <div style="float: left; width: calc(50% - 12px);">
        <span class="dbminputlabel">Title <span style="color:red">*</span></span>
        <input id="title" class="round" type="text">

        <br>

        <span class="dbminputlabel">Description</span>
        <textarea id="description" class="dbm_monospace" rows="4" placeholder="Wszystkie dostępne skróty masz dostępne w Mod Info" white-space: nowrap; resize: none;"></textarea>
        
        <br>

        <span class="dbminputlabel">Color</span>
        <input id="color" class="round" type="text">
        
        <br>

        <span class="dbminputlabel">Footer Text</span>
        <input id="footertext" class="round" type="text">
        
        <br>

        <br>

      </div>
      <div style="float: right; width: calc(50% - 12px);">
      <span class="dbminputlabel">Time <span style="color:red">*</span></span>
      <input id="time" class="round" type="text">

      <br>

      <span class="dbminputlabel">Type <span style="color:red">*</span></span><br>
      <select id="type" class="round">
            <option value="0">Seconds</option>
            <option value="1">Minutes</option>
            <option value="2">Hours</option>
      </select>

      <br>

      <span class="dbminputlabel">Nagroda <span style="color:red">*</span></span>
      <input id="nagroda" class="round" type="text">

      <br>
        
      <span class="dbminputlabel">Emoji (id) <span style="color:red">*</span></span>
      <input id="find" class="round" type="text">
      
      <br>

      <span class="dbminputlabel">Footer Icon</span>
      <input id="footericon" class="round" type="text">
      
      <br>
    </div>
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
    console.log('ACTION: giveaway_create; [v1.0] (v2.1.9)')
    const data = cache.actions[cache.index]
    const { interaction, msg } = cache
    const { MessageEmbed } = require("discord.js");
    const mess = (interaction ?? msg)
    const author = mess.member
    const title = this.evalMessage(data.title, cache)
    const d1 = this.evalMessage(data.description, cache)
    const color = this.evalMessage(data.color, cache)
    const footertext = this.evalMessage(data.footertext, cache)
    const footericon = this.evalMessage(data.footericon, cache)
    let time = this.evalMessage(data.time, cache)
    const type = parseInt(data.type, 10);
    const emoji = this.evalMessage(data.find, cache)
    const nagroda = this.evalMessage(data.nagroda, cache)
    const channel = mess.channel
    let duration
    let time2 = this.evalMessage(data.time, cache)
    const ttype = data.type
    if (ttype.includes("0")) {
      duration = time2 * 1e3;
  }
  if (ttype.includes("1")) {
      duration = time2 * 1e3 * 60;
  }
  if (ttype.includes("2")) {
      duration = time2 * 1e3 * 60 * 60;
  }
  const end = Date.parse(new Date(new Date().getTime() + duration)) / 1000;
  const d2 = await d1.replace('[end]', `<t:${end}:f>`)
  const d3 = await d2.replace('[presa]', nagroda)
  const d4 = await d3.replace('[author.tag]', author.user.tag)
  const d5 = await d4.replace('[author.name]', author.user.username)
  const description = await d5.replace('[author.id]', author.id)
    const embed = new MessageEmbed()
    if(title) embed.setTitle(title)
    if(description) embed.setDescription(description)
    if(color) embed.setColor(color)
    if(!color) embed.setColor('RANDOM')
    if(footertext) {
      embed.setFooter({ text: footertext, iconURL: footericon ?? footericon ? footericon : null })
    }
    mess.reply({ content: ':white_check_mark:!', ephemeral: true })
    const ms = await channel.send({ embeds: [embed] })
       await ms.react(emoji)
        switch (type) {
          case 0:
            time *= 1e3;
            break;
          case 1:
            time *= 1e3 * 60;
            break;
          case 2:
            time *= 1e3 * 60 * 60;
            break;
          default:
            break;
      }
        setTimeout(async () => {
            let osoby = await ms.reactions.cache.get(emoji).users.fetch()
            const member = osoby.random()
            if(member.bot) {
              const member = osoby.random()
              const winner = mess.guild.members.cache.get(member.id)
              ms.reply({ content: `${winner} Aby odebrać nagrode, zgłoś się w wiadomości prywatnej do ${author.user.tag} (${nagroda})`})
            } else {
              const winner = mess.guild.members.cache.get(member.id)
              ms.reply({ content: `${winner} Aby odebrać nagrode, zgłoś się w wiadomości prywatnej do ${author.user.tag} (${nagroda})`})
            }
        }, time)
},


  mod() {},
};
