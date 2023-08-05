/* eslint-disable */
const readline = require('node:readline');
const fs = require('node:fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const resultFile = 'result.txt';

const choises = [ 'rock', 'paper', 'scissors' ];

const getRandomChoise = () => {
    return choises[Math.floor(Math.random() * choises.length)]; 
};

const determineWinner = (userChoise, computerChoise) => {
    if (userChoise === computerChoise) {
        return `It's a tie!`;
    }

    const winMap = new Map([
        ['rock', 'scissors'],
        ['paper', 'rock'],
        ['scissors', 'paper']
    ]);
    console.log('userChoise:', winMap.get(userChoise));

    if (winMap.get(userChoise) === computerChoise) {
        return 'You win!';
    } else {
        return 'Computer win!';
    }
};

const playGame = () => {
    rl.question('Choose rock, paper of scissors: ', (userChoise) => {
        userChoise = userChoise.toLowerCase();

        if (!choises.includes(userChoise)) {
            console.log('Invalid choise. Please choose rock, paper or scissors.');
            playGame();
            return;
        }

        const computerChoise = getRandomChoise();
        console.log('Computer choose:', computerChoise);

        const result = determineWinner(userChoise, computerChoise);
        console.log(result);

        fs.appendFile(resultFile, `${computerChoise} vs ${userChoise} => ${result}`, (err) => {
            if (err) {
                console.log('Error writing to file', err);
            }
        })

        rl.question('Do you want to play again? (yes/no): ', (answer) => {
            if (answer.toLowerCase() === 'yes' || 'y') {
                playGame();
            } else {
                console.log('Thanks for playing!');
                rl.close();
            }
        });
    });
}

console.log('Welcome to Rock-Paper-Scissors Game!');
playGame();