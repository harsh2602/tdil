// O(log(x) + log(y))
/**
 * The JavaScript String.prototype.replicate() method takes a number as an argument and returns a
new string that is a concatenation of the original string repeated as many times as the number
indicates.
 */
String.prototype.replicate = function (count) {
  let input = this;
  /**
   * The valueOf() bit helps in decreasing the implicit conversion time
   * that's happening whenever later result will be concatenated to itself.
   */
  let result = this.valueOf();
  console.log(count);
  for (var index = 2; index < count; index *= 2) {
    result += result;
  }
  let remainingCount = count - index / 2;
  return remainingCount > 0 ? result + input.replicate(remainingCount) : result;
};

console.log('a'.replicate(7));
