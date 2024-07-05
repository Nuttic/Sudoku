// Используйте для решения судоку необходимые функции из файла sudoku.js

const { read, solve, isSolved, prettyBoard } = require('./sudoku');

console.log(isSolved(read()));
// console.log(prettyBoard(solve()));

console.log(prettyBoard(read()));
