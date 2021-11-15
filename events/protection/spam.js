module.exports = async message => {
    const usersMap = new Map();
    const LIMIT = 5;
    const TIME = 10000;
    const DIFF = 5000;
    
    let spamrole = message.guild.roles.cache.find(r => r.name === 'spam');
    if(message.author.bot) return;
    
    if(!spamrole) {
        spamrole = await message.guild.roles.create({
            data: {
                name: 'spam',
                color: '#437b81',
                permissions: []
            }
        });
        
        message.guild.channels.cache.forEach(async channel => {
            await channel.updateOverwrite(spamrole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                CONNECT: false
            });
        });
    }
    
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, TIME);
            usersMap.set(message.author.id, userData)
        } else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                message.reply('Spam: Vous avez envoyé trop de message en peut de temps !');
                message.member.roles.add(spamrole);
                message.channel.bulkDelete(LIMIT);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    } else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        });
    }
};