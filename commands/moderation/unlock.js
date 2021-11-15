const Discord = require('discord.js');
const config = require('../../config.json');
const emojis = require('../../emojis.json');

module.exports = {
    run: async(message, args, client) => {
        if(message.member.hasPermission('MANAGE_CHANNELS')) {
            const role = message.channel.guild.roles.everyone;

            message.delete();

            await message.channel.updateOverwrite(role, { SEND_MESSAGES: true }).then(() => {
                message.channel.send(`${emojis.unlock} Le salon à été déblocké par ${message.author}`);
            });
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'unlock',
    help: {
        description: 'Permet de déblocker l\'ecriture dans le channel'
    }
}