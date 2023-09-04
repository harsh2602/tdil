export const createBook = (title, author, isbn) => ({
  title,
  author,
  isbn,
});

export const book1 = createBook('Harry Potter', 'JK Rowling', 'AB123');

export const book2 = createBook(
  'The Great Gatsby',
  'F. Scott Fitzgerald',
  'CD456',
);

export const book3 = createBook('Moby-Dick', 'Herman Melville', 'EF789');

export const book4 = createBook('Harry Potter', 'JK Rowling', 'AB123');

export const book5 = createBook(
  'The Great Gatsby',
  'F. Scott Fitzgerald',
  'CD456',
);
