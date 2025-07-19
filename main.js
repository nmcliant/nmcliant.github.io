const commands = {
    help: {
        description: "man",
        run: () => Object.keys(commands).map(cmd => `${cmd} - ${commands[cmd].description}`).join('\n'),
    },

    ls: {
        description: "ls",
        run: () => "index.html\nmain.js\nstyle.css",
    },

    cat: {
        description: "cat",
        run: (args) => {
            if (args.length === 0) {
                return "Usage: cat <filename>";
            }
            const filename = args[0];
            if (filename === "index.html") {
                return "<!DOCTYPE html>\n<html>\n<head>\n  <title>nmremember</title>\n</head>\n<body>\n  <h1>Welcome to nmremember!</h1>\n</body>\n</html>";
            } else if (filename === "main.js") {
                return "// JavaScript code here";
            } else if (filename === "style.css") {
                return "body { background-color: #f0f0f0; }";
            } else {
                return `cat: ${filename}: No such file or directory`;
            }
        }
    },

     clear: {
    desc: '画面をクリアします',
    run: () => { output.innerHTML = ''; return ''; },
  },
};

const term   = document.getElementById('shell');
const input  = document.getElementById('cmd');
const output = document.getElementById('output');

input.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const raw   = input.value.trim();
  const [cmd, ...args] = raw.split(/\s+/);
  const argStr = args.join(' ');

  print(`$ ${raw}`);

  if (!commands[cmd]) {
    print(`${cmd}: command not found`);
  } else {
    const result = commands[cmd].run(argStr);
    if (result) print(result);
  }
  input.value = '';
  scrollToBottom();
});

term.addEventListener('click', () => input.focus());

function print(text) {
  output.textContent += text + '\n';
}

function scrollToBottom() {
  term.scrollTop = term.scrollHeight;
}