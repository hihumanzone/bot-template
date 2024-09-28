const { ActivityType } = require('discord.js');

const ACTIVITIES = [
  { name: 'a game of Chess', type: ActivityType.Competing },
  { name: 'lo-fi beats', type: ActivityType.Listening },
  { name: 'Minecraft', type: ActivityType.Playing },
  { name: 'a coding tutorial', type: ActivityType.Watching },
  { name: 'On YouTube', type: ActivityType.Streaming, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
];

function updateActivity(client) {
  const activity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
  client.user.setActivity(activity.name, { type: activity.type, url: activity.url });
}

function startActivityUpdates(client) {
  updateActivity(client);
  client.user.setStatus('idle');
  setInterval(() => updateActivity(client), 30000);
}

module.exports = { startActivityUpdates };