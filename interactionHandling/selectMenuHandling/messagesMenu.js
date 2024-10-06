const { sendEmbed } = require('../../tools/sendingTools');
const { addButton } = require('../../tools/addInteractions');

async function handeMessagesMenu(interaction) {
  const selectedMsg = interaction.values[0];
  let msg = await sendEmbed(interaction, { title: 'Selected Message', description: selectedMsg });
  msg = await addButton(msg, { id: 'delete_message', label: 'Delete', emoji: '🗑️' });
}

module.exports = { message_menu: handeMessagesMenu };