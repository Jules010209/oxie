const Discord = require('discord.js');
const config = require('../../config.json');
const axios = require('axios');

module.exports = {
    run: async (message, args, client) => {
        if(message.author.bot) return;
        
        async function getUserBannerUrl(userId, { dynamicFormat = true, defaultFormat = 'webp', size = 512 } = {}) {
            if(![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
                throw new Error(`La taille '${size}' n'est pas prise en charge !`);
            }

            if(!['webp', 'png', 'jpg', 'jpeg'].includes(defaultFormat)) {
                throw new Error(`Le format '${defaultFormat}' n'est pas pris en charge comme format par défaut !`);
            }

            const user = await client.api.users(userId).get();
            if(!user.banner) return null;
        
            const query = `?size=${size}`;
            const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;

            if(dynamicFormat) {
                const { headers } = await axios.head(baseUrl);
                if(headers && headers.hasOwnProperty('content-type')) {
                    return baseUrl + (headers['content-type'] == 'image/gif' ? '.gif' : `.${defaultFormat}`) + query;
                }
            }
            return baseUrl + `.${defaultFormat}` + query;
        }
        
        let mention = message.mentions.members.first() || message.member;

        let descriptionMessage = ['Regarde cette superbe bannière !', 'Humm... Quelle belle bannière', 'Trop belle ta bannière !!!', 'Mais ou tu l\'as trouvé ?!'];
        let dmsg = descriptionMessage[Math.floor(Math.random() * descriptionMessage.length)];

        const bannerUrl = await getUserBannerUrl(mention.id, { size: 4096 });
        
        if(bannerUrl) {
            const loading = await message.channel.send('Je charge la bannière...');
            
            const embed = new Discord.MessageEmbed()
                .setTitle(`${mention.user.username}'s banner`)
                .setDescription(dmsg)
                .setImage(bannerUrl);
            loading.edit(embed);
        } else {
            message.reply('L\'utilisateur mentionné ou vous, n\'avez pas le nitro...');
        }
    },
    name: 'banner',
    help: {
        description: 'Permet de voir la bannier d\'un utilisateur.',
        syntax: '<@member>'
    }
}