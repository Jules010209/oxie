module.exports = async(client, button) => {
    switch(button.id) {
        case '1':
            button.channel.send('Oui').then((b) => b.delete({ timeout: 1e5 }));
        break;
        case '2':
            button.channel.send('Non').then((b) => b.delete({ timeout: 1e5 }));
        break;
    }
    await button.defer();
};