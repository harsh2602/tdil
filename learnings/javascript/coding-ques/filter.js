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
