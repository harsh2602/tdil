## scrollRestoration

This property of the `History` Web API gives the ability to web applications to have scroll restoration on a web page when the app uses history navigation.

It has two properties:

1. `auto`: restore the location of page until where the user scrolled.
2. `manaul`: do not restore, user will have to scroll back manually.

Consider a long list in a web page. Clickcing on an element navigates to a new page. Once you navigate using the back button (or e.g. using `history.back()`) the scoll position would be where the user had last scrolled to. This means:

```
window.history.scrollRestoration === "auto" // true
```

To override this behavior change the value of history to `manual`. 

#### NOTE: As I found out while running my small demo to verify things, refreshing the web page would not reset the value to original value, meaning if I override value from auto to manual it will stay manual even after I refresh the page (refresh can be achieved programmatically by history.go()).