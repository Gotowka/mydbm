module.exports = {
  
    name: "Ticket Create",
  
    section: "Discord",
  
    subtitle(data, presets) {
      return `Create the ticket - ${data.Tname}`;
    },
  
    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      let dataType = "Channel Object";
      return [data.varName2, dataType];
    },

    meta: { version: "2.1.8", preciseCheck: true, author: 'Gotowka', authorUrl: 'https://github.com/Gotowka', downloadUrl: 'https://github.com/Gotowka/mydbm/blob/v2/actions/ticket_manager.js' },
    
    fields: ["Tname", "Ttopic", "Tparent", "Tposition", "embeds", "E1", "E2", "limit", "role", "storage", "varName"],
  
    html(isEvent, data) {
        return `
        <div>
        <p>
          <u>Mod Info:</u><br>
          Created by money#6283<br>
          Help: https://discord.gg/apUVFy7SUh<br>
          Vars: 
          - #1: [name, tag, id, ticket] (reply int - ticket exist)
          - #2: [name, tag, id, ticket] (reply int - new ticket)
        </p>
      </div>
    
    <tab-system style="margin-top: 20px;">
    
    
    <tab label="Ticket" icon="align left">
          <div style="float: left; width: calc(50% - 12px); padding: 8px;">
          <span class="dbminputlabel">Name</span>
          <input id="Tname" class="round" type="text">
      
          <br>
      
          <span class="dbminputlabel">Topic</span>
          <input id="Ttopic" class="round" type="text">
          </div>
      
          <div style="float: right; width: calc(50% - 12px); padding: 8px;">
          <span class="dbminputlabel">Category ID</span>
          <input id="Tparent" class="round" type="text">
      
          <br>
      
          <span class="dbminputlabel">Position</span>
          <input id="Tposition" class="round" type="text">
          </div>
        </tab>
    
        <tab label="Visualization" icon="list">
        <div style="padding: 8px;">
    
          <dialog-list id="embeds" fields='["title", "url", "color", "timestamp", "imageUrl", "thumbUrl", "description", "fields", "author", "authorUrl", "authorIcon", "footerText", "footerIconUrl"]' dialogTitle="Embed Info" dialogWidth="540" dialogHeight="460" listLabel="Embeds" listStyle="height: calc(100vh - 350px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="data.title + ' - ' + data.description" itemStyle="text-align: left; line-height: 30px;">
            <div style="padding: 16px 16px 0px 16px;">
    
              <tab-system>
    
                <tab label="General" icon="certificate">
                  <div style="padding: 8px">
                    <div style="float: left; width: calc(50% - 12px);">
                      <span class="dbminputlabel">Title</span><br>
                      <input id="title" class="round" type="text">
    
                      <br>
    
                      <span class="dbminputlabel">Color</span><br>
                      <input id="color" class="round" type="text" placeholder="Leave blank for default...">
                    </div>
    
                    <div style="float: right; width: calc(50% - 12px);">
                      <span class="dbminputlabel">URL</span><br>
                      <input id="url" class="round" type="text" placeholder="Leave blank for none...">
    
                      <br>
    
                      <span class="dbminputlabel">Use Timestamp</span><br>
                      <select id="timestamp" class="round">
                        <option value="true">Yes</option>
                        <option value="false" selected>No</option>
                      </select>
                    </div>
    
                    <br><br><br><br><br><br><br>
    
                    <hr class="subtlebar">
    
                    <br>
    
                    <span class="dbminputlabel">Image URL</span><br>
                    <input id="imageUrl" class="round" type="text" placeholder="Leave blank for none...">
    
                    <br>
    
                    <span class="dbminputlabel">Thumbnail URL</span><br>
                    <input id="thumbUrl" class="round" type="text" placeholder="Leave blank for none...">
                  </div>
                </tab>
    
                <tab label="Description" icon="file image">
                  <div style="padding: 8px">
                    <textarea id="description" class="dbm_monospace" rows="10" placeholder="Insert description here..." style="height: calc(100vh - 149px); white-space: nowrap; resize: none;"></textarea>
                  </div>
                </tab>
    
                <tab label="Fields" icon="list">
                  <div style="padding: 8px">
                    <dialog-list id="fields" fields='["name", "value", "inline"]' dialogTitle="Field Info" dialogWidth="540" dialogHeight="300" listLabel="Fields" listStyle="height: calc(100vh - 190px);" itemName="Field" itemCols="1" itemHeight="30px;" itemTextFunction="data.name + '<br>' + data.value" itemStyle="text-align: left; line-height: 30px;">
                      <div style="padding: 16px;">
                        <div style="float: left; width: calc(50% - 12px);">
                          <span class="dbminputlabel">Field Name</span><br>
                          <input id="name" class="round" type="text">
                        </div>
    
                        <div style="float: right; width: calc(50% - 12px);">
                          <span class="dbminputlabel">Inline?</span><br>
                          <select id="inline" class="round">
                            <option value="true">Yes</option>
                            <option value="false" selected>No</option>
                          </select>
                        </div>
    
                        <br><br><br><br>
    
                        <span class="dbminputlabel">Field Value</span><br>
                        <textarea id="value" class="dbm_monospace" rows="10" placeholder="Insert field text here..." style="height: calc(100vh - 190px); white-space: nowrap; resize: none;"></textarea>
    
                      </div>
                    </dialog-list>
                  </div>
                </tab>
    
                <tab label="Author" icon="user circle">
                  <div style="padding: 8px">
                    <span class="dbminputlabel">Author Text</span><br>
                    <input id="author" class="round" type="text" placeholder="Leave blank to disallow...">
    
                    <br>
    
                    <span class="dbminputlabel">Author URL</span><br>
                    <input id="authorUrl" class="round" type="text" placeholder="Leave blank for none...">
    
                    <br>
    
                    <span class="dbminputlabel">Author Icon URL</span><br>
                    <input id="authorIcon" class="round" type="text" placeholder="Leave blank for none...">
                  </div>
                </tab>
    
                <tab label="Footer" icon="map outline">
                  <div style="padding: 8px;">
                    <span class="dbminputlabel">Footer Icon URL</span><br>
                    <input id="footerIconUrl" class="round" type="text" placeholder="Leave blank for none...">
    
                    <br>
    
                    <span class="dbminputlabel">Footer Text</span><br>
                    <textarea id="footerText" class="dbm_monospace" rows="10" placeholder="Leave blank to disallow..." style="height: calc(100vh - 234px); white-space: nowrap; resize: none;"></textarea>
                  </div>
                </tab>
    
              </tab-system>
    
            </div>
          </dialog-list>
    
        </div>
      </tab>
    
      <tab label="Messages" icon="book image">
      <div style="float: left; width: calc(50% - 12px); padding: 8px;">
      <span class="dbminputlabel">#1</span>
      <input id="E1" class="round" placeholder="Tickets limit" type="text">
    </div>
    <div style="float: right; width: calc(50% - 12px); padding: 8px;">
    <span class="dbminputlabel">#2</span>
    <input id="E2" class="round" placeholder="Ticket created" type="text">
  </div>
    </tab>

      <tab label="Settings" icon="cogs">
        <div style="padding: 8px;">
          <div style="padding-bottom: 12px; float: left; width: calc(30% - 12px);">
          <span class="dbminputlabel">Limit</span><br>
          <select id="limit" class="round">
                <option value="0">1</option>
                <option value="1">Unlimited</option>
          </select>
          <br>
          <span class="dbminputlabel">Ticket-Role ID</span><br>
          <input id="role" class="round" placeholder="Leave blank to  none" type="text">
          <br>
          <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>
          </div>
        </div>
      </tab>
    </tab-system>
    `;
    },
  
    init() {},
  
  
    async action(cache) {
      console.log('ACTION: ticket_manager; [v1.0] (v2.1.8)')
      const data = cache.actions[cache.index];
      const { interaction } = cache
      const { Permissions, MessageEmbed } = require('discord.js')
      const guild = interaction.guild
      const createSettings = {}
      if (data.limit === '0') {
        createSettings.topic = interaction.member.id
        const t = guild.channels.cache.find(c => c.topic === interaction.member.id)
        if (t) return interaction.reply({ content: this.evalMessage(data.E1, cache).replace('[name]', interaction.user.username).replace('[tag]', interaction.user.tag).replace('[id]', interaction.member.id).replace('[ticket]', `<#${t.id}`), ephemeral: true });
      } else if (data.Ttopic) createSettings.topic = this.evalMessage(data.Ttopic, cache)
      if (data.Tparent) createSettings.parent = this.evalMessage(data.Tparent, cache)
      if (data.Tposition) createSettings.position = this.evalMessage(data.Tposition, cache)
      if (data.role) createSettings.permissionOverwrites = [
        {
           id: interaction.member.id,
           allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
           deny: [Permissions.FLAGS.MENTION_EVERYONE]
        }, {
            id: interaction.guild.roles.everyone.id,
            allow: [],
            deny: [Permissions.FLAGS.VIEW_CHANNEL]
        }, {
            id: this.evalMessage(data.role, cache),
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
            deny: []
        }
      ]
      else createSettings.permissionOverwrites = [
        {
           id: interaction.member.id,
           allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
           deny: [Permissions.FLAGS.MENTION_EVERYONE]
        }, {
            id: interaction.guild.roles.everyone.id,
            allow: [],
            deny: [Permissions.FLAGS.VIEW_CHANNEL]
        }
      ]
      let channel
      await guild.channels.create(this.evalMessage(data.Tname, cache), createSettings).then(c => channel = c)

      const messageOptions = {}
      messageOptions.embeds = []
      const embedDatas = data.embeds;
      for (let i = 0; i < embedDatas.length; i++) {
        const embedData = embedDatas[i];
        const embed = new MessageEmbed();

        if (embedData.title) embed.setTitle(this.evalMessage(embedData.title, cache));
        if (embedData.url) embed.setURL(this.evalMessage(embedData.url, cache));
        if (embedData.color) embed.setColor(this.evalMessage(embedData.color, cache));
        if (embedData.timestamp === "true") embed.setTimestamp();
        if (embedData.imageUrl) embed.setImage(this.evalMessage(embedData.imageUrl, cache));
        if (embedData.thumbUrl) embed.setThumbnail(this.evalMessage(embedData.thumbUrl, cache));

        if (embedData.description) embed.setDescription(this.evalMessage(embedData.description, cache));

        if (embedData.fields?.length > 0) {
          const fields = embedData.fields;
          for (let i = 0; i < fields.length; i++) {
            const f = fields[i];
            embed.addField(this.evalMessage(f.name, cache), this.evalMessage(f.value, cache), f.inline === "true");
          }
        }

        if (embedData.author) {
          embed.setAuthor({
            name: this.evalMessage(embedData.author, cache),
            iconURL: embedData.authorIcon ? this.evalMessage(embedData.authorIcon, cache) : null,
            url: embedData.authorUrl ? this.evalMessage(embedData.authorUrl, cache) : null,
          });
        }

        if (embedData.footerText) {
          embed.setFooter({
            text: this.evalMessage(embedData.footerText, cache),
            iconURL: embedData.footerIconUrl ? this.evalMessage(embedData.footerIconUrl, cache) : null,
          });
        }

        messageOptions.embeds.push(embed);
      }
      const send = this.evalMessage(data.E2, cache).replace('[name]', interaction.user.username).replace('[tag]', interaction.user.tag).replace('[id]', interaction.member.id).replace('[ticket]', `<#${channel.id}>`)
      interaction.reply({ content: send, ephemeral: true })
      channel.send(messageOptions)
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(channel, storage, varName, cache);
      this.callNextAction(cache)
    },
    
    mod() {},
  }