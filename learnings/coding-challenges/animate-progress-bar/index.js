const root = document.getElementById('root');

let count = 0;

function add() {
  if (count == 0) {
    create();
  }

  count += 1;
}

function create(time = 2) {
  const ele = document.createElement('div');
  ele.classList.add('progressBar');
  ele.style = `transition: width ${time}s ease`;

  root.appendChild(ele);

  setTimeout(() => {
    ele.classList.add('fullWidth');
  }, 1000);

  ele.addEventListener('transitionend', () => {
    count -= 1;

    if (count >= 1) {
      create();
    }
  });
}
