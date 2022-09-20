module.exports = {
    name: 'InviteLogger JOIN',
    isEvent: true,
  
    fields: ['Member (Temp Variable Name):', 'Invite (Temp Variable Name):'],
  
    mod (DBM) {
      DBM.Events = DBM.Events || {}
      let oldinv
      const { Actions, Bot } = DBM
      const { Collection } = require('discord.js')
      const { writeFileSync } = require('fs-extra')
      const file = require('../data/settings.json')
      DBM.Events.loggerJoin = async function (member) {
        if (file.logger !== 'on') return;
        const guild = member.guild
        for (const event of Bot.$evts["InviteLogger JOIN"]) {
            const log = require('../data/logger.json')
            const inv = require('../data/invites.json')
            const invites = oldinv
              const newInvites = await member.guild.invites.fetch()
              const oldInvites = invites.get(guild.id);
              const invite = await newInvites.find(i => i.uses > oldInvites.get(i.code));
              const inviter = await guild.members.cache.get(invite.inviter.id).user;
              if (!log[member.id]) {
                log[member.id] = []
                log[member.id].push({
                  code: invite.code,
                  inviter: inviter.tag,
                })
                
                if (!inv[invite.code]) {
                  inv[invite.code] = []
                  inv[invite.code].push({
                    code: invite.code,
                    owner: inviter.tag,
                    joins: '1',
                    leaves: '0',
                    middle: '1'
                  })
                } else {
                    const count = parseInt(inv[invite.code][0].joins) + 1
                    inv[invite.code][0].middle = count - parseInt(inv[invite.code][0].leaves)
                  inv[invite.code][0].joins = count
                }
              } else {
                log[member.id][0].code = invite.code
                log[member.id][0].inviter = inviter.tag,
                log[member.id][0].uses = invite.uses
                if (!inv[invite.code]) {
                  inv[invite.code] = []
                  inv[invite.code].push({
                    code: invite.code,
                    owner: inviter.tag,
                    joins: '1',
                    leaves: '0',
                    middle: '1'
                  })
                } else {
                    const count = parseInt(inv[invite.code][0].joins) + 1
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
        }
      }
      const onReady = Bot.onReady
      Bot.onReady = function (...params) {
        const client = Bot.bot
        const xd = new Collection()
        client.guilds.cache.forEach(async (guild) => {
         const firstInvites = await guild.invites.fetch()
         xd.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])))
        })
        oldinv = xd
        Bot.bot.on('guildMemberAdd', DBM.Events.loggerJoin)
        onReady.apply(this, ...params)
      }
    }
  }
  