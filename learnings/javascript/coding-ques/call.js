function showProfileMessage(message) {
  console.log(message, this.name);
}
const obj = {
  name: 'John Doe',
};

showProfileMessage.call(obj, 'welcome ');

Function.prototype.myCall = function (context /* someOtherThis */) {
  context.fnName = this;
  return context.fnName();
};

showProfileMessage.myCall(obj);
