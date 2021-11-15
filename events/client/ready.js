const Discord = require('discord.js');
const chalk = require('chalk');
const config = require('../../config.json');

let colors = [
    `${chalk.blue('Connecté !')}`,
    `${chalk.red('Connecté !')}`, 
    `${chalk.black('Connecté !')}`, 
    `${chalk.gray('Connecté !')}`, 
    `${chalk.cyan('Connecté !')}`
];

module.exports = (client) => {
    const statuses = [
        () => `o!𝐡𝐞𝐥𝐩`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`,
    ];
    let i = 0;
    setInterval(() => {
        client.user.setActivity(statuses[i](), { type: 'PLAYING' });
        i = ++i % statuses.length;
    }, 1e4);

    let color = colors[Math.floor(Math.random() * colors.length)];

    console.log(color);
};