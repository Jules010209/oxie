const Discord = require('discord.js');
const config = require('../../config.json');
const emojis = require('../../emojis.json');

module.exports = {
    run: async(message, args, client) => {
        if(message.member.hasPermission('MANAGE_CHANNELS')) {
            const role = message.channel.guild.roles.everyone;

            message.delete();

            await message.channel.updateOverwrite(role, { SEND_MESSAGES: false }).then(() => {
                message.channel.send(`${emojis.lock} Le salon à été blocké par ${message.author}`);
            });
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'lock',
    help: {
        description: 'Permet de blocker l\'ecriture dans le channel'
    }
}