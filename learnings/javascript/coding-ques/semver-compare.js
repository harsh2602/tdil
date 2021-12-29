/**
 * @param {string} v1
 * @param {string} v2
 * @returns 0 | 1 | -1
 */
function compare(v1, v2) {
  v1 = v1.split('.').map(Number);
  v2 = v2.split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    if (v1[i] > v2[i]) return 1;
    if (v1[i] < v2[i]) return -1;
  }
  return 0;
}

console.log(compare('12.1.0', '12.0.9'));
// 1, meaning first one is greater

console.log(compare('12.1.0', '12.1.2'));
// -1, meaning latter one is greater

console.log(compare('5.0.1', '5.0.1'));
// 0, meaning they are equal.
