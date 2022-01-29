const movies = [
  {
    name: 'Shawshank Redemption',
    description: 'story of escape from the prison bit by bit',
  },
  {
    name: 'Forrest Gump',
    description: 'How a person achieves greatness just by running',
  },
  {
    name: 'Andaz Apna Apna',
    description: 'Amar Prem Mark Teja Karishma Reveena',
  },
];

const filterResults = (searchTerm, input) => {
  return input
    .filter(
      (movie) =>
        `${movie.name} ${movie.description}`
          .toUpperCase()
          .indexOf(searchTerm.toUpperCase()) >= 0
    )
    .map(({ name }) => ({ name }));
};

console.log(filterResults('an', movies)); // [{name: 'Shawshank Redemption'}, {name: 'Andaz Apna Apna'}]
