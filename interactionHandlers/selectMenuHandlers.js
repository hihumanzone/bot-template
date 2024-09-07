const { sendEmbed } = require('../tools/sendingTools');

const { handeMessagesMenu } = require('../interactionHandling/selectMenuHandling');

async function handleMenu2(interaction) {
  // Handle the menu2 interaction
}

const selectMenuHandlers = {
  message_menu: handeMessagesMenu,
  menu2: handleMenu2,
};

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