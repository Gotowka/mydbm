module.exports = {
    name: 'Check Role Permissions',
    section: 'Conditions',
    meta: {
      version: '3.1.1',
      preciseCheck: false,
      author: 'DBM Mods',
      authorUrl: 'https://github.com/dbm-network/mods',
      downloadURL: 'https://github.com/Gotowka/mydbm/blob/v3/actions/check_role_permissions.js',
    },
  
    subtitle(data, presets) {
      return `${presets.getRoleText(data.role, data.varName)} has ${data.permission}?`;
    },
  
    fields: ['role', 'varName', 'permission', 'iftrue', 'iftrueVal', 'iffalse', 'iffalseVal'],
  
    html(isEvent, data) {
      return `
  <role-input dropdownLabel="Source Role" selectId="role" variableContainerId="varNameContainer" variableInputId="varName"></role-input>
  <br><br><br>
  <div style="padding-top: 8px; width: 80%;">
    Permission:<br>
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
  </div><br>
  <div>
    ${data.conditions[0]}
  </div>`;
    },
  
    init() {
      const { glob, document } = this;
      const option = document.createElement('OPTION');
      option.value = '4';
      option.text = 'Jump to Anchor';
      const iffalse = document.getElementById('iffalse');
      if (iffalse.length === 4) iffalse.add(option);
  
      const option2 = document.createElement('OPTION');
      option2.value = '4';
      option2.text = 'Jump to Anchor';
      const iftrue = document.getElementById('iftrue');
      if (iftrue.length === 4) iftrue.add(option2);
  
      glob.onChangeTrue = function onChangeTrue(event) {
        switch (parseInt(event.value, 10)) {
          case 0:
          case 1:
            document.getElementById('iftrueContainer').style.display = 'none';
            break;
          case 2:
            document.getElementById('iftrueName').innerHTML = 'Action Number';
            document.getElementById('iftrueContainer').style.display = null;
            break;
          case 3:
            document.getElementById('iftrueName').innerHTML = 'Number of Actions to Skip';
            document.getElementById('iftrueContainer').style.display = null;
            break;
          case 4:
            document.getElementById('iftrueName').innerHTML = 'Anchor ID';
            document.getElementById('iftrueContainer').style.display = null;
            break;
          default:
            break;
        }
      };
      glob.onChangeFalse = function onChangeFalse(event) {
        switch (parseInt(event.value, 10)) {
          case 0:
          case 1:
            document.getElementById('iffalseContainer').style.display = 'none';
            break;
          case 2:
            document.getElementById('iffalseName').innerHTML = 'Action Number';
            document.getElementById('iffalseContainer').style.display = null;
            break;
          case 3:
            document.getElementById('iffalseName').innerHTML = 'Number of Actions to Skip';
            document.getElementById('iffalseContainer').style.display = null;
            break;
          case 4:
            document.getElementById('iffalseName').innerHTML = 'Anchor ID';
            document.getElementById('iffalseContainer').style.display = null;
            break;
          default:
            break;
        }
      };
  
      glob.onChangeTrue(document.getElementById('iftrue'));
      glob.onChangeFalse(document.getElementById('iffalse'));
    },
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const role = await this.getRoleFromData(data.role, data.varName, cache);
      let result = false
      if (role) result = role.permissions.has(data.permission);
      this.executeResults(result, data, cache);
    },
  
    mod() {},
  };