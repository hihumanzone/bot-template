const { ActivityType } = require('discord.js');

module.exports = {

  bot_status: 'idle', // 'online', 'idle', 'dnd', 'invisible'

  embed: {
    colour: '#505050', // Dark gray
    footer_text: 'Bot Template • Catalyst',
    footer_icon_link: 'https://ai.google.dev/static/site-assets/images/share.png'
  },

  ACTIVITIES: [
    { name: 'a game of Chess', type: ActivityType.Competing },
    { name: 'lo-fi beats', type: ActivityType.Listening },
    { name: 'Minecraft', type: ActivityType.Playing },
    { name: 'a coding tutorial', type: ActivityType.Watching },
    { name: 'On YouTube', type: ActivityType.Streaming, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
  ],
  switch_activity_sec: 30,

};