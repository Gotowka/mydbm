module.exports = {
    name: 'Bot Leave Server (2)',
    isEvent: true,
  
    fields: ['Server (Temp Variable Name):'],
  
    mod(DBM) {
        DBM.Events = DBM.Events || {};
        const { Actions, Bot } = DBM;
        DBM.Events.botLeaveServer = function botLeaveServer(guild) {
          if (!Bot.$evts['Bot Leave Server (2)']) return;
    
          for (const event of Bot.$evts['Bot Leave Server (2)']) {
            const temp = {};
            if (event.temp) temp[event.temp] = guild;
            Actions.invokeEvent(event, guild, temp);
          }
        };

        const { onReady } = Bot;
        Bot.onReady = function botLeaveServerOnReady(...params) {
          Bot.bot.on('guildDelete', DBM.Events.botLeaveServer);
          onReady.apply(this, ...params);
        };
    },
}