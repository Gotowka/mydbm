module.exports = {
  name: 'InviteLogger JOIN',
  isEvent: true,

  fields: ['Member (Temp Variable Name):', 'Invite (Temp Variable Name):'],

  mod (DBM) {
    DBM.Events = DBM.Events || {}
    const { Actions, Bot } = DBM
    const { writeFileSync } = require('fs-extra')
    DBM.Events.loggerJoin = async function (member) {
      if (!Bot.$evts['InviteLogger JOIN']) return;
      const guild = member.guild
      for (const event of Bot.$evts["InviteLogger JOIN"]) {
        try {
          const log = require('../data/logger.json')
          const inv = require('../data/invites.json')
          const newInvites = await member.guild.invites.fetch()
          const invites = Actions.getInvites();
          const oldInvites = invites.get(guild.id);
          let invite
          if (oldInvites.size == 0) invite = newInvites.at(0);
          else invite = await newInvites.find(i => i.uses > oldInvites.get(i.code))
          if (!log[member.id]) {
            log[member.id] = []
            log[member.id].push({
              code: invite.code,
              inviter: invite.inviter.id,
            })
              
            if (!inv[invite.code]) {
              inv[invite.code] = []
              inv[invite.code].push({
                code: invite.code,
                owner: invite.inviter.id,
                joins: '1',
                leaves: '0',
                middle: '1'
              })
            } else {
                const count = parseInt(inv[invite.code][0].joins) + 1
                inv[invite.code][0].owner = invite.inviter.id
                inv[invite.code][0].middle = count - parseInt(inv[invite.code][0].leaves)
                inv[invite.code][0].joins = count
            }
          } else {
            log[member.id][0].code = invite.code
            log[member.id][0].inviter = invite.inviter.id
            if (!inv[invite.code]) {
              inv[invite.code] = []
              inv[invite.code].push({
                code: invite.code,
                owner: invite.inviter.id,
                joins: '1',
                leaves: '0',
                middle: '1'
              })
            } else {
                const count = parseInt(inv[invite.code][0].joins) + 1
                inv[invite.code][0].owner = invite.inviter.id
                inv[invite.code][0].middle = count - parseInt(inv[invite.code][0].leaves)
                inv[invite.code][0].joins = count
              }
          }
          writeFileSync('./data/logger.json', JSON.stringify(log))
          writeFileSync('./data/invites.json', JSON.stringify(inv));

          const temp = {}
          if (event.temp) temp[event.temp] = member
          if (event.temp2) temp[event.temp2] = invite.code
          await Actions.invokeEvent(event, guild, temp)
        } catch(er) {
          console.log(er)
        }
      }
    }
    const onReady = Bot.onReady
    Bot.onReady = async function (...params) {
      const client = Bot.bot
      await client.guilds.cache.forEach(async (guild) => {
        try {
          Actions.loadLogger()
          await Actions.loadInvites(guild)
        }  catch(er) {
          console.log(er)
        }
      })
      Bot.bot.on('guildMemberAdd', DBM.Events.loggerJoin)
      onReady.apply(this, ...params)
    }
  }
}