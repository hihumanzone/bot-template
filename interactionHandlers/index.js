const { handleCommandInteraction } = require('./commandHandlers');
const { handleButtonInteraction } = require('./buttonHandlers');
const { handleModalSubmit } = require('./modalHandlers');
const { handleSelectMenuInteraction } = require('./selectMenuHandlers');

module.exports = {
  handleCommandInteraction,
  handleButtonInteraction,
  handleModalSubmit,
  handleSelectMenuInteraction,
};