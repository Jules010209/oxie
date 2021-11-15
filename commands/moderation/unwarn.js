const Discord = require('discord.js');
const config = require('../../config.json');
const fs = require('fs');

module.exports = {
    run: async(message, args, client) => {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            const member = message.mentions.members.first();
            if(!member) return message.reply('Veuillez mentionner le membre à unwarn.');
            if(!client.db.warns[member.id]) return message.reply("Ce membre n\'a aucun warn.");
            const warnIndex = parseInt(args[1], 10) - 1;
            if(warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.reply('Ce warn n\'existe pas !');
            const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0];
            if(!client.db.warns[member.id]) delete client.db.warns[member.id];
            fs.writeFileSync('./db.json', JSON.stringify(client.db));
            message.channel.send(`${member} a été unwarn pour ${reason} !`);
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'unwarn',
    help: {
        description: 'Cette commande permet d\'enlever un warn a un membre.',
        syntax: '<@membre> [nombre du warn]'
    }
}