// eslint-disable-next-line no-undef
const term = new Terminal();
term.prompt = () => {
  term.write('\r\n$ ');
};
term.open(document.getElementById('terminal'));
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
term.prompt();

const theme = {
  background: '#1E1E1E',
  red: '#EE4B4B',
  blue: '#367CCA',
  green: '#0FA66C',
  brightGreen: '#22CE89',
  yellow: '#E4E40F',
  magenta: '#D670D6',
};

term.setOption('theme', theme);
term.setOption('cursorBlink', true);

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
