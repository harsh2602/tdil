## Thunk

A thunk is a function that is returned by another function. It allows us to think about this idea of `"Here's a thing run it, once it returns a result, do this other thing"`. This is the whole idea behind something like a redux-thunk where you fire an API request and wait for the response to comeback before dispatching the actual action.

```
function this_is_a_wrapper_function() {
  return thunk_function () {
    console.log("I come from a thunk");
  }
}

const execLater = this_is_a_wrapper_function();
execLater(); // I come from a thunk
```

Hence, you can see from the code snippet that the idea is that it is code that is to be executed later.