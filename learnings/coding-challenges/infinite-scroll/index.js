(function () {
  const itemContainer = document.querySelector('.container');
  const loading = document.querySelector('.loading');
  const itemsPerPage = 5;
  const delay = 2000;
  let currentPage = 1;

  const data = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);

  function showLoading() {
    loading.style.display = 'initial';
  }

  function hideLoading() {
    loading.style.display = 'none';
  }

  function createItemElement(itemText) {
    const itemElement = document.createElement('div');
    itemElement.textContent = itemText;
    return itemElement;
  }

  async function loadMoreItems() {
    showLoading();

    await new Promise((resolve) => setTimeout(resolve, delay));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const fragment = document.createDocumentFragment();

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
      const item = createItemElement(data[i]);
      fragment.appendChild(item);
    }

    if (fragment.children.length) {
      itemContainer.appendChild(fragment);
    }

    hideLoading();
    currentPage++;
  }

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 30
    ) {
      setTimeout(loadMoreItems, delay);
    }
  }

  window.addEventListener('scroll', handleScroll);

  // Initial load
  loadMoreItems();
})();
