### Interface

Interface is an abstract type that we can't use as field values but used as foundations for explicit Types. It is handy when you have Types that share common fileds but will differ slightly.

```
interface Book {
  title: String
  author: Author
}

type TextBook implements Book {
  title: String
  author: Author
  classes: [Class]
}

type ColoringBook implements Book {
  title: String
  author: Author
  colors: [Color]
}

type Query {
  schoolBooks: [Book]
}

const resolvers = {
  Book: {
    __resolveType(book) {  # __resolveType is needed to tell graphql how to resolve to exact type
      if(book.classes) {
        return 'Textbook'; # Can return the exact type as a string
      }

      if(book.colors){
        return 'ColoringBook';
      }

      return null;
    }
  }
}
```

On the client side you need to query for the differing field using the special `... on` syntax:

```
schoolBooks {
  __typename # this will return the exact types for the book instance: 'TextBook' and 'ColoringBook' here
  title
  ... on TextBook {
    classes {
      name
    }
  }
  ... on ColoringBook {
    colors {
      name
    }
  }
}
```

As you can see in the implementation, this is not for the sake of brevity but for not having repetitive queries.

### Unions

Unions are useful for returning disjoint data types from a single field. Union is like `type 1 or type 2 or type 3...`.

```
union Result = Book | Author

type Book {
  title: String
}

type Author {
  name: String
}

type Query {
  search: [Result]
}

const resolvers = {
  Result: {
    __resolveType(obj){
      if(obj.name){
        return 'Author';
      }

      if(obj.title){
        return 'Book';
      }

      return null;
    },
  },
  Query: {
    search: () => { ... }
  },
};
```

Client Side Query:

```
{
  search(contains: "") {
    ... on Book {
      title
    }
    ... on Author {
      name
    }
  }
}
```