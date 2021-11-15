const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args, client, db) => {
        const msg = await message.channel.send(`🏓 Pinging....`);

        const startTimeDB = Date.now();

        db.query(`SELECT * FROM oxie_servers WHERE guildId = ${message.guild.id}`, async(err, req) => {
            const endTimeDB = Date.now();
            
            const embed = new Discord.MessageEmbed()
                .setTitle('🏓 Pong !')
                .setDescription(`Latence du bot **${Math.floor(msg.createdAt - message.createdAt)}**ms \n Latence de l'api **${client.ws.ping}**ms \n Latance de la base de donnée **${endTimeDB - startTimeDB}**ms`)
            msg.edit(embed);
        });
    },
    name: 'ping',
    help: {
        description: 'Permet de voir la latance'
    }
}