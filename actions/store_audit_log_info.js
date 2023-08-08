module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
  
    name: "Store Auditlog Info",
  
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
      let dataType = "";
      switch (data.type) {
        case "target":
          dataType = "Object<User/Guild/...>";
          break;
         case "executor":
          dataType = "Object<User>";
          break;
         case "id":
          dataType = "Text";
          break;
         case "changes":
          dataType = "Array<key,old,new>";
          break;
         case "reason":
          dataType = "Text";
          break;
         case "extra":
          dataType = "Object<Object/Role/Member>";
          break;
        }
      return [data.varName, dataType];
    },
  
    subtitle(data, presets) {
      let type
      switch (data.type) {
        case "target":
          type = "Target";
          break;
         case "executor":
          type = "Executor";
          break;
         case "id":
          type = "Id";
          break;
         case "changes":
          type = "Changes";
          break;
         case "reason":
          type = "reason";
          break;
         case "extra":
          type = "Extra";
          break;
        }
      return `Audit Log Information - ${type}`;
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
  
    meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/store_audit_log_info.js' },
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["type2", "auditlog", "type", "storage", "varName"],
  
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
  <div style="float: left; width: calc(85% - 12px);">
    <retrieve-from-variable dropdownLabel="AuditLog Data" selectId="type2" variableContainerId="varNameContainer" variableInputId="auditlog"></retrieve-from-variable>
  </div>
  <div style="padding-top: 8px; float: left; width: 85%;">
    <span class="dbminputlabel">Source</span><br>
    <select id="type" class="round">
        <option value="target">Target</options>
        <option value="executor">Executor</options>
        <option value="id">Id</options>
        <option value="changes">Changes</options>
        <option value="reason">Reason</options>
        <option value="extra">Extra</options>
    </select>
    <br>
    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>
  </div>`;
    },
  
    init() {},

    //---------------------------------------------------------------------
    // Action Bot Function
    //
    // This is the function for the action within the Bot's Action class.
    // Keep in mind event calls won't have access to the "msg" parameter,
    // so be sure to provide checks for variable existence.
    //---------------------------------------------------------------------
  
    async action(cache) {
      console.log('ACTION: store_audit_log_info; [v1.0] (v2.1.8)')
      const data = cache.actions[cache.index];
      const auditLog = this.getVariable(parseInt(data.type2), data.auditlog, cache)
      const info = auditLog[data.type]
      this.storeValue(info, parseInt(data.storage), data.varName, cache)
      this.callNextAction(cache);
    },
  
    mod() {},
};