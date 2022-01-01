const myFunc = (i) => i * 2;

/**
 * The JavaScript Array.prototype.arrayMap method takes a function as an argument and returns a new
array with the results of applying that function to each element of the original array.
 */
Array.prototype.arrayMap = function (func) {
  const input = this;
  const mappedArr = [];

  input.forEach((element) => {
    mappedArr.push(myFunc(element));
  });

  return mappedArr;
};

console.log([1, 2, 3, 4, 5].arrayMap(myFunc));
