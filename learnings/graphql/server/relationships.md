## Relationships

Realtionships is basically the `graph in graphql`. Relationship is when we don't have a relationship between two fields in our database but want to virtualize it as a realtionship in graphql schema. E.g., in a pet app, how to link Pet to a User and and User to Pets i.e. two complex types to each other. This is where the design decision on querying comes into picture as a client can send huge queries with large depth trying to DDos the graphql server.

In traditional REST API, the api is a predefined list of operations that always return the same shapes. In graphql api, we have a set of nodes that know how to resolve themselves and have links to other nodes. This enables the client to ask for nodes and use links to follow towards other nodes.

#### Adding a relationship

We will add field resolvers for relationships.

```
type User {
  id: ID!
  username: String!
  pets: [Pet]!
}

type Pet {
  id: ID!
  type: PetType!
  name: String
  owner: User ## no direct field in datasource so graphql cannot resolve
}

// So now Pet has a field owner which resolves to User which has a field pets which is an array of Pet

// In our field level resolvers:

Pet: {
    owner(pet, _, {models}) { // *
      return models.User.findOne({id: pet.user})
    }
  }
User: {
    pets(user, _, {models}) {// **
      return models.Pet.findMany({user: user.id})
    }
  }
```

For lines * and **, we have a first argument which is the value that is returned once we resolve and return the top level resolver which in this case will be in the `Query resolvers` for User and Pet.

The client can issue a request like:

```
{
  user{
    pets{
      owner{
        username
        pets {
          owner {
            id
            pets{
              name
              -------
              -------
            }
          }
        }
      }
    }
  }
}
```

#### NOTE: This can go on for few more depths before we DDoS the server. And since graphql is just one request, a CDN cannot help in request caching. There are libraries which can help out in request limiting by restricting the depth you can go to fetch information. Design depends based on what works the individual application.

* Remember, field level resolvers run in parallel, so at no point depend on one resolver value to resolve another resolver.