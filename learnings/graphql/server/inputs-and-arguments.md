### Arguments

Arguments allow clients to pass variables along with our queries to the resolvers. It would be the second argument in the resolver.

```
type Pet {
  id: ID!
  name: String!
  img: String!
}

type Query {
  pet(id: ID!): Pet! # (*)
}

// In the resolver

pet(_, {id}) {
  return models.Pet.findOne({id})
}

// 'id' is passed from the pet query in line (*); name has to match

// NOTE: comments in schema start with #
```

- Arguments cannot be any arbitrary values. It has to be validated from the schema.

- They can be added to any fields and not only queries

e.g. in the aboove type Pet:

```
type Pet {
  id: ID!
  name: String!
  type: String!
  img(height: String, width: String): String!
}
```
The height and width arguments can be used to get an image speciific to the device on which the client wants to render. Another way to do that is with `directives`.


- They have to be `Scalars` or `InputTypes`.

E.g. something in the query like pet(id: Pet) is no t allowed since Pet is not an input type.

### Input Type

Input Types are just like types but used for Arguments. All the fields on the input types eventually have to resolve to a scalar but they can be other input types.

```
input PetInput {
  name: String
  type: String
}

type Query {
  pets(input: PetInput): [Pet]!
}

// In the resolver
pets(_, {input}) { / (*)
  // resolve for pets using input.name and input.
}
```

In line (*) input is an object that contains a name and a type.

- You cannot extend a type to an input type.

```
input PetInput {
  name: String
  type: String
  ...Pet.fields # not allowed
}
```

This is because GraphQL internals treat the AST for input types differently than the internals for type.

On the client side: 

```
{
  pets(input: { type: "DOG", name: "Nathan"}) {
  id
  type
  name
  }
}
```