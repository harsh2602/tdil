## requestAnimationFrame

The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. 
To run smooth animations(`60 fps`) we could include an animation logic in setinterval as below:

```
setInterval(() => {
  // animation logic
}, 1000/60);
```

To do it in a better way, we can use `requestAnimationFrame`.

#### Advantages:

1. Browser can optimize so animations will be smoother
2. Animations stop in inactive tabs, hence CPU and battery friendly

How it looks in skeleton code:

```
function animateSomething() {
  /** 
  * animation logic and conditional to stop
  * the animation comes here
  **/

  /** 
  * recursively call the animation: 
  * This step is important if you want to  
  * animate after the next repaint
  **/
  requestAnimationFrame(animateSomething);
}

// Kick-off animation
requestAnimationFrame(animateSomething)
```

### NOTE: This will request an animation trigger before the browser performs a next repaint. The number of callbacks would usually be 60 fps, but the brewser will generally match the screen refresh rate.

The callback method is passed a single argument `DOMHighResTimeStamp`, which indicates the current time(ms). 
When callbacks queued by `requestAnimationFrame` begin to execute in a single frame, each receives the same timestamp even if time has passed during the computation of previous workload.

Example:

```
function moveElement(duration, distance, element) {
  /**
  * Current Timestamp
  ** /
  const start = performance.now();

    function toMove(currentTime) {
    // Animation logic
    const elapsedTime = currentTime - start;
    const progress = elapsedTime/duration;
    const distanceToMove = progress * distance;

    // CSS Transform to move element
    element.style.transform = `translateX(${distanceToMove}px)`;

    if(amountToMove < distance) {
      requestAnimationFrame(toMove)
    }
  }

  requestAnimationFrame(toMove);
}
```

* For differences between performance.now and Date.now: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

Just like setInterval, requestAnimationFrame also returns a `long` integer value that uniquely identifies the callback. To cancel the callback we could use `cancelAnimationFrame()`.

```
// Start an animation
let stopId = window.requestAnimationFrame(callbackFn);
// Stop Animation
cancelAnimationFrame(stopId);
```