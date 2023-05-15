module.exports = {
  name: 'InviteLogger LEAVE',
  isEvent: true,

  fields: ['Member (Temp Variable Name):', 'Invite (Temp Variable Name):'],

  mod (DBM) {
    const { Actions, Bot } = DBM
    const { writeFileSync } = require('fs-extra')
    DBM.Events.loggerLeave = async function (member) {
      if (!Bot.$evts['InviteLogger LEAVE']) return;
      const guild = member.guild
      for (const event of Bot.$evts["InviteLogger LEAVE"]) {
          const log = require('../data/logger.json')
          const inv = require('../data/invites.json')
          if (!log[member.id]) return console.log(`Can't found member ${member.username} in database!`);
          inv[log[member.id][0].code][0].leaves = parseInt(inv[log[member.id][0].code][0].leaves) + 1
          if (inv[log[member.id][0].code].joins !== '0') inv[log[member.id][0].code][0].middle = parseInt(inv[log[member.id][0].code][0].joins) - parseInt(inv[log[member.id][0].code][0].leaves)
            writeFileSync('./data/invites.json', JSON.stringify(inv));
          const temp = {}
          const invm = require('../data/invites.json')
          const logg = invm[log[member.id][0].code]
          if (event.temp) temp[event.temp] = member
          if (event.temp2) temp[event.temp2] = logg[0].code
          await Actions.invokeEvent(event, guild, temp)
      }
    }
    const onReady = Bot.onReady
    Bot.onReady = function (...params) {
      Bot.bot.on('guildMemberRemove', DBM.Events.loggerLeave)
      onReady.apply(this, ...params)
    }
  }
}