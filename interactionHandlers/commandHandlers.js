const { sendEmbed } = require('../tools/sendingTools');

const { handleCommand1 } = require('../interactionHandling/commandHandling');

const commandHandlers = {
  command1: handleCommand1,
  command2: handleCommand2,
};

async function handleCommand2(interaction) {
  // Handle the command2 interaction
}

async function handleCommandInteraction(interaction) {
  const handler = commandHandlers[interaction.commandName];

  if (handler) {
    try {
      await handler(interaction);
    } catch (error) {
      console.error(`Error handling '${interaction.commandName}' command:`, error.message);
    }
  } else {
    await sendEmbed(interaction, { title: 'Unknown Command Interaction', description: `Looks like the \`${interaction.customId}\` interaction doesn't have function attached to it.` }, true);
  }
}

module.exports = { handleCommandInteraction };