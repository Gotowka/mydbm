module.exports = {
    name: 'Bot Join Server (2)',
    isEvent: true,
  
    fields: ['Server (Temp Variable Name):'],
  
    mod(DBM) {
        DBM.Events = DBM.Events || {};
        const { Actions, Bot } = DBM;
        DBM.Events.botJoinServer = function botJoinServer(guild) {
          if (!Bot.$evts['Bot Join Server (2)']) return;
    
          for (const event of Bot.$evts['Bot Join Server (2)']) {
            const temp = {};
            if (event.temp) temp[event.temp] = guild;
            Actions.invokeEvent(event, guild, temp);
          }
        };

        const { onReady } = Bot;
        Bot.onReady = function botJoinServerOnReady(...params) {
          Bot.bot.on('guildCreate', DBM.Events.botJoinServer);
          onReady.apply(this, ...params);
        };
    },
}