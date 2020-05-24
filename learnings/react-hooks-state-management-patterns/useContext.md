## useContext

useContext app is a way to take care of the prop-drilling problem mentioned in the app example used in useReducer.

```
const value = useContext(AppContext);
```

Accepts a `context object`: the value returned by `React.createContext` and returns the current context value for that context. The current context value is determined by the value prop of the nearest `<AppContext.Provider>` above the calling component in the tree.

Now our application's `src` folder will be like:

```
src
  -- index.js
  -- App.js
  -- NewTodo.js
  -- Todo.js
  -- Todos.js
  -- TodosContext.js
```

We will move all the applicationlogic out of the App.js and to TodosContext.js. We will also make use of the Context API to pass down the props down our props directly to components needing it.

```
// TodosContext

export const TodoContext = createContext(); // (*)

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

const AppProvider = () => {
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

  const value = { todos, addTodo, finishTodo };

  return (
    <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
  );
};
```

At line * we create the context object using `useContext`. This provides us with a `Context Provider` and `Context Consumer` property. Whatever we want to pass down to the children component, we can pass it down as a `value` prop in the provider.
Look at the return of the `AppProvider`.

This context will then be passed down to whatever component tree wants these props.

```
// index.js

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  rootElement
);
```

Now we don't need to pass the props in the App.js. Instead `todos, addTodo, finishTodo` can be directly passed to components that need it.

```
// Todo.js

const Todo = memo(({ todo }) => {
  const { finishTodo } = useContext(TodoContext);

  const todoDone = () => finishTodo(grudge.id);

  return (
    <article>
      <h3>{todo.name}</h3>
      <p>{todo.description}</p>
      <div>
        <label >
          <input type="checkbox" checked={todo.done} onChange={todoDone} />{' '}
          Done
        </label>
      </div>
    </article>
  );
});
```

Note the use of `useContext` to make use of the context which was passed down using the provider. 

```
// Similarly update to NewTodo.js
-------------
-------------

// Updated App.js

const App = () => {
  return (
    <div>
      <NewTodo />
      <Todos />
    </div>
  );
};
```

Even though we got past prop driliing, with the context API in place, `React.memo` has now no chance to know whether the prop has changed or not. So the problem of re-rendering is back in business. Based on your app, it's a total it depends situation whether you'd choose to have the performance a prioirty over the readability.