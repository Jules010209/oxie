const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args, client, db) => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            db.query(`SELECT * FROM oxie_servers WHERE guildId = ${message.guild.id}`, async(err, req) => {
                if(err) throw err;
                
                try {
                    let prefix = args[0];
                    if(!prefix) return message.reply('Veuillez mettre un prefix à modifier !');
        
                    db.query(`UPDATE oxie_servers SET prefix = '${prefix}' WHERE guildId = ${message.guild.id}`);
        
                    message.reply(`Vous avez modifier le prefix, le prefix est maintenant **${prefix}**`);
                } catch(err) {
                    message.reply('Veuillez mettre un prefix à modifier !');
                }
            });
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'prefix',
    help: {
        syntax: '<prefix>',
        description: 'Permet de changer de prefix pour le serveur'
    }
}