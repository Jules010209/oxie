module.exports = (client, message) => {
    client.snipes.set(message.channel.id, message);
};