function saneUserCheck(interaction) {
  const originalUserId = interaction.message?.interactionMetadata?.user?.id;

  const mentionedUsers = interaction.message.mentions.users;
  const firstMentionedUserId = mentionedUsers?.first()?.id;

  const currentUserId = interaction.user.id;

  if (currentUserId === originalUserId || currentUserId === firstMentionedUserId) {
    return true;
  } else {
    return false;
  }
}

module.exports = { saneUserCheck };