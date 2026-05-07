const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

// alreadyDeferred: true cuando el caller ya hizo deferReply antes de llamar a esta función
module.exports = async (client, interaction, title, lb, ephemeral = false, alreadyDeferred = false) => {
  let page = 1;

  if (!alreadyDeferred) {
    await interaction.deferReply({ flags: ephemeral ? [MessageFlags.Ephemeral] : [] });
  }

  let message = await interaction.editReply({ embeds: [generateEmbed(0, lb, title, page)] });

  if (lb.length <= 10) return;

  let button1 = new ButtonBuilder()
    .setCustomId('start')
    .setStyle(2)
    .setEmoji(`991378355473633300`)
    .setDisabled(true);
  let button2 = new ButtonBuilder()
    .setCustomId('back_button')
    .setEmoji('991359218970001428')
    .setStyle(2)
    .setDisabled(true);
  let button3 = new ButtonBuilder()
    .setCustomId('forward_button')
    .setEmoji('991359213819396126')
    .setStyle(2);
  let button4 = new ButtonBuilder()
    .setCustomId('end')
    .setEmoji(`991378371441340506`)
    .setStyle(2);

  let row = new ActionRowBuilder().addComponents(button1, button2, button3, button4);
  message = await interaction.editReply({ embeds: [generateEmbed(0, lb, title, page)], components: [row] });

  let currentIndex = 0;
  const collector = message.createMessageComponentCollector(
    (button) => button.user.id === interaction.user.id,
    { time: 60000 }
  );

  collector.on('collect', async (btn) => {
    if (btn.user.id !== interaction.user.id) return;

    await btn.deferUpdate();

    if (btn.customId === "back_button") { currentIndex -= 10; page--; }
    if (btn.customId === "forward_button") { currentIndex += 10; page++; }
    if (btn.customId === "start") { currentIndex = 0; page = 1; }
    if (btn.customId === "end") { currentIndex = lb.length - lb.length % 10; page = Math.ceil(lb.length / 10); }

    let btn1 = new ButtonBuilder().setCustomId('start').setStyle(2).setEmoji(`991378355473633300`).setDisabled(currentIndex === 0);
    let btn2 = new ButtonBuilder().setCustomId('back_button').setEmoji('991359218970001428').setStyle(2).setDisabled(currentIndex === 0);
    let btn3 = new ButtonBuilder().setCustomId('forward_button').setEmoji('991359213819396126').setStyle(2).setDisabled(currentIndex + 10 >= lb.length);
    let btn4 = new ButtonBuilder().setCustomId('end').setEmoji(`991378371441340506`).setStyle(2).setDisabled(currentIndex + 10 >= lb.length);

    let row2 = new ActionRowBuilder().addComponents(btn1, btn2, btn3, btn4);
    await interaction.editReply({ embeds: [generateEmbed(currentIndex, lb, title, page)], components: [row2] });
  });

  collector.on('end', async () => {
    let btn1Disable = new ButtonBuilder().setCustomId('back_button').setEmoji('991359218970001428').setStyle(2).setDisabled(true);
    let btn2Disable = new ButtonBuilder().setCustomId('forward_button').setEmoji('991359213819396126').setStyle(2).setDisabled(true);
    let rowDisable = new ActionRowBuilder().addComponents(btn1Disable, btn2Disable);
    interaction.editReply({ embeds: [generateEmbed(currentIndex, lb, title, page)], components: [rowDisable] }).catch(() => {});
  });
};

function generateEmbed(start, lb, title, page) {
  const current = lb.slice(start, start + 10);
  return new EmbedBuilder()
    .setColor("#43eaf6")
    .setTitle(`${title}`)
    .setDescription(current.join("\n"))
    .setFooter({ text: `${page} / ${Math.ceil(lb.length / 10)}` });
}
