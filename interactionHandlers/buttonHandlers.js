const { sendEmbed } = require('../tools/sendingTools');

const { handleDeleteButton, handleSendButton, handleListButton } = require('../interactionHandling/buttonHandling');
const { getFull } = require('../tools/LargeResponseDm');

const buttonHandlers = {
  delete_message: handleDeleteButton,
  get_full: getFull,
  // You can add more..
  send_message: handleSendButton,
  list_message: handleListButton
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