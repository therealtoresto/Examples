'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

const commands = {
    help() {
        console.log('You can use: ' + Object.keys(commands).join(', '));
    },
    hello() {
        console.log('Hello there!');
    },
    exit() {
        rl.close();
    }
};

console.log('Try commands: ' + Object.keys(commands).join(', '));
rl.prompt();

rl.on('line', line => {
    line = line.trim();
    const command = commands[line];
    if (command) command();
    else console.log('Unknown command');
    rl.prompt();
}).on('close', () => {
    console.log('Bye!');
    process.exit(0);
});
