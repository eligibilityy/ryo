const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Hello World"),
  async execute(interaction, client) {
    const message = await interaction.channel.send("Pinging...");

    const clientPing = client.ws.ping;
    const ApiLatency = message.createdTimestamp - interaction.createdTimestamp;
    const clientPingEmoji =
      clientPing < 100 ? "🟢" : clientPing < 200 ? "🟡" : "🔴";
    const ApiLatencyEmoji =
      ApiLatency < 100 ? "🟢" : ApiLatency < 200 ? "🟡" : "🔴";

    const embed = new EmbedBuilder()
      .setTitle("🎸 Ping")
      .addFields(
        {
          name: "Client",
          value: `\`${clientPing}ms ${clientPingEmoji}\``,
          inline: true,
        },
        {
          name: "API Latency",
          value: `\`${ApiLatency}ms ${ApiLatencyEmoji}\``,
          inline: true,
        }
      )
      .setColor("Blue")
      .setTimestamp();

    // delete "Pinging..." message then send embed
    message.delete();
    interaction.reply({ embeds: [embed] });
  },
};
