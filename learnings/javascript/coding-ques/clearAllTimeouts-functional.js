function func1() {
  console.log('func1');
}

function func2() {
  console.log('func2');
}

function func3() {
  console.log('func3');
}

/**
 * cancel all timer from window.setTimeout
 */
function clearAllTimeout() {
  // Since the timeout id is incremental, just get the largest one by making one setTimeout call and down level to clear all.
  let id = setTimeout(null, 0);
  console.log('id before:', id);
  while (id >= 0) {
    console.log('ID::', id);
    clearTimeout(id);
    id--;
  }
}

const timerId1 = setTimeout(func1, 1000);
const timerId2 = setTimeout(func2, 1000);
const timerId3 = setTimeout(func3, 1000);
console.log(timerId1, timerId2, timerId3);
clearAllTimeout();
