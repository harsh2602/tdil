// let target = {};
// let proxy = new Proxy(target, {}); // empty handler

// proxy.test = 5;

// console.log(target.test); // 5
// console.log(proxy.test); // 5

// for (let key in proxy) console.log(key);

// /**
//  * 1. A writing operation proxy.test= sets the value on target
//  * 2. A reading operation proxy.test returns the value from target
//  * 3. Iteration over proxy returns values from target
//  */

// /**
//  * VARIANTS WITH GET TRAP
//  */

// let numbers = [0, 14, 2];

// numbers = new Proxy(numbers, {
//   get(target, prop) {
//     if (prop in target) {
//       return target[prop];
//     } else {
//       return 0;
//     }
//   },
// });

// console.log(numbers[1]); // 1
// console.log(numbers[123]); // 123

// let dictionary = {
//   Hello: 'Hola',
//   Bye: 'Adiós',
// };

// /**
//  * The proxy should totally replace the target object everywhere.
//  * No one should ever reference the target object after it got proxied.
//  * Otherwise it’s easy to mess up.
//  */
// dictionary = new Proxy(dictionary, {
//   get(target, phrase) {
//     if (phrase in target) {
//       return target[phrase];
//     } else {
//       return phrase;
//     }
//   },
// });

// console.log(dictionary['Welcome to Proxy']); // Jo
// console.log(dictionary['Hello']); // Hola

// /**
//  * VARIANTS WITH SET TRAP
//  */

// let numbersArr = [];

// numbersArr = new Proxy(numbersArr, {
//   set(target, prop, val) {
//     if (typeof val == 'number') {
//       prop; /* 0,length */ /* 1,length */
//       target[prop] = val;
//       return true;
//     } else {
//       return false;
//     }
//   },
// });

// console.log(numbersArr.push(1)); // 1
// console.log(numbersArr.push(1)); // 1
// console.log(numbersArr); // [1, 1]

// try {
//   numbersArr.push('test'); // 'set' on proxy: trap returned falsish for property '2'
// } catch (error) {
//   console.log(error.message);
// }

// /**
//  * Iteration with “ownKeys” and “getOwnPropertyDescriptor”
//  */

// let user = {
//   name: 'John',
//   age: 30,
//   _password: '***',
// };

// user = new Proxy(user, {
//   ownKeys(target) {
//     // Object.keys returns only properties with the enumerable flag
//     return Object.keys(target).filter((key) => !key.startsWith('_'));
//   },
// });

// for (let key in user) {
//   console.log(key); // name, age
// }

// console.log(Object.keys(user)); // ['name', 'age']
// console.log(Object.values(user)); // ['John', 30]

// let newUser = {
//   _password: '*****',
// };

// newUser = new Proxy(newUser, {
//   ownKeys(target) {
//     return ['a', 'b', 'c'];
//   },

//   get(target, prop) {
//     prop;
//     if (prop.startsWith('_')) {
//       throw new Error('Access denied');
//     }
//     let value = target[prop];

//     /**
//      * Why do we need a function to call value.bind(target)?
//      * The reason is that object methods, such as user.checkPassword(), must be able to access _password:
//      *
//      * checkPassword(value) {
//      *  return value === this._password;
//      * }
//      */
//     return typeof value === 'function'
//       ? value.bind(
//           target /** bind the context of object method to the original target */
//         )
//       : value;
//   },

//   set(target, prop, val) {
//     // to intercept property writing
//     if (prop.startsWith('_')) {
//       throw new Error('Access denied');
//     } else {
//       target[prop] = val;
//       return true;
//     }
//   },

//   /**
//    *
//    * We only need to intercept [[GetOwnProperty]] if the property is absent in the object.
//    */
//   getOwnPropertyDescriptor(target, prop) {
//     return {
//       enumerable: true,
//       configurable: true,
//     };
//   },

//   deleteProperty(target, prop) {
//     if (prop.startsWith('_')) {
//       throw new Error('Access Denied');
//     } else {
//       delete target[prop];
//       return true;
//     }
//   },
// });

// console.log(Object.keys(newUser)); // ['a', 'b', 'c']

// try {
//   console.log(newUser['_password']); // Error: Access denied
// } catch (e) {
//   console.log(e.message);
// }

// try {
//   newUser._password = 'test'; // Error: Access denied
// } catch (e) {
//   console.log(e.message);
// }

// try {
//   delete newUser._password; // Error: Access denied
// } catch (e) {
//   console.log(e.message);
// }

// /**
//  * “In range” with “has” trap
//  */

// let range = {
//   start: 1,
//   end: 10,
// };

// range = new Proxy(range, {
//   has(target, prop) {
//     return prop >= target.start && prop <= target.end;
//   },
// });

// console.log(5 in range); // true
// console.log(50 in range); // false

// // Wrapping functions: "apply"

// // 1. The usual `apply`
// function delay(f, ms) {
//   return function () {
//     setTimeout(() => f.apply(this, arguments), ms);
//   };
// }

// function sayHi(user) {
//   console.log(`Hello, ${user}!`);
// }

// console.log(sayHi.length); // 1 (function length is the arguments count in its declaration)

// sayHi = delay(sayHi, 3000);

// /**
//  * Property lost
//  */
// console.log(sayHi.length); // 0

// // With Proxy
// function delay(f, ms) {
//   return new Proxy(f, {
//     apply(target, thisArg, args) {
//       setTimeout(() => target.apply(thisArg, args), ms);
//     },
//   });
// }

// function sayHi(user) {
//   console.log(`Hello, ${user}!`);
// }

// sayHi = delay(sayHi, 3000);

// console.log(sayHi.length); // 1 proxy forwards "get length" operation to the target

// sayHi('John'); // Hello, John! (after 3 seconds)

/**
 * Revocable Proxies
 */

let object = {
  data: 'Valuable data',
};

let { proxy, revoke } = Proxy.revocable(object, {});

// pass the proxy somewhere instead of object...
console.log(proxy.data); // Valuable data

// later in our code
revoke();

// the proxy isn't working any more (revoked)
console.log(proxy.data); // Error: Cannot perform 'get' on a proxy that has been revoked
