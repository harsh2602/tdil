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
 