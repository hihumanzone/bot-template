const { sendEmbed, editEmbed } = require('../../tools/sendingTools');
const { addButton } = require('../../tools/addInteractions');

async function handleInputModal(interaction) {
  const titleInput = interaction.fields.getTextInputValue('titleInput') || 'Response';
  const textInput = interaction.fields.getTextInputValue('textInput');
  interaction.deferUpdate();
  // let msg = await sendEmbed(interaction, { title: titleInput, description: textInput });
  // msg = await addButton(msg, { id: 'delete_message', label: 'Delete', emoji: '🗑️' });
  let msg = editEmbed(interaction.message, { title: titleInput, description: textInput }, interaction);
}

module.exports = { handleInputModal };