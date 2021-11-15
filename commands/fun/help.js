const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: (message, args, client, db) => {
        db.query(`SELECT * FROM oxie_servers WHERE guildId = ${message.guild.id}`, async(err, req) => {
            if(err) throw err;
            
            if(args[0]) {
                const command = client.commands.get(args[0].toLowerCase());

                if(!command || !command.help) return message.channel.send('Cette commande n\'existe pas !');
                var helpembedb = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(`**Commande : ${command.name}**\n\n${command.help.description}\n\nSyntaxe : \`${req[0].prefix}${command.name}${command.help.syntax ? ` ${command.help.syntax}` : ''}\``)
                    .setAuthor(`${command.name}`, config.favicon);
                message.channel.send(helpembedb);
            } else {
                var helpembeda = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle("Commandes :")
                    .setDescription(`${client.commands.filter(command => command.help).map(command => `\`${req[0].prefix}${command.name}\`\n`).join(' ')}\n\nPour plus d'imformations sur une commande, tapez \`${req[0].prefix}help [nom de la commande]\``)
                    .setAuthor('Help', config.favicon);
                message.channel.send(helpembeda);
            }
        });
    },
    name: 'help',
    help: {
        description: 'Cette commande permet d\'avoir de l\'aide.',
        syntax: '[nom de la commande]'
    }
}