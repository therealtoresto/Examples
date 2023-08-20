/* eslint-disable */
const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const board = [
    ['X', 'X', 'X'],
    ['4', '5', '6'],
    ['7', '8', '9']
];

let currentPlayer = 'X';
let moves = 0;

const printBoard = () => {
    console.log('\n');
    for (let row of board) {
        console.log(row.join(' | '));
        console.log(('--------'));
    }
    console.log('\n');
}

const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return true;
        }
    }

    // Check cols
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return true;
        }
    }

    // Check diagonals
    if (
        (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0])
    ) {
        return true;
    }

    return false;
}

const playGame = () => {
    printBoard();

    rl.question(`${currentPlayer}'s turn. Enter the number where you want to place your symbol: `, (input) => {
        const position = parseInt(input) - 1;
        const row = Math.floor(position / 3);
        const col = position % 3;

        if (isNaN(position) || position < 0 || position > 8 || board[row][col] === 'X' || board[row][col] === '0') {
            console.log('Invalid move. Please choose an available number from the board.');
            playGame();
            return;
        }

        board[row][col] = currentPlayer;
        moves++;

        if (checkWinner()) {
            printBoard();
            console.log(`${currentPlayer} wins!`);
            rl.close();
            return;
        } else if (moves === 9) {
            printBoard();
            console.log('It`s a tie!');
            rl.close();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? '0' : 'X';
        playGame();
    })
}

console.log('Welcome to Tic Tec Toe!');
playGame();