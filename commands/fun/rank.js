const Discord = require('discord.js');
const canvacord = require('canvacord');
const config = require('../../config.json');

module.exports = {
    run: async (message, args, client, db) => {
        let user = message.mentions.users.first() || message.author;
        
        db.query(`SELECT * FROM oxie_users WHERE userID = ${user.id}`, async(err, req) => {
            if(err) throw err;

            if(req.length < 1) return message.reply('Cette personne n\'est pas enregistrée !');

            const calculXp = async(xp, Level) => {
                let xptotal = 0;

                for(let i = 0; i < (parseInt(Level) + 1); i++) {
                    xptotal = xptotal + (1 * 1000);
                }

                xptotal = xptotal + parseInt(xp);

                return xptotal;
            }
            
            db.query(`SELECT * FROM oxie_users`, async(err, all) => {
                if(err) throw err;

                const leaderboard = all.sort((a, b) => calculXp(b.xp, b.level) - calculXp(a.xp, a.level));
                const rank = leaderboard.findIndex(u => u.userID === user.id) + 1;

                const card = new canvacord.Rank()
                    .setAvatar(user.avatarURL({ dynamic: true }))
                    .setCurrentXP(parseInt(req[0].xp))
                    .setRequiredXP((parseInt(req[0].level) + 1) * 1000)
                    .setLevel(parseInt(req[0].level))
                    .setRank(rank)
                    .setStatus('dnd')
                    .setProgressBar('#7C83FF', 'COLOR')
                    .setUsername(user.username)
                    .setDiscriminator(user.discriminator)
                card.build().then(data => {
                    const attachment = new Discord.MessageAttachment(data, 'rank.png');

                    message.channel.send(attachment);
                });
            });
        });
    },
    name: 'rank',
    help: {
        description: 'Permet de voir le rank d\'un utilisateur.',
        syntax: '<@member>'
    }
}