const { ActivityType } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setPresence({
      activities: [
        { name: `kessoku band practice`, type: ActivityType.Listening },
      ],
      status: "dnd",
    });

    console.log(`[CLIENT] 🤖 ${chalk.yellowBright("Ready!")}`);
    console.log(
      `[CLIENT] 🤖 ${chalk.yellowBright(`Logged in as ${client.user.tag}`)}`
    );
  },
};
