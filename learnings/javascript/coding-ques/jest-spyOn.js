/**
 * @param {object} obj
 * @param {string} methodName
 */
function spyOn(obj, methodName) {
  if (!obj[methodName]) throw new Error(`No such function: ${methodName}`);

  const calls = [];
  const originalMethod = obj[methodName];

  if (typeof originalMethod !== 'function')
    throw new Error(`${originalMethod} is not a function`);

  obj[methodName] = function (...args) {
    console.log('we call this one');
    calls.push(args);
    return originalMethod.apply(this, args);
  };

  return {
    calls,
  };
}

const obj = {
  data: 1,
  increment(num) {
    this.data += num;
  },
};

const spy = spyOn(obj, 'increment');
obj.increment(1);
console.log(obj.data); // 2
obj.increment(2);
console.log(obj.data); // 4

console.log(spy.calls); // [[1], [2]]
