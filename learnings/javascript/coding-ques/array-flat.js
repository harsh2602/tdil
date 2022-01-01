Array.prototype.myFlat = function (depth = 1) {
  let input = this;

  return input.reduce((acc, curr) => {
    if (Array.isArray(curr) && depth > 0) {
      acc = acc.concat(curr.myFlat(depth - 1));
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
};

console.log([1, 2, 3, 4, [5, 6, [7, 8, [9, 10]]]].myFlat(Infinity));
