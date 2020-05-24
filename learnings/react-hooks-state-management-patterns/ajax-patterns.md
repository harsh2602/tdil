## State Management patterns for AJAX request

As stated earlier, `useEffect` can be used to make ajax request to a server to fetch data.

```
// Fetching from https://rickandmortyapi.com/api/character/

const [characters, setCharacters] = useState({})
useEffect(() => {
  fetch(https://rickandmortyapi.com/api/character/)
    .then(response => response.json())
    .then(response => {
      setCharacters(response.results);
    })
    .catch(console.error);
});
```

With the above code, we have not defined any dependency as the second argument of `useEffect`. This has triggered a `infinite loop` since we are calling the effect on every render.

Pass the second argument to above effect i.e. an empty array `[]`. This will only trigger the effect once on component mount.


### Patterns

1. Using `useState` to manage states

We have loading and error states to display in our component

```
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

const [characters, setCharacters] = useState({})

useEffect(() => {
  setLoading(true);
  setError(null);
  setCharacters({});

  fetch(https://rickandmortyapi.com/api/character/)
    .then(response => response.json())
    .then(response => {
      setCharacters(response.results);
    })
    .catch(error => {
      setError(error);
    }).finally(() => {
      setLoading(false);
    });
});
```

As you can see above this pattern could be abstracted into it's own fetch custom hook. There is numerous ones already available on npm with the same abstraction but this helps in understanding how the patterns can be used to setup hooks to solve our custom problems.

We will call the hook as `useFetch`. I cannot come with a better name but so as a lot of smart people whom I am learning this from.

```
const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setResponse([]);
    setError(null);

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setResponse(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [url]);

  return [response, loading, error];
};

// In the component

const [response, loading, error] = useFetch(https://rickandmortyapi.com/api/character/);
```

What we have done is abstracted the logic regarding fetch to a function and away from our component. Component can just take the value and use it for the presentation.

We could refactor this better using the powers of the `useReducer` pattern.

```
// Define the different states as an object

const initialState = {
  response: null,
  loading: true,
  error: null,
};

const LOADING = 'LOADING';
const RESPONSE_COMPLETE = 'RESPONSE_COMPLETE';
const ERROR = 'ERROR';

// Our fetch reducer function:

const fetchReducer = (state, action) => {
  if (action.type === LOADING) {
    return initialState;
  }

  if (action.type === RESPONSE_COMPLETE) {
    return {
      response: action.payload.response,
      loading: null,
      error: null,
    };
  }

  if (action.type === ERROR) {
    return {
      response: null,
      loading: null,
      error: action.payload.error,
    };
  }
  return state;
};

// useFetch with the reducer pattern:

const useFetch = (url) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: LOADING });
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: RESPONSE_COMPLETE, payload: { response } });
      })
      .catch((error) => dispatch({ type: ERROR, payload: { error } }));
  }, [url]);

  const { response, loading, error } = state;
  return [response, loading, error];
};
```

As we can see with the above reducer pattern we are able to abstract the states even more.

Redux gives us this idea of middlewares that sit between an action creator and the reducer. For AJAX request, we have a special middleware called `redux-thunk` to effectively teach redux how to deal with new kinds of actions.

Using hooks, we can use the thunk pattern to dispense the asynchronous actions.

```
const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = React.useCallback(
    (action) => {
      console.log(action); / (*)

      if (isFunction(action)) {
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch],
  );

  return [state, enhancedDispatch];
};

const fetchCharacters = (dispatch) => {
  dispatch({ type: 'LOADING' });
  fetch('https://rickandmortyapi.com/api/character/')
    .then((response) => response.json())
    .then((response) =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { characters: response.results },
      }),
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
};


const Application = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { results } = state;

  return (
    <div className="Application">
      <header>
        <h1>Rick & Morty Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => dispatch(fetchCharacters)}>
            Fetch Characters
          </button>
          <CharacterList characters={results} />
        </section>
      </main>
    </div>
  );
};
```

You can see on line (*) that this type of implementation has given us the ability to have a logging middleware for starters.
We now have a totally separate function for fetching the data that our state management doesn't know anything about.

* In recap, we started with `useState`, then refactored out to a custom hook to make our component not care about the state management.Then we refined it further using `useReducer`.

* Then to take it further (like redux), we can separate our state management away from our network request and also extend it per our needs to introduce middlewares.