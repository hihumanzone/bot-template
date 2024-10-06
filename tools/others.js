const fs = require('fs');
const path = require('path');

function makeUserInstallable(command) {
  return { ...command, integration_types: [0, 1], contexts: [0, 1, 2] };
}

function searchAndImportFunctions(directory) {
  const functions = {};

  const files = fs.readdirSync(directory).filter(file => file.endsWith('.js'));

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const moduleExportsRegex = /module\.exports\s*=\s*\{\s*(['"`]?)(\w+)\1\s*:\s*(\w+)\s*\}/;
    const match = moduleExportsRegex.exec(fileContent);

    if (match) {
      const nameString = match[2];
      const handleFunctionName = match[3];

      const module = require(fullPath);
      if (typeof nameString === 'string' && typeof module[nameString] === 'function') {
        global[handleFunctionName] = module[nameString];
        functions[nameString] = module[nameString];
      }
    }
  }

  return functions;
}

module.exports = { makeUserInstallable, searchAndImportFunctions };