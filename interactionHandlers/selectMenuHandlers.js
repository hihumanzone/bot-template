const { sendEmbed } = require('../tools/sendingTools');
const { searchAndImportFunctions } = require('../tools/others');
const path = require('path');

const selectMenuHandlers = searchAndImportFunctions(path.join(__dirname, '..', 'interactionHandling', 'selectMenuHandling'));

async function handleSelectMenuInteraction(interaction) {
  const handler = selectMenuHandlers[interaction.customId];

  if (handler) {
    try {
      await handler(interaction);
    } catch (error) {
      console.error(`Error handling '${interaction.customId}' select menu:`, error.message);
    }
  } else {
    await sendEmbed(interaction, { title: 'Unknown Select Menu Interaction', description: `Looks like the \`${interaction.customId}\` interaction doesn't have function attached to it.` }, true);
  }
}

module.exports = { handleSelectMenuInteraction };