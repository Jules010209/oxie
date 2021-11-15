const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args, client) => {
        let snipe = client.snipes.get(message.channel.id);
        
        if(!snipe) return message.channel.send('Il n\'y a pas de message à snipe !');
        
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${snipe.author.username}`, snipe.author.displayAvatarURL({ dynamic: true }))
            .setColor('RANDOM')
            .setDescription(snipe.content)
            .setTimestamp();
        message.channel.send(embed);
    },
    name: 'snipe',
    help: {
        description: 'Permet de voir le dernier message supprimé !'
    }
}