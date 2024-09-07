const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { saneUserCheck } = require('../../tools/checks');
const { sendEmbed } = require('../../tools/sendingTools');

async function handleSendButton(interaction) {
  if (!saneUserCheck(interaction)) {
    await sendEmbed(interaction, { title: 'Not Permitted', description: 'You do not have permission to delete this message.' }, true);
  }

  const modal = new ModalBuilder()
    .setCustomId('inputModal')
    .setTitle('Input Some Text')

  const titleInput = new TextInputBuilder()
    .setCustomId('titleInput')
    .setLabel('Title')
    .setStyle(TextInputStyle.Short)
    .setMinLength(1)
    .setMaxLength(100)
    .setRequired(false)
    .setPlaceholder('Enter the title here')
    .setValue('Response')  // Default value if any

  const textInput = new TextInputBuilder()
    .setCustomId('textInput')
    .setLabel('Your Input')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(1)
    .setMaxLength(1000)
    .setRequired(true)
    .setPlaceholder('Enter your text here')
    .setValue('Hey!') // Default value if any

  const actionRow1 = new ActionRowBuilder().addComponents(titleInput);
  const actionRow2 = new ActionRowBuilder().addComponents(textInput);

  modal.addComponents(actionRow1, actionRow2);

  await interaction.showModal(modal);
}

module.exports = { handleSendButton };