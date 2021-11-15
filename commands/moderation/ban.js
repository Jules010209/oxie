const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            let mention = message.mentions.members.first() || message.member.id;
            
            if(mention == undefined) {
                message.reply("Membre non ou mal mentionné !");
            } else {
                if(mention.bannable){
                    mention.ban();
                    var embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(mention.displayName + " a été banni avec succés !")
                        .setAuthor("Ban", config.favicon)
                        .setTimestamp();
                    message.channel.send(embed);
                } else {
                    message.reply('Vous ne pouvez pas ban cet utilisateur !');
                }
            }
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'ban',
    help: {
        description: 'Commande qui permet de ban des utilisateurs.',
        syntax: '<@membre>'
    }
}