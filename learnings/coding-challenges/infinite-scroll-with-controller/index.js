const [textBox, container, loading] = ['.query', '.container', '.loading'].map(
  (i) => document.querySelector(i),
);
const API = 'https://openlibrary.org/search.json?';

let page = 0;
let currentQuery = '';
let abortController = null;

const showLoading = (isLoading) => {
  loading.style.display = isLoading ? 'flex' : 'none';
};

const fetchData = async (query) => {
  try {
    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();

    const res = await fetch(
      `${API}${new URLSearchParams({ q: query, page })}`,
      {
        signal: abortController.signal,
      },
    );
    const json = await res.json();

    return json.docs.map((i) => i.title);
  } catch (e) {
    if (!e.name === 'AbortError') {
      console.error(e.name);
    }
  }
};

const observerOptions = {
  root: null,
  threshold: 1,
};

const handleLastItemIntersect = async (entries, observer) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);

      page += 1;
      await showData(currentQuery);
    }
  });
};

const observer = new IntersectionObserver(
  handleLastItemIntersect,
  observerOptions,
);

const addItems = (data) => {
  if (!data) return;

  const lastItem = container.querySelector('.last-item');
  if (lastItem) {
    lastItem.classList.remove('last-item');
  }

  const fragment = document.createDocumentFragment();

  data.forEach((d, index) => {
    const el = document.createElement('div');
    el.textContent = d;
    if (index === data.length - 1) {
      el.classList.add('last-item');
      observer.observe(el);
    }
    fragment.appendChild(el);
  });

  return fragment;
};

const showData = async (query) => {
  showLoading(true);
  const data = await fetchData(query);

  const fragmentData = addItems(data);

  if (fragmentData) {
    container.appendChild(fragmentData);
  }
  showLoading(false);
};

textBox.addEventListener('keyup', async (e) => {
  container.innerHTML = '';

  currentQuery = e.target.value;
  if (!currentQuery.length) {
    return;
  }

  page = 1;
  await showData(currentQuery);
});
