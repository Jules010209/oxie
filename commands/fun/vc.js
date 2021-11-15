const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        let membres = message.guild.memberCount;
        let onlines = message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size;
        let boosts = message.guild.premiumSubscriptionCount;
        let vocal = message.guild.voiceStates.cache.size;
        let mute = message.guild.voiceStates.cache.filter(m => m.mute).size;
        let streaming = message.guild.voiceStates.cache.filter(m => m.streaming).size;
        let icon = message.guild.iconURL({ dynamic: true });
        
        const embed = new Discord.MessageEmbed()
            .setColor('#F8FCFC')
            .setTitle(`${message.guild.name} Stats`)
            .setThumbnail(icon)
            .setDescription(`*Membres :* **${membres}** \n *En ligne :* **${onlines}** \n *En vocal :* **${vocal}** \n *En stream :* **${streaming}** \n *Mute :* **${mute}** \n *Boost :* **${boosts}**`)
        message.channel.send(embed);
    },
    name: 'vc',
    help: {
        description: 'Permet de voir les stats du serveur'
    }
}