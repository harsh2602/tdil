/**
 * Remove all instances of the letters b and ac from the input string.
 * @param {string} input - string
 * @returns The string with the characters removed.
 */
function removeChars(input: string) {
  const regex = /(b|ac)/g;
  
  while (input.match(regex)) {
    input = input.replace(regex, '');
  }
  return input;
 }
  
 console.log(removeChars('ab')); // 'a'
 console.log(removeChars('abc')); // ''
 console.log(removeChars('cabbaabcca')); 