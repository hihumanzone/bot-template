const { SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType, REST, Routes } = require('discord.js');

const command1 = new SlashCommandBuilder()
  .setName('command1')
  .setDescription('Replies with the provided message')
  .addStringOption(option => 
    option
      .setName('message')
      .setDescription('The message to send')
      .setRequired(true)
  );

/*
Complex command examples:
```js
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

const modelChoices = Object.entries(config.providers)
  .flatMap(([, { models }]) =>
    Object.keys(models).map(model => ({ name: model, value: model }))
  );

const actionChoices = [
  { name: 'Ask', value: 'ask' },
  { name: 'Fix grammar and phrasing errors', value: 'fix_grammar' },
  { name: 'Fix errors and simplify', value: 'simplify' },
  { name: 'Fix code indexing', value: 'fix_indexing' },
  { name: 'Refactor code', value: 'refactor' },
  { name: 'Translate to English', value: 't_english' }
];

const askCommand = new SlashCommandBuilder()
  .setName('ask')
  .setDescription('Ask an AI assistant a question or choose an action.')
  .addStringOption(option =>
    option
    .setName('prompt')
    .setDescription('The question or prompt to ask the assistant.')
    .setRequired(true)
  )
  .addStringOption(option =>
    option
    .setName('action')
    .setDescription('The desired action to perform.')
    .addChoices(...actionChoices)
  )
  .addStringOption(option =>
    option
    .setName('model')
    .setDescription('The model to use.')
    .addChoices(...modelChoices)
  )
  .addBooleanOption(option =>
    option
    .setName('private')
    .setDescription('Should the response be visible only to you?')
  );

const fileTypeChoices = [
  { name: 'URL', value: 'url' },
  { name: 'Attachment', value: 'attachment' }
];

const describeImageCommand = new SlashCommandBuilder()
  .setName('describe_image')
  .setDescription('Get a description of an image from the AI assistant.')
  .addStringOption(option =>
    option
    .setName('file_type')
    .setDescription('Choose between URL or Attachment.')
    .addChoices(...fileTypeChoices)
    .setRequired(true)
  )
  .addStringOption(option =>
    option
    .setName('url')
    .setDescription('The URL of the image to describe.')
  )
  .addAttachmentOption(option =>
    option
    .setName('attachment')
    .setDescription('Attach the image to describe.')
  )
  .addStringOption(option =>
    option
    .setName('prompt')
    .setDescription('Any specific details or context you want the assistant to focus on?')
  )
  .addBooleanOption(option =>
    option
    .setName('private')
    .setDescription('Should the response be visible only to you?')
  );
```
*/

const userInfo = new ContextMenuCommandBuilder()
	.setName('User Information')
	.setType(ApplicationCommandType.User);

const msgInfo = new ContextMenuCommandBuilder()
	.setName('Message Information')
	.setType(ApplicationCommandType.Message);


function makeUserInstallable(command) {
  return { ...command, integration_types: [0, 1], contexts: [0, 1, 2] };
}

const allCommands = [command1, makeUserInstallable(userInfo), makeUserInstallable(msgInfo)]

async function registerCommands(client) {
  const rest = new REST().setToken(process.env.DISCORD_TOKEN);

  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body: allCommands });
    console.log('=> Commands Reloaded!');
  } catch (error) {
    console.error('Error refreshing commands:', error.message);
  }
}

module.exports = { registerCommands };