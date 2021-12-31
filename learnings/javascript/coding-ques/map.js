const myFunc = (i) => i * 2;

Array.prototype.arrayMap = function (func) {
  const input = this;
  const mappedArr = [];

  input.forEach((element) => {
    mappedArr.push(myFunc(element));
  });

  return mappedArr;
};

console.log([1, 2, 3, 4, 5].arrayMap(myFunc));
