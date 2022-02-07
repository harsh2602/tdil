const buildTodoList = function (todoListContainer, items = []) {
  const inputTodo = document.querySelector('.input-todo');
  const addTodoBtn = document.querySelector('.btn-add-todo');

  function addItem(item) {
    if (items.includes(item) || item === '') return;
    items.push(item);
    appendItemToList(todoListContainer, item);
  }

  function removeItem(item) {
    if (items.includes(item)) {
      items.splice(items.indexOf(item), 1);
    }
  }

  function appendItemToList(todoListContainer, itemDescription) {
    const fragment = document.createDocumentFragment();

    const listItem = document.createElement('span');
    listItem.className = 'todo-description';
    listItem.innerText = itemDescription;
    fragment.appendChild(listItem);

    const markDone = document.createElement('span');
    markDone.className = 'mark-done';
    markDone.innerText = 'X';
    fragment.appendChild(markDone);

    const todoItemContainer = document.createElement('div');
    todoItemContainer.className = 'todo-container';
    todoItemContainer.appendChild(fragment);

    todoListContainer.appendChild(todoItemContainer);
  }

  function renderList() {
    items.forEach((item) => {
      appendItemToList(todoListContainer, item);
    });

    todoListContainer.addEventListener('click', onDeleteClick);
    addTodoBtn.addEventListener('click', addTodoListItem);
  }

  function onDeleteClick(event) {
    if (event.target.className === 'mark-done') {
      const todoDescription = event.target.previousElementSibling.innerText;
      removeItem(todoDescription);

      event.target.parentElement.remove();
    }
  }

  function addTodoListItem(event) {
    event.preventDefault();
    const inputTodoValue = inputTodo.value;
    addItem(inputTodoValue);
  }

  return { addItem, removeItem, renderList };
};

const todoListContainer = document.querySelector('#todo-list');

const todoList = buildTodoList(todoListContainer).renderList();
