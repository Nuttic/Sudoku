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

function solve(board, empty) {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции read.
   * Возвращает игровое поле после попытки его решить.
   */

  const getRandom = () => {
    return (Math.floor(Math.random()* 9) +1)
  } 

  empty.forEach((el) => board[el.i][el.j] = getRandom())

  return board;

  // createEmpty()
  // filterEmptyByRow()
  // filterEmptyByColumn()
  // filterEmptyBySq()


//   fromEmptyToNumbers(empty, target, board){
//     const updt = empty.filter(el => el.q === target)
//     if(updt.length === 1){
//       board[updt[0].i][updt[0].j] = target
//     }
//   }
  

  // fromEmptyToNumbers()

}

function isSolved(board) {
  // Проверка строк
  for (let i = 0; i < 9; i++) {
    if (!isValidSet(board[i])) {
      return false;
    }
  }

  // Проверка столбцов
  for (let j = 0; j < 9; j++) {
    const column = [];
    for (let i = 0; i < 9; i++) {
      column.push(board[i][j]);
    }
    if (!isValidSet(column)) {
      return false;
    }
  }

  // Проверка квадратов 3x3
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const square = [];
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          square.push(board[k][l]);
        }
      }
      if (!isValidSet(square)) {
        return false;
      }
    }
  }

  return true;
}

function prettyBoard(arr) {
  let result = '';

  arr.forEach((element) => {
    result += element.join(' ') + '\n';
  });
  return result;
}

function isValidSet(set) {
  const seen = new Set();
  for (let num of set) {
    if (num !== 0) {
      if (seen.has(num)) {
        return false;
      }
      seen.add(num);
    }
  }
  return true;
}

const createEmpty = (sudoku) => {
  const empty = [];

  for (let i = 0; i < sudoku.length; i++) {
    const arr = sudoku[i];
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === '-') {
        const emp = {
          i: i,
          j: j,
        };
        const getQ = (obj, r, c) => {
          const arr1 = [0, 1, 2];
          const arr2 = [3, 4, 5];
          const arr3 = [6, 7, 8];

          if (arr1.includes(r) && arr1.includes(c)) {
            obj.q = 1;
          } else if (arr1.includes(r) && arr2.includes(c)) {
            obj.q = 2;
          } else if (arr1.includes(r) && arr3.includes(c)) {
            obj.q = 3;
          } else if (arr2.includes(r) && arr1.includes(c)) {
            obj.q = 4;
          } else if (arr2.includes(r) && arr2.includes(c)) {
            obj.q = 5;
          } else if (arr2.includes(r) && arr3.includes(c)) {
            obj.q = 6;
          } else if (arr3.includes(r) && arr1.includes(c)) {
            obj.q = 7;
          } else if (arr3.includes(r) && arr2.includes(c)) {
            obj.q = 8;
          } else if (arr3.includes(r) && arr3.includes(c)) {
            obj.q = 9;
          }
          return obj;
        };

        empty.push(getQ(emp, i, j));
      }
    }
  }
  return empty.length !== 0 ? empty : null;
};

function filterEmptyByRow(board, target, empty) {
  for (let i = 0; i < 9; i++) {
    if (board[i].includes(target)) {
      for (let t = 0; t < empty.length; t++) {
        if (empty[t].i === i) {
          empty[t] = 0;
        }
      }
    }
  }

  return empty.filter((el) => el !== 0);
}

module.exports = {
  read,
  solve,
  isSolved,
  prettyBoard,
};
