const arr = [10, 2, 2, 1, 1, 0, 0, 10, 8];

function findSingleFP(arr) {
  return arr.reduce((prev, curr) => {
    return prev ^ curr;
  }, 0);
}

console.log(findSingleFP(arr));
