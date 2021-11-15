const Discord = require('discord.js');
const config = require('../../config.json');
const emojis = require('../../emojis.json');
const fs = require('fs');

module.exports = {
    run: async(message, args, client) => {
        if(Object.values(client.db.tickets).some(ticket => ticket.author === message.author.id)) return message.reply(`${emojis.no} Vous avez déjà un ticket d'ouvert !`);
        const channel = await message.guild.channels.create(`ticket ${message.author.username}`, {
            type: 'text',
            // parent:
            permissionOverwrites: [{
                id: message.guild.id,
                deny: 'VIEW_CHANNEL'
            }, {
                id: message.author.id,
                allow: 'VIEW_CHANNEL'
            }]
        });
        client.db.tickets[channel.id] = {
            author: message.author.id
        }
        fs.writeFileSync('../../db.json', JSON.stringify(client.db));
        channel.send(`${message.guild.roles.everyone}`);
        channel.send(new Discord.MessageEmbed().setDescription(`Bonjour, ${message.member}, un staff haut gradé va venir vous aider dans votre ticket ! ${emojis.embeds.yes}`));
        message.member.send(`Votre ticket ${channel} a été crée ! ${emojis.yes}`);
    },
    name: 'ticket',
    help: {
        description: 'Permet d\'ouvrir un ticket',
    }
}