function makeUserInstallable(command) {
  return { ...command, integration_types: [0, 1], contexts: [0, 1, 2] };
}

module.exports = { makeUserInstallable };