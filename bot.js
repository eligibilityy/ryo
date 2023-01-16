/**
 * @main File responsible for registering everything I guess
 * @author Liya
 * @version 1.0.0
 */

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const logs = require('discord-logs');

// env
const { config } = require('dotenv');
config();

// handlers
const { HandleCommand } = require('./Handlers/Command.js');
const { HandleEvent } = require('./Handlers/Event.js');

const client = new Client({
    intents: [Object.values(GatewayIntentBits)],
    partials: [Object.values(Partials)],
})

logs(client, {
    debug: true
})

client.commands = new Collection();

client.login(process.env.TOKEN).then(() => {
    HandleCommand(client);
    HandleEvent(client);
})

module.exports = client;
