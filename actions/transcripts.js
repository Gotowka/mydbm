module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
    name: "Transcript",
  
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
      return `Create the transcript`;
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
  
    meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/transcripts.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["logs"],
  
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
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh
      </p>
  </div><br>
  <span class="dbminputlabel">Channel ID or Member ID</span><br>
  <input id="logs" class="round" type="text" placeholder="Where send the transcript, Leave blank = using channel">`;
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
      console.log('ACTION: transcripts; [v1.0] (v2.1.8)')
      const { msg, interaction } = cache
      const data = cache.actions[cache.index];
      const discordTranscripts = require('discord-html-transcripts');
     
      const messages = await (msg ?? interaction).channel.messages.fetch({ limit: 100 }); 
      const channel = (msg ?? interaction).channel; 

      const link = await discordTranscripts.generateFromMessages(messages, channel);

      if (!this.evalMessage(data.logs, cache)) (interaction ?? msg).channel.send({ files: [link] });
      else {
        const channel = await (interaction ?? msg).guild.channels.cache.get(this.evalMessage(data.logs, cache));
        if (!channel) {
          const member = (interaction ?? msg).guild.members.cache.get(this.evalMessage(data.logs, cache))
          if (!member) (interaction ?? msg).channel.send({ files: [link] });
          else member.send({ files: [link] });
        }
        else channel.send({ files: [link] });
      }
      await this.callNextAction(cache)
    },

  mod() {},

  
}
