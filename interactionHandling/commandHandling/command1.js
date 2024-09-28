const { sendEmbed } = require('../../tools/sendingTools');
const { addButton } = require('../../tools/addInteractions');

async function handleCommand1(interaction) {
  const message = interaction.options.getString('message');
  let msg = await sendEmbed(interaction, { title: 'Your Message', description: message }, true);
  msg = await addButton(msg, { id: 'delete_message', label: 'Delete', emoji: '🗑️' }, interaction);
  msg = await addButton(msg, { id: 'send_message', label: 'Send', emoji: '📟' }, interaction);
  msg = await addButton(msg, { id: 'list_message', label: 'List', emoji: '📃' }, interaction);
}

module.exports = { handleCommand1 };