module.exports = {

    name: "Check Member Permissions",
  
    section: "Conditions",
  
    subtitle(data, presets) {
      return `${presets.getConditionsText(data)}`;
    },
  
    meta: { version: "3.2.3", preciseCheck: true, author: null, authorUrl: null, downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/check_member_permissions.js' },
  
    fields: ["member", "varName", "permission", "branch"],
  
    html(isEvent, data) {
      return `
    <member-input dropdownLabel="Source Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
  
    <br><br><br>
  
    <div style="padding-top: 8px; width: 80%;">
      <span class="dbminputlabel">Permission</span><br>
      <select id="permission" class="round">
    <option value="1">CreateInstantInvite</options>
    <option value="2">KickMembers</options>
    <option value="4">BanMembers</options>
    <option value="8">Administrator</options>
    <option value="16">ManageChannels</options>
    <option value="32">ManageGuild</options>
    <option value="64">AddReactions</options>
    <option value="128">ViewAuditLog</options>
    <option value="256">PrioritySpeaker</options>
    <option value="512">Stream</options>
    <option value="1024">ViewChannel</options>
    <option value="2048">SendMessages</options>
    <option value="4096">SendTTSMessages</options>
    <option value="8192">ManageMessages</options>
    <option value="16384">EmbedLinks</options>
    <option value="32768">AttachFiles</options>
    <option value="65536">ReadMessageHistory</options>
    <option value="131072">MentionEveryone</options>
    <option value="262144">UseExternalEmojis</options>
    <option value="524288">ViewGuildInsights</options>
    <option value="1048576">Connect</options>
    <option value="2097152">Speak</options>
    <option value="4194304">MuteMembers</options>
    <option value="8388608">DeafenMembers</options>
    <option value="16777216">MoveMembers</options>
    <option value="33554432">UseVAD</options>
    <option value="67108864">ChangeNickname</options>
    <option value="134217728">ManageNicknames</options>
    <option value="268435456">ManageRoles</options>
    <option value="536870912">ManageWebhooks</options>
    <option value="1073741824">ManageEmojisAndStickers</options>
    <option value="2147483648">UseApplicationCommands</options>
    <option value="4294967296">RequestToSpeak</options>
    <option value="8589934592">ManageEvents</options>
    <option value="17179869184">ManageThreads</options>
    <option value="34359738368">CreatePublicThreads</options>
    <option value="68719476736">CreatePrivateThreads</options>
    <option value="137438953472">UseExternalStickers</options>
    <option value="274877906944">SendMessagesInThreads</options>
    <option value="549755813888">UseEmbeddedActivities</options>
    <option value="1099511627776">ModerateMembers</options>
      </select>
    </div>
  
    <br>
  
    <hr class="subtlebar">
  
    <br>
  
    <conditional-input id="branch"></conditional-input>`;
    },
  
    preInit(data, formatters) {
      return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
    },
  
    init() {},
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const member = await this.getMemberFromData(data.member, data.varName, cache);
      let result = false;
      if (member) {
        result = member.permissions.has(data.permission);
      }
      this.executeResults(result, data?.branch ?? data, cache);
    },
  
    modInit(data) {
      this.prepareActions(data.branch?.iftrueActions);
      this.prepareActions(data.branch?.iffalseActions);
    },
  
    mod() {},
  };
  