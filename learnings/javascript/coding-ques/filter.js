/**
 * The arrayFilter method takes an array and a function as arguments. It loops through the array and
calls the function with each element. If the function returns true, the element is added to a new
array. The new array is returned.
 */
Array.prototype.arrayFilter = function (func) {
  let input = this;
  const filteredArr = [];

  input.forEach((element) => {
    const res = func(element);
    if (res) {
      filteredArr.push(element);
    }
  });

  return filteredArr;
};

console.log([1, 2, 3, 4, 5].arrayFilter((x) => x % 2 !== 0));
