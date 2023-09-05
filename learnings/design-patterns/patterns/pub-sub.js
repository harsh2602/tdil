class PubSub {
  #subscriptionList = new Map();
  #subscriptionOnceList = new Map();
  #subscriptionOnceAsyncList = new Map();

  subscribe(name, callback) {
    if (!this.#subscriptionList.has(name)) {
      this.#subscriptionList.set(name, [callback]);
    } else {
      const existingCallbacks = this.#subscriptionList.get(name) ?? [];
      this.#subscriptionList.set(name, [...existingCallbacks, callback]);
    }

    return {
      remove: () => {
        const existingCallbacks = this.#subscriptionList.get(name) ?? [];
        const filteredCallbacks = existingCallbacks.filter(
          (e) => e !== callback,
        );
        this.#subscriptionList.set(name, filteredCallbacks);
      },
    };
  }

  subscribeOnce(name, callback) {
    if (!this.#subscriptionOnceList.has(name)) {
      this.#subscriptionOnceList.set(name, [callback]);
    } else {
      const existingCallbacks = this.#subscriptionOnceList.get(name) ?? [];
      this.#subscriptionOnceList.set(name, [...existingCallbacks, callback]);
    }
  }

  subscribeOnceAsync(name) {
    return new Promise((resolve, reject) => {
      if (!this.#subscriptionOnceAsyncList.has(name)) {
        this.#subscriptionOnceAsyncList.set(name, [resolve]);
      } else {
        const existingCallbacks =
          this.#subscriptionOnceAsyncList.get(name) ?? [];
        this.#subscriptionOnceAsyncList.set(name, [
          ...existingCallbacks,
          resolve,
        ]);
      }
    });
  }

  publish(name, data) {
    const callbacks = this.#subscriptionList.get(name) ?? [];
    callbacks.forEach((e) => e(data));

    const subscribeOnceCallbacks = this.#subscriptionOnceList.get(name) ?? [];
    subscribeOnceCallbacks.forEach((e) => {
      e(data);
    });

    this.#subscriptionOnceList.set(name, []);

    const subscribeOnceAsyncCallbacks =
      this.#subscriptionOnceAsyncList.get(name) ?? [];
    subscribeOnceAsyncCallbacks.forEach((e) => {
      e(data);
    });

    this.#subscriptionOnceAsyncList.set(name, []);
  }

  publishAll(data) {
    const entries = this.#subscriptionList.entries();
    for (let [, value] of entries) {
      value.forEach((e) => {
        e(data);
      });
    }
  }
}

const events = new PubSub();

const newEvent = events.subscribe('new-event', (data) => {
  console.log(`event 1 for ${data}`);
});

const newEvent2 = events.subscribe('new-event', (data) => {
  console.log(`event 2 for ${data}`);
});

// Will trigger for both event1 and event2
events.publishAll('FooBar');

events.publish('new-event', 'Harsh');
events.publish('new-event', 'Anku');

// Removing event 1
newEvent.remove();
// Will only publish event 2
events.publish('new-event', 'Harsh');
events.publish('new-event', 'Anku');

const onceEvent = events.subscribeOnce('new-once', (data) => {
  console.log(`once event for ${data}`);
});

const onceEventAgain = events.subscribeOnce('new-once', (data) => {
  console.log(`again event for ${data}`);
});

events.publish('new-once', 'News');
// Not fired
events.publish('new-once', 'CNN');
events.publish('new-once', 'FOX');

events.subscribeOnceAsync('new-user').then(function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish('new-user', 'Foo Once Async');
