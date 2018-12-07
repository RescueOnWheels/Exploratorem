// eslint-disable-next-line no-undef
const term = new Terminal();
term.prompt = () => {
  term.write('\r\n$ ');
};
term.open(document.getElementById('terminal'));
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
term.prompt();

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
for (let i = 0; i < Object.keys(options).length; i++) {
  term.setOption(Object.keys(options)[i], Object.values(options)[i]);
}

term.addDisposableListener('key', (key, ev) => {
  const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
  if (ev.keyCode === 13) {
    term.prompt();
  } else if (ev.keyCode === 8) {
    if (term._core.buffer.x > 2) {
      term.write('\b \b');
    }
  } else if (printable) {
    term.write(key);
  }
});

term.addDisposableListener('paste', (data, ev) => {
  term.write(data);
});
