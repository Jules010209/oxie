const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        if(message.member.hasPermission('MANAGE_CHANNELS')) {
            if(!message.channel.parentID) {
                message.channel.clone({ position: message.channel.rawPosition }).then((ch) => {
                    ch.send(`Channel recrée ! ${message.author}`);
                });
            } else {
                message.channel.clone({ parent: message.channel.parentID, position: message.channel.rawPosition }).then((ch) => {
                    ch.send(`Channel recrée ! ${message.author}`);
                });
            }
            message.channel.delete();
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'renew',
    help: {
        description: 'Permet de recréer le channel'
    }
}