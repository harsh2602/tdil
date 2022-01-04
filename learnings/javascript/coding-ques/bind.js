Function.prototype.myBind = function (context) {
  const _this = this;

  return function () {
    return _this.apply(context, arguments);
  };
};

function foo(x) {
  console.log(this.bar); // 'hello'
  return 1;
}

let baz = foo.myBind({ bar: 'hello' });

console.log(baz()); // 1
