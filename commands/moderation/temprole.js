const Discord = require('discord.js');
const config = require('../../config.json');
const ms = require('ms');

module.exports = {
    run: async(message, args) => {
        let mention = message.mentions.members.first();
        
        if(mention === message.guild.owner) return message.delete();

        if(message.member.hasPermission('BAN_MEMBERS')) {
            if(mention) {
                const time = args[1];

                if(time) {
                    const roleId = args[2];

                    const role = message.guild.roles.cache.find((r) => {
                        return r.id === roleId;
                    });

                    if(role) {
                        message.channel.send(`> Le role ${role} à été ajouté à ${mention} pendant ${time} !`);

                        setTimeout(function() {
                            mention.roles.remove(role);
                        }, ms(time));

                        mention.roles.add(role);
                    } else {
                        message.reply('Veuillez donner l\'id du role !');
                    }
                } else {
                    message.reply('Veuillez entrer le temps !');
                }
            } else {
                message.reply('Veuillez mentionner un utilisateur !');
            }
        }
    },
    name: 'temprole',
    help: {
        description: 'Permet de mettre un role pendant un temps précisé !',
        syntax: '<@member> [10s] <role id>'
    }
}