const axios = require("axios").default;

module.exports = {
    data: {
        name: "test",
    },
    async execute(interaction, client) {
      await interaction.reply({
        content: "Hi",
      })
    }
}