module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Giveaway Create",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Discord Bots Poland",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    const presa = data.nagroda
    return `Creator konkursów - Nagroda: ${presa}`;
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

  meta: { version: "2.1.6", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka/dbmmody/blob/main/beta/giveaway_create.js', downloadUrl: 'https://github.com/Gotowka/dbmmody/blob/main/beta/giveaway_create.js' },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["title", "description", "color", "footertext", "footericon", "info", "time", "type", "nagroda", "find"],

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
            Created by money#6283\n[end] = Data zakończenia konkursu, [presa] = Nagroda, [author.tag] = Nazwa + tag, [author.username] = Nazwa, [author.id] = Id
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
    const data = cache.actions[cache.index]
    const { interaction } = cache
    const { MessageEmbed } = require("discord.js");
    const author = interaction.member
    const title = this.evalMessage(data.title, cache)
    const d1 = this.evalMessage(data.description, cache)
    const color = this.evalMessage(data.color, cache)
    const footertext = this.evalMessage(data.footertext, cache)
    const footericon = this.evalMessage(data.footericon, cache)
    let time = this.evalMessage(data.time, cache)
    const type = parseInt(data.type, 10);
    const emoji = this.evalMessage(data.find, cache)
    const nagroda = this.evalMessage(data.nagroda, cache)
    const channel = interaction.channel
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
    interaction.reply({ content: 'Sukces!', ephemeral: true })
    const msg = await channel.send({ embeds: [embed] })
       await msg.react(emoji)
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
            let osoby = await msg.reactions.cache.get(emoji).users.fetch()
            const member = osoby.random()
            if(member.bot) {
              const member = osoby.random()
              const winner = interaction.guild.members.cache.get(member.id)
              msg.reply({ content: `${winner} Aby odebrać nagrode, zgłoś się w wiadomości prywatnej do ${author.user.tag} (${nagroda})`})
            } else {
              const winner = interaction.guild.members.cache.get(member.id)
              msg.reply({ content: `${winner} Aby odebrać nagrode, zgłoś się w wiadomości prywatnej do ${author.user.tag} (${nagroda})`})
            }
        }, time)
},


  mod() {},
};
