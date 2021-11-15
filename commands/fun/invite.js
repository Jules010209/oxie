const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        message.delete();

        const bot = new MessageButton().setStyle('url').setLabel('Invite Bot').setURL('https://discord.com/api/oauth2/authorize?client_id=874299824508370944&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2F8f8N4PVT55&scope=bot');
        const support = new MessageButton().setStyle('url').setLabel('Invite Support').setURL('https://discord.gg/8f8N4PVT55');
        
        const embed = new Discord.MessageEmbed()
            .setColor('GRAY')
            .setAuthor('Embed d\'invitation de Oxie', config.favicon)
            .setDescription('> Lien d\'invitation du bot' + '\n' + '> Lien d\'invitation du serveur support');
            
        message.channel.send(embed, { buttons: [bot, support] });
    },
    name: 'invite',
    help: {
        description: 'Permet d\'avoir le lien d\'invitation du bot'
    }
}