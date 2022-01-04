// Write a function that returns the value at a give path
/*
    let testObj = {
        foo: 2,
        bar: 'car',
        baz: {x: 'xx', y: 'yy', biz: {a: 56}}
    };
    getByPath(['baz', 'biz', 'a'], testObj); //56
 */
function getByPath(pathArr, obj) {
  const [first, ...rest] = pathArr;

  if (!first || !obj[first]) return undefined;

  if (rest.length < 1) {
    return obj[first];
  } else {
    return getByPath(rest, obj[first]);
  }
}

let testObj = {
  foo: 2,
  bar: 'car',
  baz: { x: 'xx', y: 'yy', biz: { a: 56 } },
};
getByPath(['baz', 'biz', 'a'], testObj); //56
