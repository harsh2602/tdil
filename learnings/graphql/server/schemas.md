## Schemas

A schema is like a contract that defines how your data will look like. Once you create a graphQL server you would need to create a schema. It is where you define type defintions using a `Schema Definition Language (SDL)`. 

Parts of Schema:

1. Types
2. Fields
3. Scalars: String, ID, Boolean, Int, Float
4. Query
5. Mutations

#### Note: ID represents a unique identifier which is serialized the same way as a String. However the intent is to not make it human readable.

We will be using the GraphQL apollo server implementation. It is one of the popular implentations and is widely used.

Let's declare a schema with a type, query and resolver. This is the basic stuff you need for a server to be useful:

```
const gql = require('graphql-tag)
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
  type User {
    email: String! # Signifies Not Null
    name: String
    friends: [User]! 
  }

  type Query {
    me: User!
  }
`

const resolver = {
  Query: {
    me() {
      return {
        email: 'example@eg.com',
        name: 'Example User',
        friends: []
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs, // (*)
  resolvers
})

server.listen(4000)
  .then(() => console.log('listening on port 4000'));
```

If you have multiple typedefs in separate files, line (*) can be an array of type defintions.

As you can see, we defined a type `User`, added a `me` query that returns the a type User and set a resolver for the **me** query type to say what object it is going to return. This is just the bare minimum a server needs to be useful as a graphql server.

In a nutshell: 

```
Schema + Resolvers => Server
```

### Typedef

Typedef is whatever type is defined in the schema. `User + Query` in above code. 

### Query

Query is a special `type` on a schema that defines operations clients can perform to access data that resembles the shape of other types in the Schema.

In the above code the query type having a `me` query which returns the shape of type User. You could similarly return scalars here.

### Resolvers

Functions that are responsible for returning values for fields that exist on Types in Schema. It's execution depends on the incoming client query.

In the above code, we are resolving the `me` query which in turn returns the object as is expected by the query. 

- Resolver name has to match the name in the type (`me` in Query Type).
- Resolver must return the value type declared for the matching field (me returns a type `User` in the Query)

You could also write a resolver for each single field on a type as well. Unless asked, the resolvers won't even run for a particular field. This is actually the graph nature in graphql.

##### Some important points to note:

1. GraphQL only has one endpoint most of the time is `POST`(though you could do things over `GET` too).

2. It does not respect HTTP. There is no error response. Hence every response is a status code 200 in graphql. You probably need to use the response message to decide whether the request was success or a failure response.

3. Resolvers can be async, you can retrieve data from any source. Graphql won't care 

NOTE: Stuff like this will make you decide how you can save your server from DDos due to query complexity.A number of libraries and suggesstion blogs explain the how.