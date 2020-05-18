## Building a custom hook

Below code combines `useState` and `useEffect` into a `useLocalStorage` hook

```
import React, { useState, useEffect } from 'react';

const getStateFromLocalStorage = (defaultValue, key) => {
  const storage = localStorage.getItem(key);
  if (storage) return JSON.parse(storage).value;
  return defaultValue;
};

const useLocalStorage = (initialValue, key) => {
  const storageValue = getStateFromLocalStorage(initialValue, key);
  const [value, setValue] = useState(storageValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
};

const Counter = ({ max }) => {
  const [count, setCount] = useLocalStorage(0, 'count');

  const increment = () => {
    setCount(count + 1);
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