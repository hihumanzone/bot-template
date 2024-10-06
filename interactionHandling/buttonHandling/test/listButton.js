const { sendEmbed } = require('../../tools/sendingTools');
const { addStringMenu, addButton } = require('../../tools/addInteractions');

const menuOptions = [
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
  menuOptions: menuOptions
};

async function handleListButton(interaction) {
  let msg = await sendEmbed(interaction, { title: 'Messages List', description: 'Choose your message:' });
  msg = await addStringMenu(msg, menu, interaction);
  msg = await addButton(msg, { id: 'delete_message', label: 'Delete', emoji: '🗑️' }, interaction);
}

module.exports = { list_message: handleListButton };