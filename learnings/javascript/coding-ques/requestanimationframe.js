function moveElement(duration, distance, element) {
  const start = performance.now();

  function move(currentTime /* DOMHighResTimestamp */) {
    const progress = (currentTime - start) / duration;

    const amountToMove = progress * distance;

    element.style.transform = `translated(${amountToMove}px)`;

    if (amountToMove < distance) {
      requestAnimationFrame(move);
    }
  }

  requestAnimationFrame(move);
}
