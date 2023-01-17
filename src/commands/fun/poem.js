const axios = require("axios").default;
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poem")
    .setDescription("Get the poem of the day from poemhunter.com"),
  async execute(interaction, client) {
    // make a var that takes a random number between 1 and 30 (might increase soon)
    const randomInt = Math.floor(Math.random() * 30) + 1;
    const url = `https://poetrydb.org/random,linecount/1;${randomInt}`;

    const message = await interaction.channel.send('Getting your poem!');
    
    const response = await axios.get(url);
    const poem = response.data[0];

    const title = poem.title;
    const author = poem.author;
    const lines = poem.lines.join("\n");

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Requested by ${interaction.user.username}#${interaction.user.discriminator}`,
        iconURL: interaction.user.avatarURL(),
      })
      .setTitle(`Random Poem`)
      .setDescription(`> ***${author} - ${title}*** \n\n*${lines}*`)
      .setColor("Random")
      .setTimestamp()
      .setFooter({
        text: "poetrydb.org"
      });

    const btn = new ButtonBuilder()
      .setCustomId("test")
      .setLabel("Get another poem (Not yet implemented)")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(btn);

    message.delete()
    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
