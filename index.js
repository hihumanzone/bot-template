// <=====[ Import Statments ]=====>

require('dotenv').config();
const { ACTIVITIES, switch_activity_sec, bot_status } = require('./config')
const { Client, GatewayIntentBits, InteractionType, Events } = require('discord.js');
const { registerCommands, handleCommandInteraction } = require('./interactionHandlers/commands');
const { convertJsonToTable } = require('./tools/getTable');
const { handleTextMessage } = require('./message');
const {
  handleButtonInteraction,
  handleModalSubmit,
  handleSelectMenuInteraction,
} = require('./interactionHandlers');

// <=====[ Initialising Client ]=====>

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

// <=====[ Handling ]=====>

client.once('ready', async () => {
  console.log(convertJsonToTable({ 'Status': ['Name', 'ID'], 'Logged In!': [client.user.tag, client.user.id]}));
  registerCommands(client);
  startActivityUpdates(client);
});

function startActivityUpdates(client) {
  updateActivity(client);
  client.user.setStatus(bot_status);
  setInterval(() => updateActivity(client), switch_activity_sec*1000);
}
function updateActivity(client) {
  const activity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
  client.user.setActivity(activity.name, { type: activity.type, url: activity.url });
}

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isCommand() || interaction.isUserContextMenuCommand()) {
      await handleCommandInteraction(interaction);
    } else if (interaction.isButton()) {
      await handleButtonInteraction(interaction);
    } else if (interaction.isModalSubmit()) {
      await handleModalSubmit(interaction);
    } else if (interaction.isStringSelectMenu()) {
      await handleSelectMenuInteraction(interaction);
    }
  } catch (error) {
    console.error('Error handling interaction:', error.message);
  }
});

client.on(Events.MessageCreate, (message) => {
  try {
    if (message.author.bot) return;
  
    if (message.mentions.users.has(client.user.id)) {
      handleTextMessage(message);
    }
  } catch (error) {
    console.error(`Error handling message:`, error);
  }
});

client.login(process.env.DISCORD_TOKEN);