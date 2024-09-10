const { sendEmbed } = require('../../tools/sendingTools');
const { addButton } = require('../../tools/addInteractions');

async function handleUserInfoCom(interaction) {
  const user = interaction.targetUser;
  const userInfo = `- **Username**: \`${user.username}\`
- **Display Name**: \`${user.displayName}\`
- **Bot**: \`${user.bot}\``;
  let msg = await sendEmbed(interaction, { title: 'User Info', description: userInfo, imageUrl: user.displayAvatarURL() });
}

module.exports = { handleUserInfoCom };