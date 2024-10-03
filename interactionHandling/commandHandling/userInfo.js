const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { sendEmbed } = require('../../tools/sendingTools');
const { convertJsonToTable } = require('../../tools/getTable');
const { addButton } = require('../../tools/addInteractions');
const { makeUserInstallable } = require('../../tools/others');

const comUserInfo = new ContextMenuCommandBuilder()
	.setName('User Information')
	.setType(ApplicationCommandType.User);

async function handleUserInfoCom(interaction) {
  const user = interaction.targetUser;
  const userInfo = {
    'Thing': ['Name', 'Display', 'Bot', 'Created', 'ID'],
    'Info': [user.username, user.displayName, user.bot, user.createdAt.toDateString(), user.id]
  }
  let msg = await sendEmbed(interaction, { title: 'USER INFO (⁠｡⁠•̀⁠ᴗ⁠-⁠)⁠✧', description: '```ansi\n' + convertJsonToTable(userInfo) + '\n```', imageUrl: user.avatarURL({ dynamic: true, size: 1024 }) });
}

module.exports = { handleUserInfoCom, comUserInfo: makeUserInstallable(comUserInfo) };