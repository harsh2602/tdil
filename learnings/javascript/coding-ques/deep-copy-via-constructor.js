function deepCopy(obj) {
  if (null === obj || 'object' !== typeof obj) return obj;

  switch (obj.constructor) {
    case Boolean:
      return new Boolean(obj);
    case Number:
      return new Number(obj);
    case String:
      return new String(obj);
    case Date:
      return new Date().setTime(obj.getTime());
    case Array:
      return obj.map((o) => deepCopy(o));
    case RegExp:
      return new RegExp(obj);
    case BigInt:
      return BigInt(obj);
    case Object: {
      let copy = {};
      Object.keys(obj).forEach((key) => {
        if (obj.hasOwnProperty(key)) copy[key] = deepCopy(obj[key]);
      });
      return copy;
    }
  }
  return obj;
}

console.log(
  JSON.stringify(
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
  )
);
