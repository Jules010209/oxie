const Discord = require('discord.js');
const config = require('../../config.json');
const fs = require('fs');

module.exports = {
    run: async(message, args, client) => {
        const channel = message.mentions.channels.first() || message.channel;
        if (!client.db.tickets[channel.id]) return message.channel.send('Ce salon n\'est pas un ticket !');
        if(!message.member.hasPermission('MANAGE_MESSAGES') && client.db.tickets[channel.id].author !== message.author.id) return message.channel.send('Vous n\'avez aps la permission de femrer ce ticket !');
        delete client.db.tickets[channel.id];
        fs.writeFileSync('../../db.js' , JSON.stringify(client.db));
        await message.member.send(`Le ticket ${channel.name} a étè fermé !`);
        channel.delete();
    },
    name: 'close',
    help: {
        description: 'Permet de fermé un ticket'
    }
}