const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const fs = require("fs");
const chalk = require("chalk");

module.exports = (client) => {
  /**
   * @description Slash command handler
   * 1. Loop through the commands folder
   * 2. Loop through the commands in the folder
   * 3. Require the command file
   * 4. Set the command to the commands collection
   * 5. Push the command to the command array
   * 6. Log the command name
   * */

  client.handleCommand = async () => {
    const commandFolders = fs.readdirSync("./src/commands");

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);

        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());

        console.log(
          `[COMMAND] ${chalk.green("✓")} ${chalk.white(command.data.name.charAt(0).toUpperCase() + command.data.name.slice(1))}`
        );
      }
    }

    const clientId = process.env.CLIENT_ID;
    const guildId = process.env.GUILD_ID;
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

    // literally right out of docs LMFAO
    try {
      console.log(
        chalk.gray(`[COMMAND] Reloading application (/) commands...`)
      );

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log(
        chalk.green(`[COMMAND] Successfully reloaded application (/) commands!`)
      );
    } catch (error) {
      console.error(error);
    }
  };
};
