const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { sendEmbed } = require('../../tools/sendingTools');
const { addButton } = require('../../tools/addInteractions');
const { makeUserInstallable } = require('../../tools/others');

function trimToMaxLength(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
}

const comMsgInfo = new ContextMenuCommandBuilder()
	.setName('Message Information')
	.setType(ApplicationCommandType.Message);

async function handleMsgInfoCom(interaction) {
  const message = interaction.targetMessage;

  const MAX_LENGTH = 1500;

  const trimmedContent = trimToMaxLength(message.content, MAX_LENGTH);

  let msgInfo = `- **Author Username**: \`${message.author.username}\`
- **Author Display Name**: \`${message.member?.displayName || message.author.username}\`
- **Author = Bot**: \`${message.author.bot}\`

- **Message ID**: \`${message.id}\`
- **Timestamp**: \`${message.createdAt}\``;

  if (trimmedContent.length > 0) {
    msgInfo += `\n> Content: \n\`\`\`\n${trimmedContent.replace(/\`\`\`/g, '')}\n\`\`\``
  }
  if (message.embeds.length > 0) {
    const trimmedEmbedDescription = trimToMaxLength(message.embeds[0].description || '', MAX_LENGTH);
    if (trimmedEmbedDescription.length > 0) {
      msgInfo += `\n> Embed Description: \n\`\`\`\n${trimmedEmbedDescription.replace(/\`\`\`/g, '')}\n\`\`\``;
    }
  }

  let interactionMetadata = `\n\n- **Has Interaction**: \`${message.interactionMetadata ? true : false}\``;

  if (message.interactionMetadata) {
    interactionMetadata += `\n- **Interaction User Username**: \`${message.interactionMetadata.user.username}\`
- **Interaction User Display Name**: \`${message.interactionMetadata.user.displayName}\``;
  }

  msgInfo += interactionMetadata;

  let msg = await sendEmbed(interaction, { title: 'Message Info', description: msgInfo });
}

module.exports = { handleMsgInfoCom, comMsgInfo: makeUserInstallable(comMsgInfo) };