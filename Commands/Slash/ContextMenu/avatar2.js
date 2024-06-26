const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle, Formatters } = require('discord.js');
module.exports = {
  name: "User Avatar",
  description: "",
  usage: "",
  category: "",
  userPerms: [""],
  botPerms: [""],
  cooldown: 5,
  guildOnly: false,
  ownerOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
  type: 3,
  run: async (client, interaction) => {
    try {
      const msg = interaction.targetMessage;
      const user = msg.author;
      let embed = client.Embed()   
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setAuthor({name: `• ${user.username}'s Avatar`, url: "https://dsc.gg/iron-web10", iconURL: client.embed.authoricon})
            .setDescription(`*Click the button below to download!*`)
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true, format: "png" })); 
      const row = new ActionRowBuilder()
        .addComponents([
          new ButtonBuilder() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "png"})) .setLabel("PNG") .setEmoji(`955381268583940106`) .setStyle(5),
          new ButtonBuilder() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "jpg"})) .setLabel("JPG") .setEmoji(`955381268583940106`) .setStyle(5),
          new ButtonBuilder() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "webp"})) .setLabel("WEBP") .setEmoji(`955381268583940106`) .setStyle(5),
          new ButtonBuilder() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "gif"})) .setLabel("GIF") .setEmoji(`955381268583940106`) .setStyle(5)
        ])
      interaction.reply({ embeds: [embed], components: [row], ephemeral: true});
    } catch (error) {
      client.slash_err(client, interaction, error);
    }
  }
};

