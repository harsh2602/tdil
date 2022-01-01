// Fill array with dummy items
const listItems = Array(68)
  .fill('')
  .map((val, index) => `Item ${(val, index + 1)}`);

const listElement = document.getElementById('list');
const paginationElement = document.getElementById('pagination');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentPage = 1;
let rows = 10;
const maxDisplayPageCount = 5;
let allPageButtons;
let pageCount;

function removeActiveClass() {
  document
    .querySelector('.pagenumbers button.active')
    .classList.remove('active');
}

function addActiveClass(btn) {
  btn.classList.add('active');
}

function DisplayList(
  items,
  wrapper /* would be the listElement */,
  rowsPerPage,
  page
) {
  if (currentPage === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  wrapper.innerHTML = '';
  page--;

  let startIndex = rowsPerPage * page;
  let endIndex = startIndex + rowsPerPage;

  if (endIndex > items.length) {
    endIndex = items.length;
  }

  for (let i = startIndex; i < endIndex; i++) {
    let item = items[i];

    let itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.innerText = item;

    wrapper.appendChild(itemElement);
  }
}

function SetupPagination(items, wrapper, rowsPerPage) {
  wrapper.innerHTML = '';
  const btnFragment = document.createDocumentFragment();

  pageCount = Math.ceil(items.length / rowsPerPage);

  for (
    let currentPageIdx = 1;
    currentPageIdx < pageCount + 1;
    currentPageIdx++
  ) {
    let btn = PaginationButton(currentPageIdx, items);
    btnFragment.appendChild(btn);
  }

  wrapper.appendChild(btnFragment);

  allPageButtons = document.querySelectorAll('.pagenumbers button');
}

function PaginationButton(page, items) {
  let button = document.createElement('button');
  button.innerText = page;

  if (currentPage === page) button.classList.add('active');

  button.addEventListener('click', function () {
    currentPage = page;
    DisplayList(items, listElement, rows, currentPage);

    removeActiveClass();
    addActiveClass(this);

    if (currentPage === pageCount) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  });

  return button;
}

function PrevButtonClick() {
  prevBtn.addEventListener('click', function () {
    if (currentPage === 1) {
      prevBtn.disabled = true;
      return;
    }

    if (currentPage === pageCount - 1) {
      nextBtn.disabled = false;
    }

    removeActiveClass();
    currentPage = currentPage - 1;

    if (currentPage > 0) {
      prevBtn.disabled = false;
      addActiveClass(allPageButtons[currentPage - 1]);
      DisplayList(listItems, listElement, rows, currentPage);
    }
  });
}

function NextButtonClick() {
  nextBtn.addEventListener('click', function () {
    removeActiveClass();

    currentPage = currentPage + 1;

    if (currentPage <= pageCount) {
      nextBtn.disabled = false;
      addActiveClass(allPageButtons[currentPage - 1]);
      DisplayList(listItems, listElement, rows, currentPage);
      if (currentPage === pageCount) {
        nextBtn.disabled = true;
      }
    }
  });
}

DisplayList(listItems, listElement, rows, currentPage);
SetupPagination(listItems, paginationElement, rows, maxDisplayPageCount);
PrevButtonClick();
NextButtonClick();
