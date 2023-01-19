const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the queue"),
    async execute(interaction, client) {
        const { guild, channel, member } = interaction;

        const queue = client.distube.getQueue(channel);
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) return interaction.reply({ content: "You must be in a voice channel to use this command!", ephemeral: true });

        if(!member.voice.channelId === guild.members.me.voice.channelId) return interaction.reply({ content: "You must be in the same voice channel as me to use this command!", ephemeral: true });
        if(!queue) return interaction.reply({ content: "There is nothing playing!", ephemeral: true });

        if (queue.paused) {
            queue.resume()
            interaction.reply({ content: 'Resumed the song for you!' })
        } else {
            interaction.reply({ content: 'The song is not paused!', ephemeral: true })
        }
    }
}