var searchTerms = [
  'apple',
  'apple watch',
  'apple macbook',
  'apple macbook pro',
  'iphone',
  'iphone 12',
];

function autocomplete(input) {
  if (input === '') return [];

  const regExp = new RegExp(input);

  return searchTerms.filter((term) => {
    if (term.match(regExp)) return term;
  });
}

function showResults(val) {
  let res = document.getElementById('result');
  res.innerHTML = '';

  let list = '';
  let terms = autocomplete(val);

  terms.forEach((term) => {
    list += `<li>${term}</li>`;
  });

  res.innerHTML = `<ul>${list}</ul>`;
}
