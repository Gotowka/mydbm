module.exports = {
    name: 'Member Voice Channel Move',
    isEvent: true,
  
    fields: ['Oldchannel (Temp Variable Name):', 'Newchannel (Temp Variable Name):'],
  
    mod(DBM) {
      DBM.Events = DBM.Events || {};
      const { Bot, Actions } = DBM;
  
      DBM.Events.memberMoved = function memberMoved(oldM, newM) {
        if (!Bot.$evts['Member Voice Channel Move']) return;
            if (!oldM.voice) return;
            if (!newM.voice) return;
            if (oldM.voice.channel.id === newM.voice.channel.id) return;
            else {
            for (const event of Bot.$evts['Member Voice Channel Move']) {
                const temp = {};
                if (event.temp) temp[event.temp] = oldM.voice.channel;
                if (event.temp2) temp[event.temp2] = newM.voice.channel;
                temp['member'] = newM
          
                Actions.invokeEvent(event, server, temp);
            }
        }
      };
  
      const { onReady } = Bot;
      Bot.onReady = function memberMovedOnReady(...params) {
        Bot.bot.on('guildMemberUpdate', DBM.Events.memberMoved);
        onReady.apply(this, ...params);
      };
    },
  };
