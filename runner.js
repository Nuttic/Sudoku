// Используйте для решения судоку необходимые функции из файла sudoku.js

const { read, solve, isSolved, prettyBoard, createEmpty} = require('./sudoku');
console.log(read())
console.log(isSolved(solve(read(),(createEmpty(read())))));
console.table(prettyBoard(solve(read(),(createEmpty(read())))))