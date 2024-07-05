const fs = require('fs');
const os = require('os');

function read() {
  const fullSud = fs
    .readFileSync('./puzzles.txt', 'utf-8')
    .split(`${os.EOL}`)
    .filter((word) => word);

  const result = [];

  let targetTask = '';
  if (process.argv[2]) {
    targetTask = fullSud[process.argv[2] - 1];
  } else if (!process.argv[2] || process.argv[2] > 15) {
    targetTask = fullSud[0];
  }

  let count = 0;

  for (let i = 0; i < 9; i++) {
    const temp = [];
    for (let j = 0; j < 9; j++) {
      temp.push(
        targetTask[count] === '-'
          ? targetTask[count]
          : Number(targetTask[count])
      );
      count++;
    }
    result.push(temp);
  }

  return result;
}


function solve() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции read.
   * Возвращает игровое поле после попытки его решить.
   */
}

function isSolved() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции solve.
   * Возвращает булевое значение — решено это игровое поле или нет.
   */
}

function prettyBoard() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции solve.
   * Выводит в консоль/терминал судоку.
   * Подумай, как симпатичнее его вывести.
   */
}

