const starContainer = document.querySelector('.stars');
const stars = document.querySelectorAll('.star');
let filled = 0;

starContainer.addEventListener('click', (e) => {
  filled = e.target.dataset.index;

  for (let i = 0; i < stars.length; i++) {
    if (i < filled) {
      stars[i].classList.add('filled');
    } else {
      stars[i].classList.remove('filled');
    }
  }

  document.querySelector('.rating-value').innerHTML = `Rating Count: ${filled}`;
});

starContainer.addEventListener('mouseover', (e) => {
  let rating = e.target.dataset.index;

  for (let i = 0; i < stars.length; i++) {
    if (i < rating) {
      stars[i].classList.add('filled');
    } else {
      stars[i].classList.remove('filled');
    }
  }
});

starContainer.addEventListener('mouseout', () => {
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove('filled');
  }

  for (let i = 0; i < filled; i++) {
    stars[i].classList.add('filled');
  }
});
