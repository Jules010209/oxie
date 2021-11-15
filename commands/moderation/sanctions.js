const Discord = require('discord.js');
const config = require('../../config.json');
const moment = require('moment');

moment.locale('fr');

module.exports = {
    run: async(message, args, client) => {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            const member = message.mentions.members.first();
            if (!member) return message.reply('Veuillez mentionner le membre dont voir les warns.');
            if (!client.db.warns[member.id]) return message.reply('Ce membre n\'a aucun warn.');
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('Sanctions')
            .setDescription(`**Total de warns :** ${client.db.warns[member.id].length}\n\n__**10 derniers warns**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`));
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'sanctions',
    help: {
        description: 'Cette commande permet de voir le nombre de warn d\'un membre.',
        syntax: '<@membre>'
    }
}