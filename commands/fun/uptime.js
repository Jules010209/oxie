const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args, client) => {
        var days = Math.floor((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString();
        var hours = Math.floor((client.uptime / (1000 * 60 * 60)) % 60).toString();
        var minutes = Math.floor((client.uptime / (1000 * 60)) % 60).toString();
        var seconds = Math.floor((client.uptime / 1000) % 60).toString();

        const embed = new Discord.MessageEmbed()
            .setTitle('Uptime')
            .setDescription(`Allumé depuis ${days}j ${hours}h ${minutes}m ${seconds}s`);
        message.channel.send(embed);
    },
    name: 'uptime',
    help: {
        description: 'Permet de voir depuis quand le bot est allumé.'
    }
}