const { sendEmbed } = require('../../tools/sendingTools');
const { addButton } = require('../../tools/addInteractions');

async function handleCommand1(interaction) {
  const message = interaction.options.getString('message');
  let msg = await sendEmbed(interaction, { title: 'Your Message', description: message });
  msg = await addButton(msg, { id: 'delete_message', label: 'Delete', emoji: '🗑️' });
  msg = await addButton(msg, { id: 'send_message', label: 'Send', emoji: '📟' });
  msg = await addButton(msg, { id: 'list_message', label: 'List', emoji: '📃' });
}

module.exports = { handleCommand1 };