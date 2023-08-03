/* eslint-disable */
const readline = require('node:readline');
const fs = require('node:fs/promises');

const { program } = require('commander');
require('colors');

program.option(
    '-f, --file [type]',
    'file for saving game results',
    'score.txt',
);


program.parse(process.argv);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = 0;

const logFile = program.opts().file;

const mind = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
    if(isNaN(value)) {
        console.log('Enter number!'.red);
        return false
    }

    if (value < 1 || value > 10) {
        console.log('Enter number from 1 to 10'.red)
        return false;
    }

    return true;
}

const log = async (data) => {
    try {
        await fs.appendFile(logFile, `${data}\n`);
        console.log(`Success saving to file: ${logFile}`.green);
    } catch (err) {
        console.log(`Failed saving to file: ${logFile}`.red)
    }

}

const startGame = () => {
    rl.question(
        'Enter number from 1 to 10: '.yellow,
        (value) => {
            let number = +value;
            if (!isValid(number)) {
                startGame();
                return;
            }
            count++;
            if (number === mind) {
                console.log('Congratulations!, you are guessed with %d step(s)'.green, count)
            
            log(`${new Date().toLocaleDateString()}: Congratulations!, you are guessed with ${count} step(s)`)
                .finally(() => rl.close());
            return;
        }
        console.log('You aren`n gessed, next one'.red);
        startGame();
    },
    );
};

startGame();
