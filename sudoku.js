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

// function solveFriday(board, empty) {
//   /**
//    * Принимает игровое поле в том формате, в котором его вернули из функции read.
//    * Возвращает игровое поле после попытки его решить.
//    */

//   const getRandom = () => {
//     return Math.floor(Math.random() * 9) + 1;
//   };

//   empty.map((el) => (board[el.i][el.j] = getRandom()));

//   return board;

//   // createEmpty()
//   // filterEmptyByRow()
//   // filterEmptyByColumn()
//   // filterEmptyBySq()

//   //   fromEmptyToNumbers(empty, target, board){
//   //     const updt = empty.filter(el => el.q === target)
//   //     if(updt.length === 1){
//   //       board[updt[0].i][updt[0].j] = target
//   //     }
//   //   }

//   // fromEmptyToNumbers()
// }

function solve(board) {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции read.
   * Возвращает игровое поле после попытки его решить.
   */
  if (createEmpty(board) === null) {
    return board;
  }

  for (let target = 1; target < 10; target++) {
    const empty = createEmpty(board);
    const empty1 = filterEmpty(board, target, empty);
    board = changeFromEmptyToTarget(board, target, empty1);
  }

  return solve(board);
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

function filterEmpty(board, target, empty) {
  if (empty) {
    const empty1 = filterEmptyByRow(board, target, empty);

    const empty2 = filterEmptyByCol(board, target, empty1);

    const empty3 = filterEmptyBySquare(board, target, empty2);

    return filterEmptyForDoubles(empty3);
  } else {
    return empty;
  }
}

module.exports = {
  read,
  solve,
  isSolved,
  prettyBoard,
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

function filterEmptyByCol(board, target, empty) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[j][i] === target) {
        for (let t = 0; t < empty.length; t++) {
          if (empty[t].j === i) {
            empty[t] = 0;
          }
        }
      }
    }
  }

  return empty.filter((el) => el !== 0);
}

function filterEmptyBySquare(board, target, empty) {
  let numberOfSquare = 1;

  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const square = [];
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          square.push(board[k][l]);
        }
      }
      if (square.includes(target)) {
        for (let t = 0; t < empty.length; t++) {
          if (empty[t].q === numberOfSquare) {
            empty[t] = 0;
          }
        }
      }
      numberOfSquare++;
    }
  }

  return empty.filter((el) => el !== 0);
}

function filterEmptyForDoubles(empty) {
  for (let i = 0; i < empty.length; i++) {
    let counter = 0;
    for (let j = i + 1; j < empty.length; j++) {
      if (empty[i].q === empty[j].q) {
        empty[j] = 0;

        counter++;
      }
    }
    if (counter > 0) {
      empty[i] = 0;
    }
  }
  for (let i = 0; i < empty.length; i++) {
    let counter = 0;
    for (let j = i + 1; j < empty.length; j++) {
      if (empty[i].i === empty[j].i) {
        empty[j] = 0;
        counter++;
      }
    }
    if (counter > 0) {
      empty[i] = 0;
    }
  }
  for (let i = 0; i < empty.length; i++) {
    let counter = 0;
    for (let j = i + 1; j < empty.length; j++) {
      if (empty[i].j === empty[j].j) {
        empty[j] = 0;
        counter++;
      }
    }
    if (counter > 0) {
      empty[i] = 0;
    }
  }
  return empty.filter((el) => el !== 0);
}

function changeFromEmptyToTarget(board, target, empty) {
  if (empty) {
    empty.map((el) => (board[el.i][el.j] = target));
    return board;
  } else {
    return board;
  }
}

function solverForOneEmpty(board) {
  for (let i = 0; i < 9; i++) {
    if (board[i].filter((el) => typeof el === 'string').length === 1) {
      const target =
        45 -
        board[i]
          .filter((el) => typeof el === 'number')
          .reduce((accumulator, currentValue) => accumulator + currentValue);

      const index = board[i].findIndex((x) => x === '-');

      board[i][index] = target;
    }
  }
  return board;
}

const board = read();

const target = 1;

const empty = createEmpty(board);

// console.log('=========================');
// console.log(prettyBoard(board));
// console.log('=========================');
// console.log(empty);
// console.log('=========================');
// const empty1 = filterEmptyByRow(board, target, empty);
// console.log(empty1);
// console.log('=========================');
// const empty2 = filterEmptyByCol(board, target, empty1);
// console.log(empty2);
// console.log('=========================');
// const empty3 = filterEmptyBySquare(board, target, empty2);
// console.log(empty3);
// console.log('=========================');
// const empty4 = filterEmptyForDoubles(empty3);
// console.log(empty4);
// console.log('=========================');
// const boardTrue = changeFromEmptyToTarget(board, target, empty4);
// console.log(prettyBoard(boardTrue));

// console.log(prettyBoard(board));
// console.log('=========================');
// // console.log(empty);
// console.log('=========================');
// const empty1 = filterEmpty(board, target, empty);
// // console.log(empty1);
// console.log('=========================');
// const boardTrue = changeFromEmptyToTarget(board, target, empty1);
// console.log(prettyBoard(boardTrue));

console.log(prettyBoard(board));
console.log('1=========================');
console.log(prettyBoard(solve(board)));

// console.log('2=========================');
// console.log(prettyBoard(solve(board)));
// console.log('3=========================');
// console.log(prettyBoard(solve(board)));
// console.log('4=========================');
// console.log(prettyBoard(solve(board)));
// console.log('5=========================');
// console.log(prettyBoard(solve(board)));
console.log(isSolved(solve(board)));
