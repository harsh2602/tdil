const myPromisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      function customCallback(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results.length === 1 ? results[0] : results);
        }
      }
      args.push(customCallback);
      fn.call(this, ...args);
    });
  };
};

const getSumAsync = (num1, num2, callback) => {
  if (!num1 || !num2) {
    return callback(new Error('Missing arguments'), null);
  }
  return callback(null, num1 + num2);
};

const getSumPromise = myPromisify(getSumAsync);
getSumPromise(1, 1).then(console.log).catch(console.log); // 2
