function isValidEmail(email) {
  const tester =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  return tester.test(email);
}

function isAllLetters(char) {
  if (typeof char !== 'string') {
    return false;
  }

  return /^[a-zA-Z]+$/.test(char);
}

const user = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  age: 42,
  email: 'john@doe.com',
};

const proxy = new Proxy(user, {
  get: (target, prop) => {
    return `${new Date()} | The value of ${prop} is ${Reflect.get(
      target,
      prop,
    )}`;
  },
  set: (target, prop, value) => {
    if (prop === 'email') {
      if (!isValidEmail(value)) {
        console.log('Please provide a valid email.');
        return false;
      }
    }

    if (prop === 'username') {
      if (value.length < 3) {
        throw new Error('Please use a longer username.');
      } else if (!isAllLetters(value)) {
        throw new Error('You can only use letters');
      }
    }

    if (prop === 'age') {
      if (typeof value !== 'number') {
        throw new Error('Please provide a valid age.');
      }

      if (value < 18) {
        throw 'User cannot be younger than 18.';
      }
    }

    return Reflect.set(target, prop, value);
  },
});

export default proxy;
