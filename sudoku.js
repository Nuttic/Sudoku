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


const createEmpty = sudoku => {

  const empty = []

  for(let i = 0; i < sudoku.length; i++){
      const arr = sudoku[i]
      for(let j = 0; j < arr.length; j++){
          if(arr[j] === '-'){
              const emp = {
                  i: i,
                  j: j
              }
              const getQ = (obj, r, c) => {
                  const arr1 = [0,1,2]
                  const arr2 = [3,4,5]
                  const arr3 = [6,7,8]

                  if(arr1.includes(r) && arr1.includes(c)){
                      obj.q = 1
                  } 
                  else if(arr1.includes(r) && arr2.includes(c) ){
                      obj.q = 2
                  }
                  else if(arr1.includes(r)&& arr3.includes(c) ){
                      obj.q = 3
                  }
                  else if(arr2.includes(r)&& arr1.includes(c) ){
                      obj.q = 4
                  }
                  else if(arr2.includes(r)&& arr2.includes(c) ){
                      obj.q = 5
                  }
                  else if(arr2.includes(r)&& arr3.includes(c) ){
                      obj.q = 6
                  }
                  else if(arr3.includes(r)&& arr1.includes(c) ){
                      obj.q = 7
                  }
                  else if(arr3.includes(r)&& arr2.includes(c) ){
                      obj.q = 8
                  }
                  else if(arr3.includes(r)&& arr3.includes(c) ){
                      obj.q = 9
                  }
               return obj
              }

              
              empty.push(getQ(emp, i, j))
          }
      }
  }
  return empty.length !== 0 ? empty : null
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

