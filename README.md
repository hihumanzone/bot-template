- `config.js`: Configure basic settings for the bot.

- **Sending/Editing Embedded Messages (recommended):**
  - Use `sendEmbed` or `editEmbed` functions from `tools/sendingTools`.
    - Example of `sendEmbed`: 
        ```javascript
        let msg = await sendEmbed(message, { title: 'Your Message', description: `You mentioned me! Here’s your message: "${message.content}"` })
        ```
        in `message.js`
    - Example of `editEmbed`: 
        ```javascript
        msg = editEmbed(interaction.message, { title: titleInput, description: textInput }, interaction);
        ``` 
        in `interactionHandling/modalHandling/inputModal.js`

- **Handling mentions** defaults to `message.js`.

- **Setting Commands:**
  - Navigate to interaction handling.
    - There are a few example commands.
  - Create a new `.js` file for the command, optionally placing it inside a folder.
  - Define the command using `SlashCommandBuilder` (or `ContextMenuCommandBuilder` for context menu commands) in discord.js and include the handler function.
  - Use `module.exports = { ... }` to first export the handler function and then export the command itself.
    - Example:
      ```javascript
      module.exports = { handleCommand1, com1 }
      ```
      in `command1.js`.
  - The first function exported is automatically set as the handler for the command itself, which is the second variable exported.
  - You can use `makeUserInstallable` to enable the command as a user-installable app.
    - Example:
      ```javascript
      module.exports = { handleMsgInfoCom, comMsgInfo: makeUserInstallable(comMsgInfo) }
      ```
      in `ContextMenuCommands/msgInfo.js`

- **Setting Buttons:**
  - Recommended: Use `addButton` function from `tools/addInteractions.js`.
    - Example: 
      ```javascript
      msg = await addButton(msg, { id: 'delete_message', label: 'Delete', emoji: '🗑️' });
      ```
      in `message.js`
  - Use `interactionHandlers/buttonHandlers.js` and match the id with the handler function in the `buttonHandlers` array.
  - Import the handler function from `interactionHandling/buttonHandling`.
  - In the `interactionHandling/buttonHandling` folder, create a new `.js` file to define the button handler.
  - In `interactionHandling/buttonHandling/index.js`, import and re-export the handler function.

- **Setting Select String Menu:**
  - Recommended: Use `addStringMenu` function from `tools/addInteractions.js`.
    - Example: 
      ```javascript
      msg = await addStringMenu(msg, menu, interaction);
      ```
      in `interactionHandling/buttonHandling/listButton.js`
  - Use `interactionHandlers/selectMenuHandlers.js` and match the id with the handler function in the `selectMenuHandlers` array.
  - Import the handler function from `interactionHandling/selectMenuHandling`.
  - In the `interactionHandling/selectMenuHandling` folder, create a new `.js` file to define the Select String Menu handler.
  - In `interactionHandling/selectMenuHandling/index.js`, import and re-export the handler function.

- **Setting Model (akin to forms in Discord):**
  - Define the model using `ModalBuilder` in `discord.js`.
    - Example in `interactionHandling/buttonHandling/sendButton.js`.
  - Use `interactionHandlers/modalHandlers.js` and match the id with the handler function in the `modalHandlers` array.
  - Import the handler function from `interactionHandling/modalHandling`.
  - In the `interactionHandling/modalHandling` folder, create a new `.js` file to define the Model handler.
  -Handling/modalHandling/index.js`, import and re-export the handler function.

- **Cool Tools Within the `tools` Folder:**
  - `checks.js`: Contains a `saneUserCheck` function to verify if the button press was intended for the user. Used for the delete button currently.
  - `getTable.js`: Contains `convertJsonToTable` and `objectToTable` to convert JSON into tables. Includes example JSON to demonstrate functionality, used in bot startup and `interactionHandling/commandHandling/ContextMenuCommands/userInfo.js`.
  - `LargeResponseDm.js`: Handles large responses that exceed a single message. Contains `textDmSendButton`, used like `await textDmSendButton(msg, 'full response content.')` in `message.js`, adding a button for sending full content as a file/link.
  - `messageSplit.js`: Manages large responses by sending multiple split messages. Includes functions like `sendSplitMessage` and `sendSplitEmbedMessage`.
  - `others.js`: Contains the `makeUserInstallable` function.
  - `addInteractions.js`: Includes `addButton`, `addStringMenu`, and `clearComponents` functions - `sendingTools.js`: Contains the `sendEmbed`, `editEmbed`, and `sendErrorDM` functions.