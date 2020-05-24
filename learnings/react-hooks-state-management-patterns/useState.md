## Introduction to useState

Below is the Functional Counter component: 

```
const Counter = ({ max }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};
```

`useState` returns a value and a setter function. e.g. count and setCount in this case.

#### Differences

1. No need to use `bind`.
2. No need to use the `this` reference.
3. No constructor at all (since this works in a functional component).

Some scenarios from `setState`

#### Scenario 1:
```
const increment = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};

Output: 1
```
setter function can also accept a function like setState

```
const increment = () => {
  setCount(c => c + 1);
};
```

#### Scenario 2:

```
const increment = () => {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
};

Output: 3
```

- `setter` function does not take a second argument of `props`. It can only take the state. But we  still have it(props) in scope.

- setter does not support callback function (side-effects will be taken care by `useEffect` hook discussed later)

#### Scenario 3:

```
setCount(c => {
  if (c >= max) return; // (*) 
  return c + 1;
});
```

Q. In `this.setState` we returned `undefined` after hitting max? What would happen now?

A. It would break the application. Notice that here we only get the value of a particular piece of state whereas previously we passed the object of values that needed to update.

#### Scenario 3: Fix

Change line (*) to if (c >= max) return c;