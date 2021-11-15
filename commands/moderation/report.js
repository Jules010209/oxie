const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args) => {
        message.channel.send(config.maintenance);
        /**
        let owner = message.guild.owner;
        let author = message.author;
        let description = args.slice(0).join(' ');

        if(!description) {
            message.reply('Veuillez mettre un description !');
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle(`**Report** | *${message.guild.name}*`)
                .setDescription(`< **${description}** >`)
                .setFooter(`${author.tag}`)
                .setTimestamp();
            owner.send(embed);
            message.author.send(`Votre report à bien été envoyé à l'owner ${owner}`);
        }
        **/
    },
    name: 'report',
    help: {
        description: 'Permet de report un bug à l\'owner du serveur !',
        syntax: '(message)'
    }
}