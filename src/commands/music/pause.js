const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, VoiceChannel, GuildEmoji } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause the queue"),
    async execute(interaction, client) {
        const { guild, channel, member } = interaction;

        const queue = client.distube.getQueue(channel);
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) return interaction.reply({ content: "You must be in a voice channel to use this command!", ephemeral: true });

        if(!member.voice.channelId === guild.members.me.voice.channelId) return interaction.reply({ content: "You must be in the same voice channel as me to use this command!", ephemeral: true });
        if(!queue) return interaction.reply({ content: "There is nothing playing!", ephemeral: true });
        
        queue.pause()
        interaction.reply({ content: 'Paused the song for you!' })
    }
}