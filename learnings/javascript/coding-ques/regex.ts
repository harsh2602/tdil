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