/**
 * "Throttle a function so that it only executes once per time period."
 * @param fn - The function to be throttled.
 * @param time - The number of milliseconds to wait before invoking the function.
 * @returns A function that throttles the execution of the given function.
 */
function throttle(fn, time) {
  let timeoutId;

  return function () {
    if (timeoutId) return;

    timeoutId = setTimeout(() => {
      fn.apply(this, arguments);
      timeoutId = null;
    }, time);
  };
}
