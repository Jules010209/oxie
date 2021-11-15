const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args) => {
        let mention = message.mentions.members.first();

        if(message.member.permissions.missing) return;

        if(message.member.hasPermission('BAN_MEMBERS')) {
            if(mention) {
                const roleName = args[1];

                const role = message.guild.roles.cache.find((r) => {
                    return r.id === roleName;
                });

                if(role) {
                    mention.roles.add(role);
                    
                    message.channel.send(`> Le role ${role} à été ajouté à ${mention} !`);
                } else {
                    message.reply(`❌ Le role n'existe pas !`);
                    return;
                }
            } else {
                message.reply('❌ Veuillez mentionner un utilisateur !');
            }
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'addrole',
    help: {
        description: 'Permet de give un role a une personne mentionnée.',
        syntax: '<@member> <role id>'
    }
}