/**
 * The myReduce method takes two arguments, a reducer function and an initial value. 
 * If the initial value is undefined, it uses the first element of the array as the initial value. 
 * It then iterates over the array, passing the accumulator and the current element to the reducer
function. 
 * It returns the accumulator after the last element has been processed.
 */
Array.prototype.myReduce = function (reducer, initialValue) {
  let input = this;
  let accumulator = initialValue;
  let startIndex;

  if (initialValue === undefined) {
    accumulator = input[0];
    startIndex = 1
  } else {
    startIndex = 0
  }

  for (let i = startIndex; i < input.length; i++) {
    accumulator = reducer(accumulator, input[i]);
  }

  return accumulator;
};

console.log(
  [1, 2, 3, 4].myReduce((prev, current) => {
    return prev + current;
  })
);

let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
console.log(names.myReduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++
  }
  else {
    allNames[name] = 1
  }
  return allNames
}, {}))
