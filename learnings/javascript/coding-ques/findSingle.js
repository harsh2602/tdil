/**
 * @param {number[]} arr
 * @returns number
 */
function findSingle(arr) {
  const filteredMap = new Map();

  arr.forEach((element) => {
    if (filteredMap.has(element)) {
      filteredMap.delete(element);
    } else {
      filteredMap.set(element, 1);
    }
  });

  for (const key of filteredMap.keys()) {
    return key;
  }
}

const arr1 = [10, 2, 2, 1, 1, 0, 0, 10, 8];
console.log(findSingle(arr1));
