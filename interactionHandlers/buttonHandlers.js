const { sendEmbed } = require('../tools/sendingTools');
const { getFull } = require('../tools/LargeResponseDm');
const { searchAndImportFunctions } = require('../tools/others');
const path = require('path');

const buttonHandlers = {
  get_full: getFull,
  ...(searchAndImportFunctions(path.join(__dirname, '..', 'interactionHandling', 'buttonHandling')))
};

async function handleButtonInteraction(interaction) {
  const handler = buttonHandlers[interaction.customId];

  if (handler) {
    try {
      await handler(interaction);
    } catch (error) {
      console.error(`Error handling '${interaction.customId}' button:`, error.message);
    }
  } else {
    await sendEmbed(interaction, { title: 'Unknown Button Interaction', description: `Looks like the \`${interaction.customId}\` interaction doesn't have function attached to it.` }, true);
  }
}

module.exports = { handleButtonInteraction };