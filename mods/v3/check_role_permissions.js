module.exports = {
    name: 'Check Role Permissions',
    section: 'Conditions',
    meta: {
      version: '3.2.0',
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
    <option value="1">Create Invite</options>
    <option value="2">Kick Members</options>
    <option value="4">Ban Members</options>
    <option value="8">Administrator</options>
    <option value="16">Manage Channels</options>
    <option value="32">Manage Guild</options>
    <option value="64">Add Reactions</options>
    <option value="128">ViewAuditLog</options>
    <option value="256">Priority Speaker</options>
    <option value="512">Stream</options>
    <option value="1024">View Channel</options>
    <option value="2048">Send Messages</options>
    <option value="4096">Send TTSMessages</options>
    <option value="8192">Manage Messages</options>
    <option value="16384">Embed Links</options>
    <option value="32768">Attach Files</options>
    <option value="65536">Read Message History</options>
    <option value="131072">Mention Everyone</options>
    <option value="262144">Use Emojis</options>
    <option value="524288">View Guild Insights</options>
    <option value="1048576">Connect</options>
    <option value="2097152">Speak</options>
    <option value="4194304">Mute Members</options>
    <option value="8388608">Deafen Members</options>
    <option value="16777216">Move Members</options>
    <option value="33554432">Use VAD</options>
    <option value="67108864">Change Nickname</options>
    <option value="134217728">Manage Nicknames</options>
    <option value="268435456">Manage Roles</options>
    <option value="536870912">Manage Webhooks</options>
    <option value="1073741824">Manage Emojis & Stickers</options>
    <option value="2147483648">Use Application Commands</options>
    <option value="4294967296">Request To Speak</options>
    <option value="8589934592">Manage Events</options>
    <option value="17179869184">Manage Threads</options>
    <option value="34359738368">Create Public Threads</options>
    <option value="68719476736">Create Private Threads</options>
    <option value="137438953472">Use Stickers</options>
    <option value="274877906944">Send Messages In Threads</options>
    <option value="549755813888">Use Embedded Activities</options>
    <option value="1099511627776">Moderate Members</options>
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