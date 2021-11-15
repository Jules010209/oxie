const Discord = require('discord.js');
const ms = require('ms');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            let muterole = message.guild.roles.cache.find(r => r.name === 'muted');
            let mention = message.mentions.members.first() || message.member.id;
            let args = message.content.split(' ');
            const reason = args.slice(3).join(' ');
            
            if(mention.id === message.guild.ownerID) {
                message.reply('Vous ne pouvez pas tempmute le propriétaire du serveur.');
            } else {
                if(message.member.roles.highest.comparePositionTo(mention.roles.highest) < 1 && message.author.id !== message.guild.ownerID) {
                    message.channel.send('Vous ne pouvez pas tempmute ce membre.');
                } else {
                    if(!muterole) {
                        muterole = await message.guild.roles.create({
                            data: {
                                name: 'muted',
                                color: '#808080',
                                permissions: []
                            }
                        });
                        
                        message.guild.channels.cache.forEach(async (channel, id) => {
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
                        if(!args[2]) {
                            message.reply("Veuillez mettre un temps !");
                        } else {
                            message.channel.send(`<@${mention.id}> à été mute ${args[2]} pour ` + "`" + reason + "`");
                            setTimeout(function() {
                                mention.roles.remove(muterole);
                                message.channel.send(`<@${mention.id}> peux désormais reparler !`);
                            }, ms(args[2]));
                            mention.roles.add(muterole);
                        }
                    }
                }
            }
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'tempmute',
    help: {
        description: 'Mute quelle qu\'un pendant le temps défini.',
        syntax: '<@membre> <temps> <raison>'
    }
}