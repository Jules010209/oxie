const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        if(message.member.hasPermission("MANAGE_CHANNELS")) {
            let mention = message.mentions.members.first() || message.member.id;
            
            if(mention == undefined) {
                message.reply("Membre non ou mal mentionné !");
            } else {
                if(mention.kickable) {
                    mention.kick();
                    var embed = new Discord.MessageEmbed()
                        .setColor("#0099ff")
                        .setTitle(mention.displayName + " a été kick avec succés !")
                        .setAuthor("Kick", config.favicon)
                        .setTimestamp();
                    message.channel.send(embed);
                } else {
                    message.reply("Impossible de kick ce membre !");
                }
            }
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'kick',
    help: {
        description: 'Commande pour kick un utilisateur.',
        syntax: '<@membre>'
    }
}