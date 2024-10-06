# Bot Configuration and Interaction Guide

## Configuration

- **`config.js`**: This file is used to configure the basic settings for the bot.

## Embedded Messages

### Sending and Editing

To handle embedded messages, use the `sendEmbed` or `editEmbed` functions from `tools/sendingTools`.

#### Example of `sendEmbed`

```javascript
let msg = await sendEmbed(message, { title: 'Your Message', description: `You mentioned me! Here’s your message: "${message.content}"` });
```
Located in `message.js`.

#### Example of `editEmbed`

```javascript
msg = editEmbed(interaction.message, { title: titleInput, description: textInput }, interaction);
```
Located in `interactionHandling/modalHandling/inputModal.js`.

## Mention Handling

- Mentions are handled by default in `message.js`.

## Setting Commands

### Creating Commands

1. **Navigate to Interaction Handling**: Start by navigating to the interaction handling section.
2. **Create a New Command**: Create a new `.js` file for the command, optionally placing it inside a folder.
3. **Define the Command**: Use `SlashCommandBuilder` (or `ContextMenuCommandBuilder` for context menu commands) in discord.js and include the handler function.
4. **Export the Command**: Use `module.exports = { ... }` to export the handler function and the command itself.
   
   ```javascript
   module.exports = { handleCommand1, com1 };
   ```
   Located in `command1.js`.

### User-Installable Commands

- Use `makeUserInstallable` to enable the command as a user-installable app.

  ```javascript
  module.exports = { handleMsgInfoCom, comMsgInfo: makeUserInstallable(comMsgInfo) };
  ```
  Located in `ContextMenuCommands/msgInfo.js`.

## Setting Buttons

### Recommended Method

Use the `addButton` function from `tools/addInteractions.js`.

#### Example

```javascript
msg = await addButton(msg, { id: 'delete_message', label: 'Delete', emoji: '🗑️' });
```
Located in `message.js`.

### Handling Button Interactions

- Create a new `.js` file in `interactionHandling/buttonHandling` for the button handler.
- Export the handler function in this format: `module.exports = { button_id: handleButtonFunction };`.

## Setting Select String Menu

### Recommended Method

Use the `addStringMenu` function from `tools/addInteractions.js`.

#### Example

```javascript
msg = await addStringMenu(msg, menu, interaction);
```
Located in `interactionHandling/buttonHandling/test/listButton.js`.

### Handling Select Menu Interactions

- Create a new `.js` file in `interactionHandling/selectMenuHandling` for the handler.
- Export the handler function in this format: `module.exports = { menu_id: handleMenuFunction };`.

## Setting Modal (Forms in Discord)

- Define the model using `ModalBuilder` in `discord.js`.

  Example in `interactionHandling/buttonHandling/sendButton.js`.

- Create a new `.js` file in `interactionHandling/modalHandling` for the handler.
- Export the handler function in this format: `module.exports = { model_id: handleModelFunction };`.

## Tools Overview

### `tools` Folder Features

- **`checks.js`**: Contains a `saneUserCheck` function to verify if the button press was intended for the user.
- **`getTable.js`**: Includes `convertJsonToTable` and `objectToTable` for converting JSON into tables.
- **`LargeResponseDm.js`**: Manages large responses, offering a `textDmSendButton` for sending full content as a file/link.
- **`messageSplit.js`**: Handles large responses by sending multiple split messages.
- **`others.js`**: Includes the `makeUserInstallable` function.
- **`addInteractions.js`**: Provides `addButton`, `addStringMenu`, and `clearComponents` functions.
- **`sendingTools.js`**: Offers `sendEmbed`, `editEmbed`, and `sendErrorDM` functions.

This guide provides a comprehensive overview of configuring and handling interactions with the bot, ensuring a seamless user experience.