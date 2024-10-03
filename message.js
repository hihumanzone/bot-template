const { sendEmbed } = require('./tools/sendingTools');
const { addButton } = require('./tools/addInteractions');
const { textDmSendButton } = require('./tools/LargeResponseDm');

async function handleTextMessage(message) {
  let msg = await sendEmbed(message, { title: 'Your Message', description: `You mentioned me! Here’s your message: "${message.content}"` });
  msg = await addButton(msg, { id: 'delete_message', label: 'Delete', emoji: '🗑️' });
  msg = await addButton(msg, { id: 'send_message', label: 'Send', emoji: '📟' });
  msg = await addButton(msg, { id: 'list_message', label: 'List', emoji: '📃' });
  await textDmSendButton(msg, 'Hey, this is a test.');
}

module.exports = { handleTextMessage };
