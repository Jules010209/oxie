const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args) => {
        if(message.member.hasPermission('MANAGE_GUILD')) {
            if(!args[0]) return message.reply('Veuillez indiquer du texte');
            
            message.delete();

            message.channel.send(message.content.trim().slice(`${config.prefix}say`.length));
        }
    },
    name: 'say',
    help: {
        description: 'Cette commande permet de faire parler le bot.',
        syntax: '<message>'
    }
}