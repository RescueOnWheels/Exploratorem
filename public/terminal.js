/**
 * Function for adding effects and color to your terminal string.
 * Makes it a bit easier to add color to your terminal msges
 * @param {*} col The color or effect you want to add to your string
 * @param {String} string The string you are trying to add effects to
 */
function ansi(col, string) {
  switch (col) {
    case 'red':
      return `\x1b[31m${string}\x1b[0m`;
    case 'green':
      return `\x1b[32m${string}\x1b[0m`;
    case 'yellow':
      return `\x1b[33m${string}\x1b[0m`;
    case 'blue':
      return `\x1b[34m${string}\x1b[0m`;
    case 'magenta':
      return `\x1b[35m${string}\x1b[0m`;
    case 'cyan':
      return `\x1b[36m${string}\x1b[0m`;
    case 'bold':
      return `\x1b[1m${string}\x1b[0m`;
    case 'italic':
      return `\x1b[3m${string}\x1b[0m`;
    case 'underline':
      return `\x1b[4m${string}\x1b[0m`;
    case 'strike':
      return `\x1b[9m${string}\x1b[0m`;
    case 'inverse':
      return `\x1b[7m${string}\x1b[0m`;
    default:
      break;
  }
  return '';
}

// Initialize xtermjs terminal
// eslint-disable-next-line no-undef
const term = new Terminal();
term.open(document.getElementById('terminal'));

// ¯\_(ツ)_/¯
term.prompt = () => {
  term.write('\r\n$ ');
};

// Write welcome message to the terminal
// const now = new Date();
// term.writeln(now);
// term.writeln(`Welcome to ${ansi('magenta', 'dora')}`);
// term.writeln(ansi('blue', 'color test 123'));
// term.prompt();

// The theme settings and color settings
const theme = {
  background: '#1E1E1E',
  red: '#EE4B4B',
  blue: '#367CCA',
  green: '#0FA66C',
  brightGreen: '#22CE89',
  yellow: '#E4E40F',
  magenta: '#D670D6',
};

// Variable options
const options = {
  cursorBlink: true,
  theme,
};

// Iterate through options and set them
for (let i = 0; i < Object.keys(options).length; i += 1) {
  term.setOption(Object.keys(options)[i], Object.values(options)[i]);
}

// Create socket client object
// eslint-disable-next-line no-undef
const socket = io();

// Set text decoder to UTF-8
const enc = new TextDecoder('utf-8');

// On ssh input event, write data to terminal
socket.on('input', (data) => {
  term.write(enc.decode(data));
});

// When something is typed in the terminal, emit data so it can be transmitted over ssh
term.addDisposableListener('data', (data) => {
  socket.emit('output', data);
});

socket.on('pierror', (errormsg) => {
  term.write(ansi('red', `\r\nERROR: ${errormsg}\r\n`));
});

socket.on('info', (infomsg) => {
  term.write(ansi('blue', `\r\nINFO: ${infomsg}\r\n`));
});
