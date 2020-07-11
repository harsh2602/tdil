### How could you get all truthy values in an array

```
const arr = [true, 0, false, 1, "", null, undefined, 2, -1];

arr.filter(Boolean); // This will return `[true,1,2,-1]`
```

A similar strategy could be used to apply to other data types like String, Number(though number will also return the `true` value owing to coercion).