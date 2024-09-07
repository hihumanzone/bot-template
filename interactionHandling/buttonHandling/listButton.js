const { sendEmbed } = require('../../tools/sendingTools');
const { addStringMenu, addButton } = require('../../tools/addInteractions');


const options = [
  {
    label: 'hey',
    value: 'Hey!',
    description: 'A friendly greeting',
    emoji: '👋',
  },
  {
    label: 'hi',
    value: 'Hi!',
    description: 'A casual greeting',
    emoji: '😊',
  },
  {
    label: 'hello',
    value: 'Hello!',
    description: 'A formal greeting',
    emoji: '🙋',
  }
];

const menu = {
  id: 'message_menu',
  placeholder: 'Choose your message wisely...',
  options: options
};

async function handleListButton(interaction) {
  let msg = await sendEmbed(interaction, { title: 'Messages List', description: 'Choose your message:' });
  msg = await addStringMenu(msg, menu);
  msg = await addButton(msg, { id: 'delete_message', label: 'Delete', emoji: '🗑️' });
}

module.exports = { handleListButton };