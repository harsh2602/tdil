const userCardTemplate = document.querySelector('[data-user-template]');
const userCardsContainer = document.querySelector(
  '[data-user-cards-container]'
);
const searchInput = document.querySelector('[data-search]');

let users = [];

searchInput.addEventListener('input', (e) => {
  const { value } = e.target;
  users.forEach((user) => {
    const isVisible =
      `${user.email} ${user.name}`.toUpperCase().indexOf(value.toUpperCase()) >=
      0;

    user.element.classList.toggle('hide', !isVisible);
  });
});

fetch('https://jsonplaceholder.typicode.com/users')
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0]; // `cloneNode` creates a document fragment
      const header = card.querySelector('[data-header]');
      header.textContent = user.name;

      const body = card.querySelector('[data-body]');
      body.textContent = user.email;

      userCardsContainer.append(card);

      return { name: user.name, email: user.email, element: card };
    });
  });
