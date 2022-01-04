function removeDuplicates(str) {
  const set = new Set(str.split(' '));
  return [...set].join(' ');
}

console.log(removeDuplicates('This is is a duplication string string'));
