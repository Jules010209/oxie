const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            let muterole = message.guild.roles.cache.find(r => r.name === 'muted');
            let mention = message.mentions.members.first() || message.member.id;

            if(!muterole) {
                muterole = await message.guild.roles.create({
                    data: {
                        name: 'muted',
                        color: '#808080',
                        permissions: []
                    }
                });
                
                message.guild.channels.cache.forEach(async channel => {
                    await channel.updateOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        CONNECT: false
                    });
                });
            }
            
            if(mention == undefined) {
                message.reply("Membre non ou mal mentionné !");
            } else {
                mention.roles.add(muterole);
                message.channel.send(`${mention} à été mute !`);
            }
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'mute',
    help: {
        description: 'Mute une personne sur le serveur.',
        syntax: '<@membre>'
    }
}