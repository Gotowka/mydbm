module.exports = {

    name: "Show Modal",
  
    section: "Messaging",
  
    subtitle(data, presets) {
      return `"${data.title}" with ${data.textInputs.length} Text Inputs`;
    },
  
    variableStorage(data, varType) {
      if (varType !== 1) return;
      if (!data.textInputs) return;
      const result = [];
      for (let i = 0; i < data.textInputs.length; i++) {
        if (data.textInputs[i].id) {
          result.push(data.textInputs[i].id);
          result.push("Text from Input");
        }
      }
      return result;
    },
  
    meta: { version: "3.2.4", preciseCheck: true, author: null, authorUrl: null, downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v3/actions/show_modal.js' },
  
    fields: ["title", "textInputs"],
  
    html(isEvent, data) {
      return `
  <span class="dbminputlabel">Modal Title</span><br>
  <input id="title" class="round" type="text" value="My Modal">
  
  <br><br>
  
  <dialog-list id="textInputs" fields='["name", "placeholder", "minLength", "maxLength", "id", "row", "style", "required"]' dialogTitle="Text Input Info" dialogWidth="600" dialogHeight="370" listLabel="Text Inputs" listStyle="height: calc(100vh - 300px);" itemName="Text Input" itemCols="1" itemHeight="40px;" itemTextFunction="data.name + ' (' + (data.style === 'PARAGRAPH' ? 'Paragraph)' : 'One-Line)')" itemStyle="line-height: 40px;">
    <div style="padding: 16px;">
      <div style="width: calc(50% - 12px); float: left;">
        <span class="dbminputlabel">Name</span>
        <input id="name" class="round" type="text">
  
        <br>
  
        <span class="dbminputlabel">Placeholder</span><br>
        <input id="placeholder" class="round" type="text">
  
        <br>
  
        <span class="dbminputlabel">Minimum Length</span>
        <input id="minLength" placeholder="0" class="round" type="text" value="0">
  
        <br>
  
        <span class="dbminputlabel">Maximum Length</span>
        <input id="maxLength" placeholder="1000" class="round" type="text" value="1000">
  
        <br>
      </div>
      <div style="width: calc(50% - 12px); float: right;">
        <span class="dbminputlabel">Temp Var ID</span>
        <input id="id" placeholder="Leave blank to disallow..." class="round" type="text">
  
        <br>
  
        <span class="dbminputlabel">Style</span>
        <select id="style" class="round">
          <option value="SHORT">One Line</option>
          <option value="PARAGRAPH">Paragraph</option>
        </select>
  
        <br>
  
        <span class="dbminputlabel">Required?</span>
        <select id="required" class="round">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
  
    </div>
  </dialog-list>`;
    },
  
    init() {},
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const { TextInputBuilder, ModalBuilder, ActionRowBuilder } = require('discord.js')
      const tempVariableNames = [];
      let componentsArr = [];
  
      if (Array.isArray(data.textInputs)) {
        const existingTempVars = [];
        for (let i = 0; i < data.textInputs.length; i++) {
          const textInput = data.textInputs[i];
  
          const unusedNameTemplate = "unusedTempVarName";
          let j = 0;
          let unusedName = unusedNameTemplate + "0";
          while(existingTempVars.includes(unusedName)) {
            unusedName = unusedNameTemplate + (++j);
          }
  
          const tData = this.generateTextInput(textInput, unusedName, cache);
          let style
          if (tData.style === 'SHORT') style = 1 
          else style = 2
          const input = new TextInputBuilder()
          .setCustomId(tData.customId)
          .setLabel(tData.label)
          .setPlaceholder(tData.placeholder)
          .setRequired(tData.required)
          .setStyle(style)
          .setMinLength(tData.minLength)
          .setMaxLength(tData.maxLength)
  
          componentsArr.push(input)
  
          existingTempVars.push(tData.customId);
          if(textInput.id) {
            tempVariableNames.push(tData.customId);
          }
        }
      }
  
      if (cache.interaction) {
  
        if (cache.interaction.showModal) {
          const modalData = new ModalBuilder()
          .setCustomId(cache.interaction.id)
          .setTitle(this.evalMessage(data.title, cache))
  
          componentsArr.map(c => {
            const row = new ActionRowBuilder().addComponents(c)
  
            modalData.addComponents(row)
          })
  
  
          this.registerModalSubmitResponses(cache.interaction.id, (newInteraction) => {
            newInteraction.__originalInteraction = cache.interaction;
            cache.interaction = newInteraction;
  
            for (let i = 0; i < tempVariableNames.length; i++) {
              const name = tempVariableNames[i];
              const val = newInteraction.fields.getTextInputValue(name);
              if(typeof val === "string") {
                this.storeValue(val, 1, name, cache);
              }
            }
  
            this.callNextAction(cache);
          });
  
          cache.interaction.showModal(modalData);
  
        } else {
  
          this.displayError(data, cache, "Cannot show modal from current interaction, perhaps attempting to show modal multiple times?");
          this.callNextAction(cache);
  
        }
      } else {
        this.callNextAction(cache);
      }
    },
  
    mod() {},
  };
  