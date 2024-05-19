module.exports = {
  name: 'Generate Random Hex Color',
  section: 'Other Stuff',
  meta: {
    version: '3.2.4',
    preciseCheck: false,
    author: 'DBM Mods',
    authorUrl: 'https://github.com/dbm-network/mods',
    downloadURL: 'https://github.com/dbm-network/mods/blob/master/actions/generate_random_hex_MOD.js',
  },

  subtitle() {
    return 'Generates random hex color code';
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Color Code'];
  },

  fields: ['storage', 'varName'],

  html() {
    return `
    <div>
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
    </div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const type = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);

    const code = '000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
    this.storeValue(`#${code}`, type, varName, cache);
    this.callNextAction(cache);
  },
  mod() {},
};
