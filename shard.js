const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const manager = new ShardingManager('./index.js', { token: config.token });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Lancement du shard : ${shard.id + 1}`));