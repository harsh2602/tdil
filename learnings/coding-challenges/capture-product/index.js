const inViewPort = (element) => {
  const dimensions = element.getBoundingClientRect();
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    dimensions.top >= 0 &&
    dimensions.left >= 0 &&
    dimensions.right <= viewWidth &&
    dimensions.bottom <= viewHeight
  );
};

const detect = (element) => {
  const result = [];

  element.forEach((el) => {
    if (inViewPort(el)) {
      result.push(el.textContent);
    }
  });

  console.log(result);
};

function debounce(fn, time) {
  let timeoutId;

  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, time);
  };
}

const blocks = document.querySelectorAll('.blocks');

const debouncedDetect = debounce(() => detect(blocks), 300);

window.addEventListener('scroll', debouncedDetect);
