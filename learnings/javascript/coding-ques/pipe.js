const times = (y) => (x) => x * y;
const plus = (y) => (x) => x + y;
const subtract = (y) => (x) => x - y;
const divide = (y) => (x) => x / y;

/**
 * it takes a list of functions and returns a function that calls each function in the list with the
return value of the previous function.
 * @param funcs - an array of functions
 * @returns A function that takes an argument and passes it through a series of functions.
 */
function pipe(funcs) {
  return function (arg) {
    return funcs.reduce((result, func) => {
      return func.call(this, result);
    }, arg);
  };
}

console.log(pipe([times(2), times(3)]));
// x * 2 * 3

console.log(pipe([times(2), plus(3), times(4)]));
// (x * 2 + 3) * 4

console.log(pipe([times(2), subtract(3), divide(4)]));
// (x * 2 - 3) / 4
