/*
const json = {
  "ID": [1, 2, 3, 4],
  "Name": ["Alice", "Bob", "Charlie", "Diana"],
  "Age": [30, 25, 35, 28],
  "City": ["New York", "Los Angeles", "Chicago", "Houston"],
  "Occupation": ["Engineer", "Artist", "Teacher", "Doctor"]
};
*/

const getMaxColumnWidths = (json) => Object.keys(json).map(
  key => Math.max(key.length, ...json[key].map(item => item.toString().length))
);

const padString = (str, length) => str.padEnd(length);

const ansiCode = {
  reset: "\x1b[0m",
  whiteTextOnBlackBg: "\x1b[30;47m",
  codeBlockStart: "\x1b[0m\x1b[0;40m\x1b[1;37m",
  codeBlockEnd: "\x1b[0m"
};

const convertJsonToTable = (json) => {
  const keys = Object.keys(json);
  const columnWidths = getMaxColumnWidths(json);

  const createRow = (items) =>
    items.map((item, i) => padString(item.toString(), columnWidths[i])).join(' | ');

  const header = createRow(keys);
  const divider = createRow(columnWidths.map(width => '-'.repeat(width)));

  const rows = json[keys[0]].map((_, rowIndex) =>
    createRow(keys.map(key => json[key][rowIndex]))
  );

  return [
    ansiCode.codeBlockStart,
    `${ansiCode.whiteTextOnBlackBg}${header}${ansiCode.reset}`,
    divider,
    ...rows,
    ansiCode.codeBlockEnd
  ].join('\n');
};

/*
const exampleObj = {
  name: 'John Doe',
  age: 30,
  occupation: 'Software Developer',
  country: 'USA'
};
*/

function objectToTable(obj, separator = '-') {
  const maxKeyLength = Math.max(...Object.keys(obj).map(key => key.length));

  const table = Object.entries(obj).map(([key, value]) => {
      const paddedKey = key.padStart(maxKeyLength, ' ');
      return `${paddedKey} ${separator} ${value}`;
  }).join('\n');

  return table;
}

module.exports = { convertJsonToTable };