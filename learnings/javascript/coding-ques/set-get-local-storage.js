function setLocalStorageItem(name, item) {
  window.localStorage.setItem(name, JSON.stringify(item));
  return;
}

function getLocalStorageItem(item) {
  return JSON.parse(window.localStorage.getItem(item));
}

setLocalStorageItem('user', { name: 'Harsh' });
getLocalStorageItem('user');
