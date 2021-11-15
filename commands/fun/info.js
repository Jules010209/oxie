const Discord = require('discord.js');
const moment = require('moment');
const config = require('../../config.json');

module.exports = {
    run: async (message, args) => {
        if(!args.length) {
            const embed = new Discord.MessageEmbed()
                .setDescription(`o!info server : permet d'avoir les info sur le serveur \n o!info user : permet d'avoir des info sur l'user \n o!info role : permet d'avoir des info sur le role`)
                .setColor("RANDOM")
                message.channel.send(embed);
            return;
        }

        const query = args[0].toLowerCase();
        if(!['server', 'user', 'role'].includes(query)) return message.reply('L\'option que vous avez choisi n\'est pas valide !');

        if(query === 'server') {
            const { guild } = message;
            const { name, region, memberCount, owner, afkTimeout } = guild;
            const icon = guild.iconURL({ dynamic: true });

            const embed = new Discord.MessageEmbed()
                .setTitle(`Info de "${name}"`)
                .setThumbnail(icon)
                .setColor("RANDOM")
                .addFields(
                    {
                        name: 'Region',
                        value: region,
                    },
                    {
                        name: 'Membres',
                        value: memberCount,
                    },
                    {
                        name: 'Créateur',
                        value: owner.user.tag,
                    },
                    {
                        name: 'AFK Timeout',
                        value: afkTimeout / 60 + 'm',
                    }
                )
            message.channel.send(embed);
        } else if(query === 'user') {
            const { guild, channel } = message;
        
            const user = message.mentions.users.first() || message.member.user;
            const member = guild.members.cache.get(user.id);

            const userEmbed = new Discord.MessageEmbed()
                .setAuthor(`Information de l'utilisateur ${user.username}`, user.displayAvatarURL())
                .addFields(
                    { 
                        name: 'Tag utilisateur', 
                        value: user.tag,
                    }, 
                    { 
                        name: 'Est un bot', 
                        value: user.bot || 'Non',
                    }, 
                    { 
                        name: 'Nickname', 
                        value: member.nickname || 'Rien',
                    },
                    {
                        name: 'A rejoind discord',
                        value: moment(user.createdTimestamp).format('DD:MM:YYYY'),
                    },
                    { 
                        name: 'A rejoind le serveur', 
                        value: moment(member.joinedTimestamp).format('DD:MM:YYYY'),
                    },
                    {
                        name: 'Nombre de role(s)',
                        value: member.roles.cache.size - 1,
                    }
                )
                .setColor("RANDOM");
            channel.send(userEmbed);
        } else if(query === 'role') {
            const role = message.mentions.roles.first();
            if(!role) return message.reply('Veuillez mentionner le role !');
            message.channel.send(new Discord.MessageEmbed()
                .addField('Rôle', role, true)
                .addField('Membres le possédant', role.members.size, true)
                .addField('Couleur', role.hexColor, true)
                .addField('Date de création', moment(role.createdAt).format('DD:MM:YYYY'))
                .addField('Affiché séparément', role.hoist ? 'Oui' : 'Non', true)
                .addField('Mentionnable', role.mentionable ? 'Oui' : 'Non', true)
                .setFooter(`ID : ${role.id}`)
                .setColor(role.hexColor)
            )
        }
    },
    name: 'info',
    help: {
        description: 'Permet d\'avoir plus d\'information.',
        syntax: 'server / user / role'
    }
}