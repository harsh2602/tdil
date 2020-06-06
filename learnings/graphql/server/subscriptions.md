### Subscriptions

Another `Type` in graphql, Subscriptions is a way for graphql operations to watch for emitted events. They rely on a publish and subscribe primitive to generate the event and notify a subscription with predictable responses. Like resolvers, subscriptions have no idea where the data is coming from.

#### Why use them?

- If latency is an issue when performing manual refetching and polling (e.g. chat apps)
- Huge initial state but changes are small

```
// in the schema:

type Subscription {
  newSigning: Player!
}

// in the resolver file at the top:

const { PubSub } = require('apollo-server');
const pubSub = new PubSub();
const NEW_SIGNING = "NEW_SIGNING";

// inside the query or mutation resolver where you want to listen for the event

pubSub.publish(NEW_SIGNING, { newSigning: player }); // New player has been created so publish the event

// inside the subscription resolver

Subscription: {
  newSigning: {
    subscribe: () => pubSub.asyncIterator(NEW_SIGNING), // this is where we subscribe to the event
  }
}
```

Then we can start listening to the changes in the playground by listening to the subscription. 