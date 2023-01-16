const { Client, ActivityType } = require('discord.js');
const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setPresence({
            activities: [{ name: `kessoku band`, type: ActivityType.Listening }],
            status: 'dnd',
        });

        console.log(chalk.green(`[READY] Logged in as ${chalk.white(client.user.tag)}!`));
    }
}