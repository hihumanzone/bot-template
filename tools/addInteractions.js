const { ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

async function addButton(botMessage, button, interaction) {
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

    let msg;
    if (interaction) {
      msg = await interaction.editReply({ components: finalActionRows });
    } else {
      msg = await botMessage.edit({ components: finalActionRows });
    }
    return msg;
  } catch (error) {
    console.error('Error adding button:', error.message);
    return botMessage;
  }
}

async function addStringMenu(botMessage, menu, interaction) {
  const { id, placeholder, menuOptions, defaultOption } = menu;
  try {
    if (!botMessage) return;

    const newMenuOptions = menuOptions.map(option => {
      if (defaultOption && option.value === defaultOption) {
        return { ...option, default: true };
      }
      return option;
    });

    const newMenu = new StringSelectMenuBuilder()
      .setCustomId(id)
      .setPlaceholder(placeholder)
      .addOptions(newMenuOptions);

    const newActionRow = new ActionRowBuilder().addComponents(newMenu);

    const messageComponents = botMessage.components || [];
    messageComponents.push(newActionRow);

    let msg;
    if (interaction) {
      msg = await interaction.editReply({ components: messageComponents });
    } else {
      msg = await botMessage.edit({ components: messageComponents });
    }
    return msg;
  } catch (error) {
    console.error('Error adding string menu:', error.message);
    return botMessage;
  }
}

async function clearComponents(botMessage, interaction) {
  try {
    if (!botMessage) return;

    let msg;
    if (interaction) {
      msg = await interaction.editReply({ components: [] });
    } else {
      msg = await botMessage.edit({ components: [] });
    }
    return msg;
  } catch (error) {
    console.error('Error clearing components:', error.message);
    return botMessage;
  }
}

module.exports = { addButton, addStringMenu, clearComponents };