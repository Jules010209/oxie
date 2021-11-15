const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        if(message.member.hasPermission("MANAGE_CHANNELS")) {
            let args = message.content.split(' ');

            message.delete();

            if(args[1] == undefined) {
                message.reply('Nombre de message non ou mal défini !');
            } else {
                let number = parseInt(args[1]);
                
                if(isNaN(number)) {
                    message.reply('Nombre de message non ou mal défini !');
                } else {
                    message.channel.bulkDelete(number).catch(async err => { 
                        console.log(err);

                        if(err) return message.reply('Les messages datent de plus de 14 jours !');
                    });
                }
            }
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'clear',
    help: {
        description: 'Permet de clear un channel, il sufit d\'indiquer le nombre de message à supprimer',
        syntax: '<nombre de message>'
    }
}