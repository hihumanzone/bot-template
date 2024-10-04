const { SlashCommandBuilder } = require('discord.js');
const { sendEmbed } = require('../../tools/sendingTools');
const { addButton } = require('../../tools/addInteractions');
const { makeUserInstallable } = require('../../tools/others');

const com1 = new SlashCommandBuilder()
  .setName('command1')
  .setDescription('Replies with the provided message')
  .addStringOption(option => 
    option
      .setName('message')
      .setDescription('The message to send')
      .setRequired(true)
  );

async function handleCommand1(interaction) {
  const message = interaction.options.getString('message');
  const latency = Date.now() - interaction.createdTimestamp;
  let msg = await sendEmbed(interaction, { title: `Latency - ${latency}ms`, description: message }, true);
  msg = await addButton(msg, { id: 'delete_message', label: 'Delete', emoji: '🗑️' }, interaction);
  msg = await addButton(msg, { id: 'send_message', label: 'Send', emoji: '📟' }, interaction);
  msg = await addButton(msg, { id: 'list_message', label: 'List', emoji: '📃' }, interaction);
}

module.exports = { handleCommand1, com1 };