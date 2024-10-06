const { sendEmbed, sendErrorDM } = require('../../tools/sendingTools');
const { saneUserCheck } = require('../../tools/checks');

async function handleDeleteButton(interaction) {
  if (saneUserCheck(interaction)) {
    try {
      await interaction.deferUpdate();
      await interaction.message.delete();
    } catch (error) {
      const errorMsg = `Error deleting message: ${error.message}`;
      console.error(errorMsg);
      await sendErrorDM(interaction, errorMsg);
    }
  } else {
    await sendEmbed(interaction, { title: 'Not Permitted', description: 'You do not have permission to delete this message.' }, true);
  }
}

module.exports = { delete_message: handleDeleteButton };