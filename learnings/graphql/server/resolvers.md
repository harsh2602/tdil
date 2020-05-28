### Resolvers

An introduction to resolvers is already in [schemas.md](./schemas.md). Here I will highlight a bit more of the inner workings of resolvers.

Q. I already mentioned, we can have field level resolvers as well in a type. How does graphql achieve that?

A. By default GraphQL will look at the return object from a top level resolver and it will match the keys in that object with the fields in that object and it's return type one-to-one. So by default, it creates a resolver for every single field. This is called the `default resolver` and all it does is look for a key with the same name and resolves that field. That's how you can query an entire object for e.g. `User` but only return the `email` field on that. 

Even in the network tab, you will only see the field you asked for even though the resolver returned the entire object.

#### NOTE
An individual field level resolver will override whatever result was returned from the default resolver.

#### Arguments on a resolver

A resolver can have 4 arguments.:

```
type Pet {
  id: ID!
  name: String!
  img: String!

}

type Query {
  pets: [Pet]!
}

const resolver = {
  Query: {
    pets(_, {query}, {context}) {
      // returns array of pets
    }
  }
}
```

1. `initialValue`: Since pets is resolver for top level, the first argument is undefined. If you were resolving for a field e.g. `id` under type Pet, since Pet is resolved first the initialvalue would be a pet.

2. `query object`: If you send any arguments to run your query against e.g. a particular type of pet. 

3.  `context object`: This is third argument in the server object. Whatever extra information you want to pass can be passed in the context object:

```
const server = new ApolloServer({
  typeDefs, // (*)
  resolvers,
  context() {
    // return the extra information e.g. user info, models, db instance etc.
  }
})

//We will see an example later for 2 and 3
```

4. `abstract syntax tree`: This can be used for projections. Really advanced. Not going to use them most times.