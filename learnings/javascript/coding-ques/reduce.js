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
