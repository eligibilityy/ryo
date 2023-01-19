const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, VoiceChannel, GuildEmoji } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song!")
        .addStringOption(option => 
            option.setName("query")
                .setDescription("Provide a song title or URL!")
                .setRequired(true)),
    async execute(interaction, client) {
        const { guild, channel, member, options } = interaction;

        const query = options.getString("query");
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) return interaction.reply({ content: "You must be in a voice channel to use this command!", ephemeral: true });

        if(!member.voice.channelId === guild.members.me.voice.channelId) return interaction.reply({ content: "You must be in the same voice channel as me to use this command!", ephemeral: true });

        client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
        interaction.reply({ content: '＼(￣▽￣)／!!' })
    }
}