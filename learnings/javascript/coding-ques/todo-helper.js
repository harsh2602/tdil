let names = [];

function add(arr, item) {
  if (item === '') return;
  arr.push(item);
  return arr.map((item) => item);
}

function remove(arr, item) {
  if (arr.includes(item)) {
    arr.splice(arr.indexOf(item), 1);
  }
  return arr;
}

console.log(add(names, 'Harsh'));
console.log(add(names, 'Anku'));
console.log(add(names, 'Rock'));
console.log(add(names, 'James'));
console.log(add(names, 'Taylor'));

console.log(remove(names, 'Taylor'));
console.log(remove(names, 'Rock'));
console.log(remove(names, 'Harsh'));
console.log(remove(names, 'James'));
console.log(remove(names, 'Anku'));

names;
