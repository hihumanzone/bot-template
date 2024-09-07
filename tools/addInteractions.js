const { ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

async function addButton(botMessage, button) {
  const { id, label, emoji, style = 'SECONDARY' } = button;
  try {
    if (!botMessage) return;

    const newButton = new ButtonBuilder()
      .setCustomId(id)
      .setLabel(label)
      .setEmoji(emoji)
      .setStyle(style.toUpperCase() === 'PRIMARY' ? ButtonStyle.Primary : ButtonStyle.Secondary);

    const actionRows = botMessage.components ? botMessage.components.map(row => ActionRowBuilder.from(row)) : [];

    let added = false;

    for (let row of actionRows) {
      if (row.components.length < 5 && row.components.every(comp => comp.data.type === ComponentType.Button)) {
        row.addComponents(newButton);
        added = true;
        break;
      }
    }

    if (!added) {
      const newActionRow = new ActionRowBuilder().addComponents(newButton);
      actionRows.push(newActionRow);
    }

    const finalActionRows = actionRows.map(row => row.toJSON());

    return await botMessage.edit({ components: finalActionRows });
  } catch (error) {
    console.error('Error adding button:', error.message);
    return botMessage;
  }
}

async function addStringMenu(botMessage, menu, options = {}) {
  const { id, placeholder, options: menuOptions } = menu;
  const { defaultOption } = options;

  try {
    if (!botMessage) return;

    const newMenu = new StringSelectMenuBuilder()
      .setCustomId(id)
      .setPlaceholder(placeholder)
      .addOptions(menuOptions);

    if (defaultOption) {
      newMenu.setDefaultOption(defaultOption);
    }

    const newActionRow = new ActionRowBuilder().addComponents(newMenu);

    const messageComponents = botMessage.components || [];
    messageComponents.push(newActionRow);

    return await botMessage.edit({ components: messageComponents });
  } catch (error) {
    console.error('Error adding string menu:', error.message);
    return botMessage;
  }
}

async function clearComponents(botMessage) {
  try {
    if (!botMessage) return;

    return await botMessage.edit({ components: [] });
  } catch (error) {
    console.error('Error clearing components:', error.message);
    return botMessage;
  }
}

module.exports = { addButton, addStringMenu, clearComponents };
