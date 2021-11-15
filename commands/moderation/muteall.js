const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async (message) => {
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            if(message.author.bot) return;

            const channel = message.member.voice.channel;
                
            if(!channel) return message.reply('Veuillez être dans un channel vocal !'); 
            
            channel.members.forEach(members => {
                if(members.user.bot) return;
                
                try {
                    members.voice.setMute(true);
                } catch(err) {
                    message.channel.send('Il faut que mon role soit en dessus de tous les roles !');
                }
            });
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'muteall',
    help: {
        description: 'Permet de mute tous les utilisateurs dans le channel'
    }
}