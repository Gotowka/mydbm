module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Set Member Channel Perms",
  
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------
  
    section: "Channel Control",
  
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
  
    subtitle(data, presets) {
      return `${presets.getChannelText(data.channel, data.varName)}`;
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
  
    meta: { version: "3.1.1", preciseCheck: true, author: null, authorUrl: null, downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/set_member_channel_perms.js' },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["channel", "varName", "member", "varName2", "permission", "state", "reason"],
  
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
  <channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
  <br><br><br>
  <member-input style="padding-top: 8px;" dropdownLabel="Source Member" selectId="member" variableContainerId="varNameContainer2" variableInputId="varName2"></member-input>
  <br><br><br>
  <div style="padding-top: 8px;">
      <div style="float: left; width: calc(50% - 12px);">
          <span class="dbminputlabel">Permission</span><br>
          <select id="permission" class="round">
          <option value="CreateInstantInvite">CreateInstantInvite</option>
          <option value="KickMembers">KickMembers</option>
          <option value="BanMembers">BanMembers</option>
          <option value="Administrator">Administrator</option>
          <option value="ManageChannels">ManageChannels</option>
          <option value="ManageGuild">ManageGuild</option>
          <option value="AddReactions">AddReactions</option>
          <option value="ViewAuditLog">ViewAuditLog</option>
          <option value="PrioritySpeaker">PrioritySpeaker</option>
          <option value="Stream">Stream</option>
          <option value="ViewChannel">ViewChannel</option>
          <option value="SendMessages">SendMessages</option>
          <option value="SendTTSMessages">SendTTSMessages</option>
          <option value="ManageMessages">ManageMessages</option>
          <option value="EmbedLinks">EmbedLinks</option>
          <option value="AttachFiles">AttachFiles</option>
          <option value="ReadMessageHistory">ReadMessageHistory</option>
          <option value="MentionEveryone">MentionEveryone</option>
          <option value="UseExternalEmojis">UseExternalEmojis</option>
          <option value="ViewGuildInsights">ViewGuildInsights</option>
          <option value="Connect">Connect</option>
          <option value="Speak">Speak</option>
          <option value="MuteMembers">MuteMembers</option>
          <option value="DeafenMembers">DeafenMembers</option>
          <option value="MoveMembers">MoveMembers</option>
          <option value="UseVAD">UseVAD</option>
          <option value="ChangeNickname">ChangeNickname</option>
          <option value="ManageNicknames">ManageNicknames</option>
          <option value="ManageRoles">ManageRoles</option>
          <option value="ManageWebhooks">ManageWebhooks</option>
          <option value="ManageEmojisAndStickers">ManageEmojisAndStickers</option>
          <option value="UseApplicationCommands">UseApplicationCommands</option>
          <option value="RequestToSpeak">RequestToSpeak</option>
          <option value="ManageEvents">ManageEvents</option>
          <option value="ManageThreads">ManageThreads</option>
          <option value="CreatePublicThreads">CreatePublicThreads</option>
          <option value="CreatePrivateThreads">CreatePrivateThreads</option>
          <option value="UseExternalStickers">UseExternalStickers</option>
          <option value="SendMessagesInThreads">SendMessagesInThreads</option>
          <option value="UseEmbeddedActivities">UseEmbeddedActivities</option>
          <option value="ModerateMembers">ModerateMembers</option>
          </select>
      </div>
      <div style="float: right; width: calc(50% - 12px);">
          <span class="dbminputlabel">Change To</span><br>
          <select id="state" class="round">
              <option value="0" selected>Allow</option>
              <option value="1">Inherit</option>
              <option value="2">Disallow</option>
          </select>
      </div>
  </div>`;
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
      const data = cache.actions[cache.index];
      const channel = await this.getChannelFromData(data.channel, data.varName, cache);
      const member = await this.getMemberFromData(data.member, data.varName2, cache);
      let disabler
      if (data.state === '0') disabler = true;
      else if (data.state === '1') disabler = false;
      else disabler = null;
      if (channel?.permissionOverwrites) {
          channel.permissionOverwrites
            .edit(member, {
                [data.permission]: disabler
            })
            .then(() => this.callNextAction(cache))
            .catch((err) => this.displayError(data, cache, err));
        } else {
          this.callNextAction(cache);
        }
    },
  
    //---------------------------------------------------------------------
    // Action Bot Mod
    //
    // Upon initialization of the bot, this code is run. Using the bot's
    // DBM namespace, one can add/modify existing functions if necessary.
    // In order to reduce conflicts between mods, be sure to alias
    // functions you wish to overwrite.
    //---------------------------------------------------------------------
  
    mod() {},
  };