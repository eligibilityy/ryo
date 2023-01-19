const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Returns the current music queue.'),
    async execute(interaction, client) {
        const { guild, channel, member } = interaction;

        const queue = client.distube.getQueue(channel);
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) return interaction.reply({ content: "You must be in a voice channel to use this command!", ephemeral: true });

        if(!member.voice.channelId === guild.members.me.voice.channelId) return interaction.reply({ content: "You must be in the same voice channel as me to use this command!", ephemeral: true });
        if(!queue) return interaction.reply({ content: "There is nothing playing!", ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle('🎸 | Queue')
            .setColor('Blue')
            .setTimestamp();

        const songs = queue.songs.map((song, id) => {
            return `${id === 0 ? 'Current' : `#${id + 1}`} - [${song.name}](${song.url}) | ${song.formattedDuration}`;
        });

        embed.setDescription(songs.join('\n'));

        interaction.reply({ embeds: [embed] });
    }
}