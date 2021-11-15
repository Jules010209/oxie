const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args) => {
        let question = args.join(' ');
        
        if(!question) return message.reply('Ecrivez votre question !');

        let responses = [
            'Oui',
            'Non',
            'Jamais',
            'Peut-être',
            'Je ne sais pas'
        ];

        let reponse = responses[Math.floor(Math.random() * responses.length)];
        let embed = new Discord.MessageEmbed()
            .setAuthor('8ball', 'https://cdn.discordapp.com/attachments/869183405328314368/869626780452016148/5a1cae20ec3c43.9057264615118290249676.png')
            .setColor('#0a0a0a')
            .setColor('RANDOM')
            .setDescription(`Question - **${question}**\nReponse - **${reponse}**`);
        message.channel.send(embed);
    },
    name: '8ball',
    aliases: ['ball'],
    help: {
        description: 'Poser vos question.',
        syntax: '<question>'
    }
}