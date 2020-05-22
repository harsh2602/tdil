## useReducer

We saw that `useState` is good if we have to keep track of simple piece of state like the counter. What if the state of the application grows into multiple sub values? In such a scenario, a redux style hook `useReducer` makes more sense to use. 

In `useState`, to have a persisting state value across re-renders, you would have to club it with [useRef](https://reactjs.org/docs/hooks-reference.html#useref) as useState would not give you the ability to have a reference to the previous state value. `useReducer` alleviates this issue. 

#### What is a Reducer:

It's a function that takes some state of the application and an action that happened and returns a new state of the application.

```
const reducer = (state, action) => {
  ...........acts upon action...........
  returns newState;
}
```

The `useReducer` hook takes a `reducer` and an `initialState` and returns the `currentState` and a `dispatch` function.

```
const [state, dispatch] = useReducer(reducer, initialState)
```

Let's take a TODO app as an example to define how useReducer can be used.

```
src
  -- index.js
  -- App.js
  -- NewTodo.js
  -- Todo.js
  -- Todos.js

  // Todos.js is the list of all todo.
```

```
// App.js

const ADD_TODO = 'ADD_TODO';
const FINISH_TODO = 'FINISH_TODO';

const reducer = (state = [], action) => {
  if (action.type === ADD_TODO) {
    return [action.payload, ...state];
  }

  if (action.type === FINISH_TODO) {
    return state.map((todo) => {
      if (todo.id === action.payload.id)
        return {
          ...todo,
          done: !todo.done
        };
      return todo;
    });
  }
  return state;
}


// const initialState = [
//   ----------
//   {
//     id: 'id-value',
//     name: 'todo-name',
//     description: 'todo-description',
//     done: boolean
//   }
//   ----------
// ]

const App = () => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  const addTodo = ({ name, description }) => {
    dispatch({
      type: ADD_TODO,
      payload: {
        name,
        description,
        done: false,
        id: id() // random id generation function
      }
    });
  }

  const finishTodo = (id) => {
    dispatch({
      type: FINISH_TODO,
      payload: {
        id
      }
    });
  }

  return (
    <div>
      <NewTodo onSubmit={addTodo}/>
      <Todos todos={todos} onFinish={finishTodo}/>
    </div>
  );
};


// Todos.js

const Todos = ({ todos = [], onFinish }) => {
  return (
    <section>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} onFinish={onFinish} />
      ))}
    </section>
  );
};

// Todo.js

const Todo = ({ todo, onFinish }) => {
  const finishTodo = () => onFinish(todo.id);

  return (
    <article>
      <h3>{todo.name}</h3>
      <p>{todo.description}</p>
      <div>
        <label>
          <input type="checkbox" checked={todo.done} onChange={finishTodo} />{' '}
          Done
        </label>
      </div>
    </article>
  );
};

// NewTodo.js

const NewTodo = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = event => {
    event.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleChange}>
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <input
        placeholder="Description"
        type="text"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <input name="submit" type="submit" />
    </form>
  );
};
```

A lot of stuff that you see is similar to Redux.

- We have a reducer function in our App.js.
- `addTodo` and `finishTodo` are the action creators which dispatch the respective actions.
- ADD_TODO and FINISH_TODO are the actions.

One major advantage we get here is that all our component is abstracted away from the logic to be performed. We will refine it further.

There are two problems now:

1. If you enable the `highlight updates when components rerender` in React Dev Tools`, you will find any interaction with the App causes the entire app to re-render. 

2. Todos had to take into account `onFinish` to pass it onto Todo. This is called prop drilling as we know it. A problem which Redux took care of very well.

Further reading involves how we can solve for problem (1).

React provides us a function called `memo` which is basically memoization. React.memo basically `takes a function component and says if the props are the same from last time don't do anything.`

This means, we could solve the problem if we wrap our components `Todo` and `NewTodo` in `memo` we could avoid unnecessary re-renders.

```
// Todo.js

const Todo = memo(({ todo, onFinish }) => {
  const finishTodo = () => onFinish(todo.id);

  return (
    <article>
      <h3>{todo.name}</h3>
      <p>{todo.description}</p>
      <div>
        <label>
          <input type="checkbox" checked={todo.done} onChange={finishTodo} />{' '}
          Done
        </label>
      </div>
    </article>
  );
});

// Same for NewTodo.js
```

With this change, what we expect is not what happens. And the reason is not react but our good friend Javascript.

Look closely in App.js: You will realise that everytime we get a new copy of props. Hence, memo will check if props have changed and realise it has (even though values are the same) via a new copy of our action creators.

#### NOTE: React uses the Javascript [Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) alogrithm to make comparison. This the same it uses for in case of useState.

Hence, we need to make one more modification via a hook out of two choices:

- useMemo
- useCallback

```
useCallback(fn, deps) is equivalent to useMemo(() => fn,deps)
```

Hence, we will update our action creators with useCallback

```
const addTodo = useCallback(({ name, description }) => {
    dispatch({
      type: ADD_TODO,
      payload: {
        name,
        description,
        done: false,
        id: id() // random id generation function
      }
    });
  }, [dispatch])

  const finishTodo = useCallback((id) => {
    dispatch({
      type: FINISH_TODO,
      payload: {
        id
      }
    });
  }, [dispatch])
```

Now only updated components re-render. This reducer pattern enabled us to make use of this performance optimization which wouldn't have been possible with useState. 

E.g., with useState for the `addTodo` function, we would have to call a `setTodo([todo, ...todos])`. Everytime the entire todos array need to be updated for react to know something has change and re-render is needed.

The second problem of prop-drilling can be taken care of useContext hook which is similar to the Context API. This is continued in the useContext post.
