## Mutations

Just like Queries are used to read data from the server, you could use mutations to create or update data on the server. It is essentially used to perform the create, update and delete operations. Mutations can also accept arguments like queries.

Mutation (like Query) is also a special type in GraphQL Schema.

```
input NewPetInput {
  name: String!
  type: String!
}

type Mutation {
  addPet(input: NewPetInput!): Pet!
}
```

Here what I mean is that create a new pet of type `Pet` by passing an input object of type `NewPetInput` with non-null `name` and `type` fields. 

A resolver would look like:

```
Mutation: {
    addPet(_, {input}, {models, user}) {
      // Create a Pet and return it
    }
  },
```

#### NOTE: It is always a good practice to return some kind of value from the Mutation to take advantage of the client side caching which a lot of graphql implementations provide on the client side. This would in turn avoid making another query to the server for the data after the mutation is performed. 

On the client side:

```
addPet(input: {type: "DOG", name: "Rudy"}) {
  id
  type
  name
}
```