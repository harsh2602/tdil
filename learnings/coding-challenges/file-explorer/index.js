const container = document.querySelector('.container');
let isExpanded = true;

const files = {
  children: [
    {
      name: 'learnings',
      children: [
        {
          name: 'animate-progress-bar',
          children: [
            { name: 'index.html' },
            { name: 'styles.css' },
            { name: 'js', children: [{ name: 'index.js' }] },
          ],
        },
        {
          name: 'infinite-scroll',
          children: [
            { name: 'index.html' },
            { name: 'styles.css' },
            { name: 'index.js' },
          ],
        },
        {
          name: 'nested-comments',
          children: [
            { name: 'index.html' },
            { name: 'styles.css' },
            { name: 'index.js' },
          ],
        },
      ],
    },
    {
      name: 'html',
      children: [
        {
          name: 'HTML_<picture>_tag.md',
        },
      ],
    },
    {
      name: 'package.json',
    },
    {
      name: 'package-lock.json',
    },
    {
      name: '.gitignore',
    },
  ],
};

container.addEventListener('click', (e) => {
  const folder = e.target;

  isExpanded = !isExpanded;

  Array.from(folder.children).forEach((c) => {
    c.style.display = isExpanded ? 'block' : 'none';
  });
});

const createTree = ({ entry, depth }) => {
  const el = document.createElement('div');
  el.innerHTML = entry.name;
  el.style.setProperty('padding-left', `${depth * 10}px`);

  entry.children?.forEach((e) => {
    el.appendChild(createTree({ entry: e, depth: depth + 1 }));
  });

  return el;
};

const renderTree = () => {
  const fragment = document.createDocumentFragment();

  files.children.map((e) =>
    fragment.appendChild(createTree({ entry: e, depth: 0 })),
  );

  container.appendChild(fragment);
};

renderTree();
