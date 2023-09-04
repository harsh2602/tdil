import connection from './patterns/singleton';
import user from './patterns/proxy';
import Observable from './patterns/observer';
import { user1, user2 } from './patterns/prototype';

console.log('----Singleton----');
connection.connect();
connection.disconnect();
console.log('----------------');

console.log('----Proxy----');
user.age = 18;
user.name = 'Harsh Khandelwal';
console.log(JSON.stringify(user.name));
console.log('-------------');

console.log('----Prototypal----');
console.log(user1.delete === user2.delete);
console.log(user1.sendEmail());
console.log(user1.checkLastOnline());
console.log(user2.delete());
console.log('-----------------');

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function getMessage(data) {
  console.log(`Message: ${data}`);
}

console.log('----Observer----');
Observable.subscribe(logger);
Observable.subscribe(getMessage);
Observable.notify('Harsh Khandelwal');
setTimeout(() => {
  Observable.notify('✨ New data after timeout ✨');
}, 1000);
Observable.unsubscribe(logger);
Observable.unsubscribe(getMessage);
console.log('--------');
Observable.notify('No Notification'); // Will not run
