## Introduction to useEffect

useEffect allows us to handle a side effect in our component

Basically useEffect is a combination of `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`.

Let's extend our example from `useState` to write the state to `localStorage`
(I am adding to the billion tutorials already available on internet who use this example to demonstarte useEffect)

```
const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

const storeStateInLocalStorage = (state) => {
  localStorage.setItem('counterState', JSON.stringify(state));
};

const Counter = ({ max }) => {
  const [count, setCount] = useState(getStateFromLocalStorage().count);

  const increment = () => {
    setCount((c) => {
      if (c >= max) return c;
      return c + 1;
    });
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  useEffect(() => { // *
    storeStateInLocalStorage({ count });
  }, [count]);

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

Look for useEffect on line `*`.

- It takes a callback which is the side-effect to perform once a piece of state changes. 
- Second argument is the dependency list which basically tells run the effect when the particular piece of state changes. If not passed, the effect runs on every render. For empty list `[]`, the effect runs only on component mount. In the above example, the effect runs only when count is updated.

Hence we see, `useEffect` combines the three lifecycle methods: `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`

#### persisting state with useEffect

In the class based implementation, state is just a single object that is being updated. But in a functional component, a new copy of the function is created. This is essentially how JS works. So How do we persist state?

Using the `useRef` hook.

```
const countRef = useRef();

// Yields an API: { current: null }

countRef.current = count;

useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${countRef.current} times`);
    }, 3000);
  }, [count]);

// Output (assuming I click the button 4 times): `You clicked 4 times` logged as many times to the console
```

If I would have used `count` instead of the ref, I would have the following output:

```
Output:

You clicked 1 times
You clicked 2 times
You clicked 3 times
You clicked 4 times
```

There are 2 types of useEffects: 

1. with cleanup
2. without cleanup (Fire and forget like above example)

#### useEffect with cleanup

Consider the code below:

```
useEffect(() => {
  setInterval(() => {
    console.log(`Count ${count}`);
  }, 3000);
}, [count]);
```

The above code will register a new interval for every count value and log it to the console every 3000 ms. Imagine this being a request to a server. This could DDoS the server. Hence, useEffect provides a clean up API which is bascially returning from the function. Look at the following code:

```
useEffect(() => {
  const interval = setInterval(() => {
    console.log(`Count ${count}`);
  }, 3000);
  return () => {
    clearInterval(interval);
  };
}, [count]);
```

Now, only current current count value will log to the console after every 3000 ms.



