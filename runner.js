// Используйте для решения судоку необходимые функции из файла sudoku.js

const { read, solve, isSolved, prettyBoard } = require('./sudoku');

const board = read();

console.log(prettyBoard(board));
console.log('=========================');
console.log(prettyBoard(solve(board)));
console.log(isSolved(solve(board)));
