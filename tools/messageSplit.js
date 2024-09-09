const { sendEmbed } = require('./sendingTools');

function splitCodesAndText(text) {
  const regex = /```[^```]{200,}```/g;
  const codeBlocks = text.match(regex) || [];
  const texts = text.split(regex);

  let result = [];
  texts.forEach((txt, index) => {
    if (txt.trim()) {
      result.push(txt);
    }
    if (index < codeBlocks.length && codeBlocks[index].trim()) {
      result.push(codeBlocks[index]);
    }
  });

  return result;
}

function processChunks(chunks, maxLength = 2000) {
  function splitLargeChunk(chunk, delimiter, maxLength) {
    const parts = chunk.split(delimiter);
    let processedParts = [];

    let currentPart = parts[0];
    for (let i = 1; i < parts.length; i++) {
      if ((currentPart + delimiter + parts[i]).length > maxLength) {
        processedParts.push(currentPart);
        currentPart = parts[i];
      } else {
        currentPart += delimiter + parts[i];
      }
    }
    processedParts.push(currentPart);
    return processedParts;
  }

  const finalChunks = chunks.reduce((acc, chunk) => {
    if (chunk.length <= maxLength) {
      if (chunk.trim()) {
        acc.push(chunk);
      }
    } else {
      const delimiters = ['\n', '. ', ' '];
      let splitSuccessful = false;

      for (const delimiter of delimiters) {
        const splitChunks = splitLargeChunk(chunk, delimiter, maxLength);
        if (splitChunks.every(subChunk => subChunk.length <= maxLength)) {
          splitChunks.forEach(splitChunk => {
            if (splitChunk.trim()) {
              acc.push(splitChunk);
            }
          });
          splitSuccessful = true;
          break;
        }
      }

      if (!splitSuccessful) {
        for (let pos = 0; pos < chunk.length; pos += maxLength - 50) {
          const part = chunk.slice(pos, pos + maxLength - 50);
          if (part.trim()) {
            acc.push(part);
          }
        }
      }
    }
    return acc;
  }, []);

  return finalChunks;
}

async function sendSplitMessage(botResponse, entity) {
  const chunks = splitCodesAndText(botResponse).filter(chunk => chunk.trim());
  const processedChunks = processChunks(chunks).filter(chunk => chunk.trim());

  if (entity && processedChunks.length > 0) {
    let lastMessage = await entity.reply(processedChunks[0]);
    for (let i = 1; i < processedChunks.length; i++) {
      lastMessage = await entity.channel.send(processedChunks[i]);
    }
    return { chunks, lastMessage };
  }

  return { chunks };
}

async function sendSplitEmbedMessage(botResponse, entity) {
  const chunks = splitCodesAndText(botResponse).filter(chunk => chunk.trim());
  const processedChunks = processChunks(chunks, 4000).filter(chunk => chunk.trim());

  if (entity && processedChunks.length > 0) {
    let lastMessage = await sendEmbed(entity, { title: `Message: 1`, description: processedChunks[0]});
    for (let i = 1; i < processedChunks.length; i++) {
      lastMessage = await sendEmbed(entity, { title: `Message: ${i + 1}`, description: processedChunks[i], noReply: true});
    }
    return { chunks, lastMessage };
  }

  return { chunks };
}

module.exports = { sendSplitMessage, sendSplitEmbedMessage };
