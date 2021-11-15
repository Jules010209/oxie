const Discord = require('discord.js');
const figlet = require('util').promisify(require('figlet'));

module.exports = {
    run: async(message, args) => {
        const text = args.slice(0).join(' ');

        if(!text) return message.reply('Veuillez mettre un texte !');
        
        message.channel.send(await figlet(text));
    },
    name: 'style',
    help: {
        description: 'Permet de faire un style de text !'
    }
}