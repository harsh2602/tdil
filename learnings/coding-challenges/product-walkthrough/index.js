const wrapper = document.getElementById('wrapper');
let index = 0;
const steps = [2, 5, 6, 17, 'header', 13, 'footer', 10];

function highlight(id) {
  document.getElementById('highlight')?.remove();
  document.getElementById('popover')?.remove();

  const element = document.getElementById(id);

  scrollToElement(element);

  const dimensions = element.getBoundingClientRect();

  highlightHelper(dimensions);
  popover(dimensions);
}

const highlightHelper = (elementDimension) => {
  const { top, left, width, height } = elementDimension;

  const el = document.createElement('div');
  el.id = 'highlight';

  el.style = `
    top: ${top + window.scrollY}px;
    left: ${left + window.scrollX}px;
    width: ${width}px;
    height: ${height}px;
  `;

  wrapper.appendChild(el);

  setTimeout(() => {
    el.classList.add('highlighter');
  });
};

const prevNavigation = () => {
  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'prev';
  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index = index - 1;
      highlight(steps[index]);
    }
  });

  return prevBtn;
};

const nextNavigation = () => {
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'next';
  nextBtn.addEventListener('click', () => {
    if (index < steps.length - 1) {
      index += 1;
      highlight(steps[index]);
    }
  });

  return nextBtn;
};

const popover = (elementDimensions) => {
  const { bottom, left, width } = elementDimensions;

  const el = document.createElement('div');
  el.id = 'popover';

  el.style = `
    top: ${bottom}px;
    left: ${left + width / 2 - 50}px;
    height: 100px;
    width: 100px;
  `;

  const fragment = document.createDocumentFragment();
  fragment.appendChild(prevNavigation());
  fragment.appendChild(nextNavigation());

  el.appendChild(fragment);

  wrapper.appendChild(el);

  setTimeout(() => {
    el.classList.add('popover');
  });
};

const scrollToElement = (el) => {
  const elTop = el.offsetTop;

  window.scrollTo({ top: elTop, behavior: 'smooth' });
};

highlight(steps[0]);
