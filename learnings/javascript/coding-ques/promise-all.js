// Recursive
Promise.all = function promiseAllRecursive(values) {
  if (values.length === 0) {
    return Promise.resolve([]);
  }

  const [first, ...rest] = values;

  return Promise.resolve(first).then((firstResult) => {
    return promiseAllRecursive(rest).then((restResults) => {
      return [firstResult, restResults];
    });
  });
};

// Iterative
Promise.all = function promiseAllIterative(values) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    values.forEach((value) => {
      Promise.resolve(value)
        .then((result) => {
          results.push(result);
          completed += 1;

          if (completed === values.length) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    });
  });
};

// Reduce
Promise.all = function promiseAllReduce(values) {
  return values.reduce((acc, value) => {
    return acc.then((results) => {
      return Promise.resolve(value).then((result) => {
        return [...results, result];
      });
    });
  }, Promise.resolve([]));
};
