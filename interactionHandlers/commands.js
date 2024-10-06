const { REST, Routes } = require('discord.js');
const { sendEmbed } = require('../tools/sendingTools');
const { convertJsonToTable } = require('../tools/getTable');
const fs = require('fs');
const path = require('path');

function scanAndProcessCommands() {
  const directoryPath = path.join(__dirname, '..', 'interactionHandling', 'commandHandling');
  const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.js'));

  const secondVariablesArray = [];
  const nameToFirstFunctionMap = {};

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const match = fileContent.match(/module\.exports\s*=\s*{([^}]+)}/);
    if (match) {
      const exportsContent = match[1].trim().split(',').map(part => part.trim());
      
      if (exportsContent.length >= 2) {
        const [firstFunctionName, secondVariableName] = exportsContent.map(part => part.split(':')[0].trim());
        
        const { [firstFunctionName]: firstFunction, [secondVariableName]: secondVariable } = require(filePath);

        if (secondVariable && typeof secondVariable === 'object' && secondVariable.name && typeof firstFunction === 'function') {
          secondVariablesArray.push(secondVariable);
          nameToFirstFunctionMap[secondVariable.name] = { firstFunctionName, filePath, firstFunction };
          global[firstFunctionName] = firstFunction;
        }
      }
    }
  }

  return { secondVariablesArray, nameToFirstFunctionMap };
}

let allCommands;
let commandHandlers;

(async () => {
  const { secondVariablesArray, nameToFirstFunctionMap } = await scanAndProcessCommands();

  allCommands = secondVariablesArray;
  commandHandlers = nameToFirstFunctionMap;
})();

async function registerCommands(client) {
  const rest = new REST().setToken(process.env.DISCORD_TOKEN);

  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body: allCommands });
    function convertMapToFormattedObject(nameToFirstFunctionMap) {
      return Object.entries(nameToFirstFunctionMap).reduce((result, [name, { firstFunctionName }]) => {
        result['Command'].push(name);
        result['Linked To'].push(firstFunctionName);
        return result;
      }, { 'Command': [], 'Linked To': [] });
    }
    console.log(convertJsonToTable(convertMapToFormattedObject(commandHandlers)));
  } catch (error) {
    console.error('Error refreshing commands:', error.message);
  }
}

async function handleCommandInteraction(interaction) {
  const { firstFunction: handler } = commandHandlers[interaction.commandName];

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

module.exports = { registerCommands, handleCommandInteraction };