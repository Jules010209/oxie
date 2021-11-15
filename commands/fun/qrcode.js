const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args) => {
        message.delete();
        
        if(args[0]) {
            if(args[0].includes('http') || args[0].includes('https')) {
                const qrcode = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${args[0]}`;

                const loading = await message.channel.send('Chargement...');
                
                const embed = new Discord.MessageEmbed().setImage(qrcode);

                loading.edit(embed);
            } else {
                message.reply('Votre url doit inclure ```http``` ou ```https``` !');
            }
        } else {
            message.reply('Veuillez mettre une url !');
        }
    },
    name: 'qrcode',
    help: {
        syntax: '<url>',
        description: 'Permet de generer un qrcode'
    }
}