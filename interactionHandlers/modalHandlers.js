const { sendEmbed } = require('../tools/sendingTools');
const { searchAndImportFunctions } = require('../tools/others');
const path = require('path');

const modalHandlers = searchAndImportFunctions(path.join(__dirname, '..', 'interactionHandling', 'modalHandling'));

async function handleModalSubmit(interaction) {
  const handler = modalHandlers[interaction.customId];

  if (handler) {
    try {
      await handler(interaction);
    } catch (error) {
      console.error(`Error handling '${interaction.customId}' modal:`, error.message);
    }
  } else {
    await sendEmbed(interaction, { title: 'Unknown Modal Interaction', description: `Looks like the \`${interaction.customId}\` interaction doesn't have function attached to it.` }, true);
  }
}

module.exports = { handleModalSubmit };