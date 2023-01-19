/**
 * @main File responsible for registering everything I guess
 * @author Liya
 * @version 1.0.0
 */

require("dotenv").config();

const {
  Client,
  Collection,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const chalk = require("chalk");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.distube = new DisTube(client, {
  searchSongs: 5,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: true,
  emitAddListWhenCreatingQueue: false,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: true,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
  ],
});

client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];

/**
 * @description Gets handlers from functions folder
 * @type {String[]}
 */

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

// call me a professional docs reader

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filters.names.join(", ") || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

client.distube
  .on("playSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("🎸 | Now Playing!")
          .setDescription(
            `[${song.name}](${song.url}) - \`${song.formattedDuration}\``
          )
          .setThumbnail(song.thumbnail)
          .setFooter({
            text: `Requested by ${song.user.tag}`,
            iconURL: song.user.avatarURL(),
          })
          .setColor("Blue")
          .setTimestamp(),
      ],
    })
  )
  .on("addSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("🎸 | Added to queue!")
          .setDescription(
            `[${song.name}](${song.url}) - \`${song.formattedDuration}\``
          )
          .setThumbnail(song.thumbnail)
          .setFooter({
            text: `Requested by ${song.user.tag}`,
            iconURL: song.user.avatarURL(),
          })
          .setColor("Blue")
          .setTimestamp(),
      ],
    })
  )
  .on("addList", (queue, playlist) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("🎸 | Added to queue!")
          .setDescription(
            `[${playlist.name}](${playlist.url}) - \`${playlist.songs.length} songs\``
          )
          .setThumbnail(playlist.thumbnail)
          .setFooter({
            text: `Requested by ${playlist.user.tag}`,
            iconURL: playlist.user.avatarURL(),
          })
          .setColor("Blue")
          .setTimestamp(),
      ],
    })
  )
  .on("error", (channel, e) => {
    if (channel)
      channel.send(
        `⚠ Something happened: ${e
          .toString()
          .slice(0, 1900)}... \n\nPlease check console for more info.`
      );
    else console.error(e);
  })
  .on("searchNoResult", (message, query) =>
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("🔎 | Whoops!")
          .setDescription(`No results found for \`${query}\`!`)
          .setColor("Blue")
          .setTimestamp(),
      ],
    })
  );

// app.get("/", (req, res) => res.send("Hello World!"));
// app.listen(port, () =>
//   console.log(chalk.blueBright(`[SERVER] Listening on port ${port}!`))
// )

client.login(process.env.TOKEN).then(() => {
  client.handleEvents();
  client.handleCommand();
  client.handleComponents();
})
