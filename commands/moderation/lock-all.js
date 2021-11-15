const Discord = require('discord.js');
const config = require('../../config.json');
const emojis = require('../../emojis.json');

module.exports = {
    run: async(message, args) => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            const role = message.guild.roles.everyone;

            if(!args.length) return message.reply("Spécifiez <true ou false> !");

            const query = args[0].toLowerCase();
            if(!['true', 'false'].includes(query)) return message.reply("L'option que vous avez choisi n'est pas valide !");
            
            const perms = role.permissions.toArray();
            if(query === 'false') {
                perms.push('SEND_MESSAGES');
                await role.edit({ permissions: perms });
                message.reply(`${emojis.unlock} Serveur dévérouillé !`);
            } else {
                const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES');
                await role.edit({ permissions: newPerms });
                message.reply(`${emojis.lock} Serveur vérouillé !`);
            }
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'lock-all',
    help: {
        description: 'Permet de blocker tous les channels du serveur.',
        syntax: 'true / false'
    }
}