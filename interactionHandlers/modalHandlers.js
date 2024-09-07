const { sendEmbed } = require('../tools/sendingTools');

const { handleInputModal } = require('../interactionHandling/modalHandling');

async function handleModal2(interaction) {
  // Handle the modal2 interaction
}

const modalHandlers = {
  inputModal: handleInputModal,
  modal2: handleModal2,
};

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