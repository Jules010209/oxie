const { Client, Collection } = require('discord.js');
const client = new Client({ disableMentions: 'everyone' });
const { readdirSync } = require('fs');
const config = require('./config.json');

require('discord-buttons')(client);

client.commands = new Collection();
client.snipes = new Collection();
client.db = require('./db.json');
client.database = require('./database.js');

const eventsListener = (dir = './events') => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for(const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`);
            const eventName = event.split('.')[0];
            
            client.on(eventName, evt.bind(null, client));
        }
    });
}

const loadCommand = (dir = './commands') => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for(const command of commands) {
            const cmd = require(`${dir}/${dirs}/${command}`);
            
            client.commands.set(cmd.name, cmd);
        }
    });
}

eventsListener();
loadCommand();

client.login(config.token);