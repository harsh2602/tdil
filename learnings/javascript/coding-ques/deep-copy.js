function deepCopy(obj) {
  const seen = new WeakMap();

  function logic(obj) {
    const newObj = Array.isArray(obj) ? [] : {};
    if (!seen.has(obj)) {
      seen.set(obj, newObj);
      for (const [key, value] of Object.entries(obj)) {
        newObj[key] = typeof value === 'object' ? logic(value) : value;
      }
    } else {
      return seen.get(obj);
    }
    return newObj;
  }
  return logic(obj);
}

console.log(
  deepCopy({
    a: 10,
    b: {
      c: 20,
      d: 40,
      e: {
        f: 10,
        g: {
          a: 10,
          b: {
            c: 20,
            d: 40,
            e: {
              f: () => () => 1,
            },
          },
        },
      },
    },
  })
);
