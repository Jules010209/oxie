module.exports = (client, message) => {
    if(message.type !== 'DEFAULT' || message.author.bot) return;
    
    const db = client.database;

    if(message.author.bot) return;
    if(message.channel.type === 'DM') return;

    db.query(`SELECT * FROM oxie_servers WHERE guildId = ${message.guild.id}`, async(err, req) => {

        if(err) throw err;

        if(req.length < 1) {
            let sql = `INSERT INTO oxie_servers (guildId, prefix) VALUES (${message.guild.id}, 'o!')`;
            
            db.query(sql, function (err) {
                if(err) throw err;
            });
        }

        try {
            let prefix = req[0].prefix;
            
            const args = message.content.trim().split(/ +/g);
            const commandName = args.shift().toLowerCase();
            if(!commandName.startsWith(prefix)) return;
            const command = client.commands.get(commandName.slice(prefix.length));
            if(!command) return;
            command.run(message, args, client, db);
        } catch(err) {
            message.reply(err);
        }
    });

    // Xp System
    db.query(`SELECT * FROM oxie_users WHERE userID = ${message.author.id}`, async(err, req) => {
        if(err) throw err;
        
        if(req.length < 1) {
            let sql = `INSERT INTO oxie_users (userID, xp, level, guildId) VALUES (${message.author.id}, '0', '0', ${message.guild.id})`;

            db.query(sql, function(err) {
                if(err) throw err;
            });
        } else {
            db.query(`SELECT * FROM oxie_servers WHERE guildId = ${message.guild.id}`, async(err, guilds) => {
                if(err) throw err;

                let prefix = guilds[0].prefix;

                if(!message.content.startsWith(prefix)) {
                    let XpVelocity = 10;

                    let xp = Math.floor(Math.random() * XpVelocity) + 1;
                    let need = (parseInt(req[0].level) + 1) * 1000;
    
                    db.query(`UPDATE oxie_users SET xp = '${parseInt(req[0].xp) + xp}' WHERE userID = ${message.author.id}`);
                    
                    if(parseInt(req[0].xp) >= need) {
                        db.query(`UPDATE oxie_users SET level = '${parseInt(req[0].level) + 1}' WHERE userID = ${message.author.id}`);
                        db.query(`UPDATE oxie_users SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`);
                        
                        message.channel.send(`Bravo ${message.author}, vous êtes passé niveau \`${parseInt(req[0].level) + 1}\``);
                    }
    
                    if(parseInt(req[0].xp) < 0) {
                        db.query(`UPDATE oxie_users SET level = '${parseInt(req[0].level) - 1}' WHERE userID = ${message.author.id}`);
                        db.query(`UPDATE oxie_users SET xp = '${(parseInt(req[0].level) * 1000) + parseInt(req[0].xp)}' WHERE userID = ${message.author.id}`);
                    }
                }
            });
        }
    });
    
    db.query(`SELECT * FROM oxie_servers WHERE guildId = ${message.guild.id}`, async (err, req) => {
        
        if(err) throw err;

        try {
            if(!message.mentions.has(message.guild.roles.everyone)) {
                if(message.mentions.has(client.user)) {
                    message.channel.send(`Mon prefix est **${req[0].prefix}**`);
                } else return;
            } else return;
        } catch(err) {
            message.reply(err);
        }
    });
};