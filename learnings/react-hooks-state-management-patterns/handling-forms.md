## Handling Forms

The `useState` pattern is good for storing and updating single value (though it could be extended to store and update objects and arrays which is not recommended). It isn't great for handling form state something which `setState` was very effective to do.

```
const state = {
  firstName: '',
  lastName: '',
  password: '',
  email: ''
}
```

For any updates to the state:

```
// this.setState pattern:

this.setState({firstName: "First", lastName: "Last" });

// in case of useState:

setFirstName("First");
setLastName("Last");
```

As you can see it's not great once number of fields increase. Suppose we have a form where the field name corresponds to the value from the state. We could effectively do:

```
this.setState({
  [event.target.name]: event.target.value
});
```

and apply this in the onchange method.

`useReducer's` powerful dispatch method can be used to achieve the same behavior:

```
const reducer = (previousState = {}, updatedState = {}) => {
  return { ...previousState, ...updatedState };
};

const useSetState = (initialState = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = updatedState => dispatch(updatedState);

  return [state, setState];
};

// In the component:

const [state, setState] = useSetState(initialState);

// to be called in onchange
const handleChange = event => {
    setState({
      [event.target.name]: event.target.value
    })
  }
```

The `setState` in the component is from the `useSetState` which dispatches the updatedState to the reducer. The reducer takes the previousState and updatedState and merges them together which is essentially the behavior of the setState in class based components.
