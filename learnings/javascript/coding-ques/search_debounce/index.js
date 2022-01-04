const API_ENDPOINT = 'https://mocki.io/v1/c3826b84-cbb6-4f05-be9f-6f46f0f991cd';

function search(event) {
  const regExp = new RegExp(event.target.value.toLowerCase());
  let searchResults = [];

  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then(({ users }) => {
      users.filter((user) => {
        if (user.toLowerCase().match(regExp)) {
          searchResults.push(user);
          renderList(searchResults);
        }
      });
    });
}

function renderList(items) {
  const fragment = document.createDocumentFragment();
  const listContainer = document.querySelector('.list-results');
  listContainer.innerText = '';

  items.forEach((element) => {
    const listItem = document.createElement('li');
    listItem.textContent = element;
    fragment.appendChild(listItem);
  });

  listContainer.appendChild(fragment);
}

function debounce(fn, time) {
  let timeoutId;

  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, arguments);
      timeoutId = null;
    }, time);
  };
}

const searchDebounce = debounce(search, 3000);
