const str =
  "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--";


const getArr = str => {
let count = 0;

const arr = [];

for (let i = 0; i < 9; i++) {
  const temp = [];
  for (let j = 0; j < 9; j++) {
    temp.push(str[count] === "-" ? str[count] : Number(str[count]));
    count++;
  }
  arr.push(temp);
}
return arr

}

// console.log(getArr(str))
let arr1 = getArr(str)


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
                 return obj
                }

                
                empty.push(getQ(emp, i, j))
            }
        }
    }
   
    return empty
} 

console.log(getArr(str))
console.log(createEmpty(arr1))