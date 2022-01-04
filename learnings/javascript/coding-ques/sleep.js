const sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

async function run() {
  await sleep(2000);
  console.log('Hello');
  await sleep(2000);
  console.log('world');
}

run()
