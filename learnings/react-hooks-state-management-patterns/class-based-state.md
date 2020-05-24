### Refresher to Class Based State in React

This Refresher will act as a build up to the first two hooks that we are going to see: `useState` and `useEffect`.

Let's take an example of our beloved counter application with the capability of increment, decrement and reset.


```
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    this.increment = this.increment.bind(this); // *
    this.decrement = this.decrement.bind(this); // **
    this.reset = this.reset.bind(this); // ***
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  reset() {
    this.setState({ count: 0 });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}
```

Lines *, **, *** are essential to ensure that the correct context of execution is available while calling  the `onClick` event on the listener. We could also define these functions as arrow function to manage the correct context.

At this point our `Counter` works fine and we can move on.

Let's make another change to our increment function:

```
increment() {
  this.setState({ count: this.state.count + 1 });
  this.setState({ count: this.state.count + 1 });

  console.log(this.state.count);
}
```

Q. What will be the result of console.log?

A. 0, since console.log is synchronous

Q. What will be the value of `this.state.count` if previous value was 0? 

A. It will be 1. `setState` is asynchronous. React will queue up all the setState and execute them later to trigger a re-render. The entire goal here for React is to avoid unnecessary re-renders.

Follow up Question: setState is asynchronous, but why would the value still be 1. setState was called twice so it should be incremented to 2?

A. No, as I mentioned we are queuing up changes. React will batch them and execute at a later point in time.
That means you tell React that for count, `Set is to 0 + 1` and again `Set it to 0 + 1`. It looks like the below snippet:

```
Object.assign(
  {},
  firstCallToSetState,
  secondCallToSetState,
  ....
)
```
`setState` can also take up a function. We will now update our increment now to:

```
increment() {
  this.setState(state => {
    return { count: state.count + 1 }
  })
}
```

Hit Increment button and the result will add a 1.

What if we update our increment to do the below?

```
increment() {
  this.setState(state => {
    return { count: state.count + 1 }
  })

  this.setState(state => {
    return { count: state.count + 1 }
  })

  this.setState(state => {
    return { count: state.count + 1 }
  })
}
```

Turns out the result will add a 3 to the count.

Turns out, React is not necessarily batching them. We could merge objects in JS but we cannot merge functions (You could compose functions but lets leave that discussion).

Then we could add some logic in setState.

```
increment() {
  this.setState((state, props) => {
    if (state.count >= props.max) return;
    return { count: state.count + 1 };
  });
  })
}

................................
................................
<Counter max={10}>
```

#### Note: Usage of a second parameter `props` in the function.

`this.setState` can also take a second argument which is a callback function that is executed once the first function is completed. The callback can be any side-effect.

```
increment() {
  this.setState((state, props) => {
    if (state.count >= props.max) return;
    return { count: state.count + 1 };
  }, () => {
    console.log(`After! ${this.state}`);
  });
  console.log(`Before! ${this.state}`)
  })
}
```
Output: 

```
Before! {count: 0} 
After! {count: 1}
```

Few other things I want to highlight with `setState`:

```
const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

const storeStateInLocalStorage = (state) => {
  localStorage.setItem('counterState', JSON.stringify(state));
};

const increment = (state, props) => {
  if (state.count >= props.max) return;
  return { count: state.count + 1 };
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();

    ------Omitted for brevity------
  }

  increment() {
    this.setState(increment, () => {
      storeStateInLocalStorage(this.state);
    });
  }
}
```

We could take the first argument of setState and put it out to it's own function. But in case of the callback function, it does not get a copy of the state. Hence we have to wrap it in a function here. I have used arrow function here but we could also use ```.bind``` syntax.

Or we could put it onto the class component itself:

```
storeStateInLocalStorage() {
  localStorage.setItem('counterState', JSON.stringify(this.state));
}

increment() {
  this.setState(increment, this.storeStateInLocalStorage);
}
```