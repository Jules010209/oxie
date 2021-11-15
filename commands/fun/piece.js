const Discord = require('discord.js');

module.exports = {
    run: async message => {
        let pieces = ['Pile', 'Face'];
        let piece = pieces[Math.floor(Math.random() * pieces.length)];
        
        const embed = new Discord.MessageEmbed().setTitle(piece).setThumbnail('https://cdn.discordapp.com/attachments/873245611015696445/878016301887545394/monney.png').setColor('RANDOM').setTimestamp();
        
        message.channel.send(embed);
    },
    name: 'piece',
    help: {
        description: 'Pile ou face ?'
    }
}