const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        let mention = message.mentions.members.first();
        let channel = mention.voice.channel;

        if(message.member.hasPermission('MANAGE_CHANNELS')) {
            if(channel) {
                if(mention) {
                    message.channel.send(`${mention} est dans ${channel} !`);
                } else {
                    message.reply('Veuillez mentionner l\'utilisateur !');
                }
            } else {
                message.reply('Cet utilisateur n\'est pas dans un channel vocal !');
            }
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'find',
    help: {
        description: 'Permet de chercher quelqu\'un dans un vocal',
        syntax: '<@member>'
    }
}