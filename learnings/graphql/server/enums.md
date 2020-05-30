### Enums

Like any other language(e.g. Typescript or Java), enums in graphql also allow you to declare enums to restrict a field to a particular value.

```
enum PetType {
  CAT
  DOG
}

type Pet {
  id: ID
  type: PetType! # Pet can be of type DOG or CAT
  name: String
}

input NewPetInput {
  name: String!
  type: PetType! # Can use the PetType in the query and mutation as well
}
```

On the client side:

```
{
  pets(input: { type: DOG, name: "Nathan"}) { # enum will resolve to string by default
  id
  type
  name
  }
}
```