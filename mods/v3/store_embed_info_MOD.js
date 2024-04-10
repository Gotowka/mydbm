module.exports = {
  name: 'Store Embed Info',
  section: 'Embed Message',
  meta: {
    version: '3.2.3',
    preciseCheck: false,
    author: 'DBM Mods',
    authorUrl: 'https://github.com/dbm-network/mods',
    downloadURL: 'https://github.com/Gotowka/mydbm/blob/main/mods/v3/store_embed_info_MOD.js',
  },

  subtitle(data) {
    return (
      [
        'Object',
        'Title',
        'Description',
        'Author Name',
        'Author Icon URL',
        'Thumbnail URL',
        'Footer Text',
        'Footer Icon URL',
        'Image',
        'Color',
        'Fields',
      ][parseInt(data.info, 10)] || 'Unknown'
    );
  },

  fields: ['message', 'varName2', 'info', 'storage', 'varName'],

  html() {
    return `
<div>
  <message-input dropdownLabel="Source Message" selectId="message" variableContainerId="varNameContainer2" variableInputId="varName2"></message-input>
</div>
<br><br><br>

<div>
	<div style="padding-top: 8px; width: 70%;">
    <span class="dbminputlabel">Source Info</span><br>
		<select id="info" class="round">
			<option value="0" selected>Object</option>
			<option value="1">Title</option>
			<option value="2">Description</option>
			<option value="3">Author Name</option>
			<option value="4">Author Icon URL</option>
			<option value="5">Thumbnail URL</option>
			<option value="6">Footer Text</option>
      <option value="7">Footer Icon URL</option>
      <option value="8">Image</option>
			<option value="9">Color</option>
			<option value="10">Fields</option>
		</select>
	</div>
</div>
<br>

<div>
  <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
</div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const varName2 = data.varName2;
    const info = parseInt(data.info, 10);
    let embed;

    if (parseInt(data.message) === 0) embed = cache.msg.embeds[0].data;
    else embed = this.getVariable(parseInt(data.message, 10), varName2, cache)?.embeds[0]?.data;

    if (!embed) {
      return this.callNextAction(cache);
    }

    let result;
    switch (info) {
      case 0:
        result = embed;
        break;
      case 1:
        result = embed.title;
        break;
      case 2:
        result = embed.description;
        break;
      case 3:
        result = embed.author?.name;
        break;
      case 4:
        result = embed.author?.iconURL;
        break;
      case 5:
        result = embed.thumbnail?.url;
        break;
      case 6:
        result = embed.footer?.text;
        break;
      case 7:
        result = embed.footer?.iconURL;
        break;
      case 8:
        result = embed.image?.url;
        break;
      case 9:
        result = embed.color;
        break;
      case 10:
        result = embed.fields;
        break;
      default:
        break;
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
