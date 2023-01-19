const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Dynamic help command"),
    async execute(interaction, client) {

        const helpEmbed = new EmbedBuilder()
            .setTitle("Help")
            .setDescription("Here is a list of all my commands!")
            .setColor("Blue")
            .setFooter({
                text: `Requested by ${interaction.user.username}#${interaction.user.discriminator}`,
                iconURL: interaction.user.avatarURL(),
            })
            .setTimestamp();

        const commands = client.commands;
        commands.forEach((command) => {
            helpEmbed.addFields(
                {
                    name: `/${command.data.name}`,
                    value: `\`${command.data.description}\``,
                    inline: true,
                }
            );
        });

        await interaction.reply({ embeds: [helpEmbed] }); 
    }
}