const { sendEmbed } = require('../../tools/sendingTools');
const { addButton } = require('../../tools/addInteractions');

async function handleUserInfoCom(interaction) {
  const user = interaction.targetUser;
  const userInfo = `- **Username**: \`${user.username}\`
- **Display Name**: \`${user.displayName}\`
- **Bot**: \`${user.bot}\`
- **Account Created On**: \`${user.createdAt.toDateString()}\``;
  let msg = await sendEmbed(interaction, { title: 'User Info', description: userInfo, imageUrl: user.avatarURL({ dynamic: true, size: 1024 }) });
}

module.exports = { handleUserInfoCom };