const [checkoutBtn, itemsInput, linesContainer] = [
  '.checkout',
  '.items-count',
  '.lines-container',
].map((el) => document.querySelector(el));

let lines = [[], [], [], [], []];

checkoutBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const itemsCount = itemsInput.valueAsNumber;
  if (!itemsCount) {
    return;
  }
  addPersonToLine(itemsCount);

  itemsInput.value = '';
});

const renderQueueItem = (count) => {
  const listItem = document.createElement('li');
  listItem.innerText = count;

  return listItem;
};

const addPersonToLine = (count) => {
  // Calculate Sum
  const arrSum = (arr) =>
    arr.reduce((curr, acc) => {
      curr += acc;
      return curr;
    }, 0);

  const getMinIndex = (arrSum) => {
    const sumArr = lines.map((line) => arrSum(line));
    const min = Math.min(...sumArr);
    return sumArr.indexOf(min);
  };

  const minIndex = getMinIndex(arrSum);
  // Add items to min items sub-array
  lines[minIndex].push(count);

  // Create List Item
  const listItem = renderQueueItem(count);
  // Append to particular list
  const list = document.getElementById(`queue-${minIndex}`);
  list.append(listItem);
};

const renderCheckoutLines = () => {
  const fragment = document.createDocumentFragment();

  lines.forEach((line, index) => {
    const list = document.createElement('ul');
    list.classList.add('queue');
    list.id = `queue-${index}`;
    line.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.innerText = item;
      list.append(listItem);
    });
    fragment.appendChild(list);
  });

  return fragment;
};

const checkoutQueue = () => {
  const fragment = renderCheckoutLines();
  // Add to container
  linesContainer.appendChild(fragment);
};

// Initial Render
checkoutQueue();

const clearCheckoutQueue = () => {
  lines = lines.map((line, index) => {
    // Update UI
    const list = document.getElementById(`queue-${index}`);
    const listItem = list?.firstChild;
    if (listItem) {
      listItem.innerText = Number(listItem?.innerText) - 1;
      if (listItem.innerText == 0) {
        listItem.remove();
      }
    }
    return [line[0] - 1, ...line.slice(1)].filter((value) => value >= 0);
  });

  const fragment = document.createDocumentFragment();
};

setInterval(clearCheckoutQueue, 1000);
