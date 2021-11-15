// const Discord = require('discord.js');
// const { stripIndents } = require('common-tags');
// const fetch = require('node-fetch');

// module.exports = {
//     run: async(message, args, client) => {
//         const name = args.join(' ');

//         if(!name) return message.reply('Veuillez mettre un nom d\'utilisateur !').then(m => m.delete(5000));

//         const url = `https://instagram.com/${name}/?__a=1`;
//         let res;

//         try {
//             res = await fetch(url).then(url => url.json());
//         } catch(err) {
//             console.log(err);
//         }

//         if(!res.graphql.user.username) return message.reply('> Je n\'est pas trouvé cet utilisateur !').then(m => m.delete(5000));

//         const compte = res.graphql.user;

//         const embed = new Discord.MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle(compte.full_name)
//             .setURL(compte.external_url_linkshimmed)
//             .setThumbnail(compte.profile_pic_url_hd)
//             .addField('Information du profil', stripIndents`**- Username :** ${compte.username} 
//             **- Nom complet :** ${compte.full_name}
//             **- Description :** ${compte.biography.length == 0 ? "Aucune description" : compte.biography}
//             **- Posts :** ${compte.edge_owner_to_timeline_media.count}
//             **- Abonnés :** ${compte.edge_followed_by.count}
//             **- Est abonné :** ${compte.edge_follow.count}
//             **- Compte privé :** ${compte.is_private ? 'Oui 🔒' : 'Non 🔓'}`);
//         message.channel.send(embed);
//     },
//     name: 'instagram',
//     help: {
//         description: 'Permet de voir les infos d\'un compte instagram.',
//         syntax: '<@member>'
//     }
// }