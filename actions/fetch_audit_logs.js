module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Fetch Audit Logs",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Server Control",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = "Audit Log";
    return [data.varName, dataType];
  },

  subtitle(data, presets) {
    let type
    switch (data.type) {
      case "1":
        type = "Guild Update";
        break;
       case "10":
        type = "Channel Create";
        break;
       case "11":
        type = "Channel Update";
        break;
       case "12":
        type = "Channel Delete";
        break;
       case "13":
        type = "Channel Overwrite Create";
        break;
       case "14":
        type = "Channel Overwrite Update";
        break;
       case "15":
        type = "Channel Overwrite Delete";
        break;
       case "20":
        type = "Member Kick";
        break;
       case "21":
        type = "Member Prune";
        break;
       case "22":
        type = "Member Ban";
        break;
       case "23":
        type = "Member Unban";
        break;
       case "24":
        type = "Member Update";
        break;
       case "25":
        type = "Member Role Update";
        break;
       case "26":
        type = "Member Move";
        break;
       case "27":
        type = "Member Disconnect";
        break;
       case "28":
        type = "Bot Add";
        break;
       case "30":
        type = "Role Create";
        break;
       case "31":
        type = "Role Update";
        break;
       case "32":
        type = "Role Delete";
        break;
       case "40":
        type = "Invite Create";
        break;
       case "41":
        type = "Invite Update";
        break;
       case "42":
        type = "Invite Delete";
        break;
       case "50":
        type = "Webhook Create";
        break;
       case "51":
        type = "Webhook Update";
        break;
       case "52":
        type = "Webhook Delete";
        break;
       case "60":
        type = "Emoji Create";
        break;
       case "61":
        type = "Emoji Update";
        break;
       case "62":
        type = "Emoji Delete";
        break;
       case "72":
        type = "Message Delete";
        break;
       case "73":
        type = "Message Bulk Delete";
        break;
       case "74":
        type = "Message Pin";
        break;
       case "75":
        type = "Message Unpin";
        break;
       case "80":
        type = "Integration Create";
        break;
       case "81":
        type = "Integration Update";
        break;
       case "82":
        type = "Integration Delete";
        break;
       case "83":
        type = "Stage Instance Create";
        break;
       case "84":
        type = "Stage Instance Update";
        break;
       case "85":
        type = "Stage Instance Delete";
        break;
       case "90":
        type = "Sticker Create";
        break;
       case "91":
        type = "Sticker Update";
        break;
       case "92":
        type = "Sticker Delete";
        break;
       case "100":
        type = "Guild Scheduled Event Create";
        break;
       case "101":
        type = "Guild Scheduled Event Update";
        break;
       case "102":
        type = "Guild Scheduled Event Delete";
        break;
       case "110":
        type = "Thread Create";
        break;
       case "111":
        type = "Thread Update";
        break;
       case "112":
        type = "Thread Delete";
        break;
       case "121":
        type = "Application Command Permission Update";
        break;
       case "140":
        type = "Auto Moderation Rule Create";
        break;
       case "141":
        type = "Auto Moderation Rule Update";
        break;
       case "142":
        type = "Auto Moderation Rule Delete";
        break;
       case "143":
        type = "Auto Moderation Block Message";
        break;
       case "144":
        type = "Auto Moderation Flag To Channel";
        break;
       case "145":
        type = "Auto Moderation User Communication Disabled";
        break;
      }
    return `Fetch Audit Log - ${type}`;
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

  meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/fetch_audit_logs.js' },
  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["type", "storage", "varName"],

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
<div style="padding-top: 8px; width: 100%;">
  <span class="dbminputlabel">Source</span><br>
  <select id="type" class="round">
      <option value="1">Guild Update</options>
      <option value="10">Channel Create</options>
      <option value="11">Channel Update</options>
      <option value="12">Channel Delete</options>
      <option value="13">Channel Overwrite Create</options>
      <option value="14">Channel Overwrite Update</options>
      <option value="15">Channel Overwrite Delete</options>
      <option value="20">Member Kick</options>
      <option value="21">Member Prune</options>
      <option value="22">Member Ban</options>
      <option value="23">Member Unban</options>
      <option value="24">Member Update</options>
      <option value="25">Member Role Update</options>
      <option value="26">Member Move</options>
      <option value="27">Member Disconnect</options>
      <option value="28">Bot Add</options>
      <option value="30">Role Create</options>
      <option value="31">Role Update</options>
      <option value="32">Role Delete</options>
      <option value="40">Invite Create</options>
      <option value="41">Invite Update</options>
      <option value="42">Invite Delete</options>
      <option value="50">Webhook Create</options>
      <option value="51">Webhook Update</options>
      <option value="52">Webhook Delete</options>
      <option value="60">Emoji Create</options>
      <option value="61">Emoji Update</options>
      <option value="62">Emoji Delete</options>
      <option value="72">Message Delete</options>
      <option value="73">Message Bulk Delete</options>
      <option value="74">Message Pin</options>
      <option value="75">Message Unpin</options>
      <option value="80">Integration Create</options>
      <option value="81">Integration Update</options>
      <option value="82">Integration Delete</options>
      <option value="83">Stage Instance Create</options>
      <option value="84">Stage Instance Update</options>
      <option value="85">Stage Instance Delete</options>
      <option value="90">Sticker Create</options>
      <option value="91">Sticker Update</options>
      <option value="92">Sticker Delete</options>
      <option value="100">Guild Scheduled Event Create</options>
      <option value="101">Guild Scheduled Event Update</options>
      <option value="102">Guild Scheduled Event Delete</options>
      <option value="110">Thread Create</options>
      <option value="111">Thread Update</options>
      <option value="112">Thread Delete</options>
      <option value="121">Application Command Permission Update</options>
      <option value="140">Auto Moderation Rule Create</options>
      <option value="141">Auto Moderation Rule Update</options>
      <option value="142">Auto Moderation Rule Delete</options>
      <option value="143">Auto Moderation Block Message</options>
      <option value="144">Auto Moderation Flag To Channel</options>
      <option value="145">Auto Moderation User Communication Disabled</options>
  </select>
  <br>
  <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
</div>`;
  },

  init() {},
  //      <option value=""></options>
  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    console.log('ACTION: fetch_audit_logs; [v1.1] (v2.1.8)')
    const data = cache.actions[cache.index];
    await cache.server.fetchAuditLogs({
      type: parseInt(data.type),
      limit: 1
    }).then(logs => {
      const log = logs.entries.first()
      this.storeValue(log, parseInt(data.storage), data.varName, cache)
      this.callNextAction(cache);
    })
  },

  mod() {},
};