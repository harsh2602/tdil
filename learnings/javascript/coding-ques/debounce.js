function debounce(fn, time) {
  let timeoutId;

  return function () {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, arguments);
      timeoutId = null;
    }, time);
  };
}
