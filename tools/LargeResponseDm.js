const { addButton } = require('./addInteractions');
const { sendEmbed, editEmbed } = require('./sendingTools');
const fs = require('fs');
const path = require('path');

const responsesFilePath = path.join(__dirname, 'responses.json');

let textAndId = {};
try {
  if (fs.existsSync(responsesFilePath)) {
    const data = fs.readFileSync(responsesFilePath);
    textAndId = JSON.parse(data);
  }
} catch (error) {
  console.error('Error loading responses:', error);
}

function saveResponses() {
  try {
    fs.writeFileSync(responsesFilePath, JSON.stringify(textAndId, null, 2));
  } catch (error) {
    console.error('Error saving responses:', error);
  }
}

function clearOldResponses() {
  const now = Date.now();
  for (const [id, { text, timestamp }] of Object.entries(textAndId)) {
    if (now - timestamp > 24 * 60 * 60 * 1000) {
      delete textAndId[id];
    }
  }
  saveResponses();
}

setInterval(clearOldResponses, 60 * 60 * 1000);

async function textDmSendButton(message, text, interaction) {
  const id = message.id;
  textAndId[id] = { text, timestamp: Date.now() };
  saveResponses();
  await addButton(message, { id: 'get_full', label: 'Get Full', emoji: '📑' }, interaction);
}

async function getFull(interaction) {
  const id = interaction.message.id;
  const response = textAndId[id];
  if (!response) {
    return await sendEmbed(interaction, { title: 'Error', description: 'No response found or it has expired.' }, true);
  }
  
  const text = response.text;
  let msg = await sendEmbed(interaction, { title: 'Full Response Preparing', description: 'Full response will be sent to you shortly.' }, true);
  const buffer = Buffer.from(text, 'utf-8');
  const url = await uploadText(text);
  await sendEmbed(interaction, { title: 'Full Response', description: `Here's the full response:\n\n${url}`, dm: true, files: [{ name: `response-${id}.txt`, attachment: buffer }] });
}

async function uploadText(text) {
  const siteUrl = 'http://bin.shortbin.eu:8080';
  try {
    const response = await fetch(`${siteUrl}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: text,
      timeout: 3000
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const key = data.key;
    return `URL: ${siteUrl}/${key}`;
  } catch (error) {
    console.log(error);
    return 'URL Error :(';
  }
}

module.exports = { textDmSendButton, getFull, uploadText };
