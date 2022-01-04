const sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

console.log('Hi');
sleep(10000);
console.log('Hello');
