const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        const subReddits = ['dankmemes', 'meme', 'memes', 'me_irl', 'crappydesign'];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        
        const img = await randomPuppy(random);
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setImage(img)
            .setTitle(`Viens de /r/${random}`)
            .setURL(`https://www.reddit.com/r/${random}`);
        message.channel.send(embed);
    },
    name: 'meme',
    help: {
        description: 'Met des images marentes.',
    }
}