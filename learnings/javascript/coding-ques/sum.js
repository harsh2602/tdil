/*** ==== Explanation  ====

We know that `sum(1)(2)` can be done by returning a function from a function. Example:


function sum(num) {
  return function(num2) {
    return num+num2;
  }
}


but we can have `sum(1)(2)....(n)` up to `n`.

How do we solve such problems? We first see a pattern, the pattern is that we need to return function `n` times.
When we see a pattern then we can write concise code using recursion. <br />

So I solved this problem using recursion. But before that let's demystify these 8 lines of code. <br />

#1: Why do we need to use `func` variable, why can't we just directly return `function(num2)...` (#4)? <br />

Because we are comparing non-primitive (Object, functions are Objects in JS) value against a primitive value (Number). <br />
`sum(1)(2)(3) == 6`

When we do such comparisons then JS has to do "type coercion". How does JS do this?

It has `valueOf` and `toString` to do that. Essentially, one of them will be called. 
What we do here is that we override that method and tell the JS engine to return our custom value (which is `num`) in our case.
That's why we needed to store #4 in a variable so that we can override the `valueOf` method.

#2: Okay, I get it that you wanted to use the `valueOf` method, but why do you on this beautiful earth want to do that? 
Because if `sum(1)(2)` will return us another function and we can't compare below -

`function(num2) { return num2 ? sum(num+num2) : num }  == 3`

So what we do is we tell the JS engine to use our `valueOf` method to return value, which is 'num'.
So we can now compare `3 == 3`

#3: Okay, then why do we have ternary on #3?
Because in case you want to use call `sum` function normally and get value out of it.
`sum(1)(2)()` will return 3

***/

/**
 * @param {number} num
 */
function sum(num) {
  const func = function (arg) {
    return arg ? sum(num + arg) : num;
  };

  func.valueOf = () => num;

  return func;
}

const sum1 = sum(1);
console.log(sum1(2) == 3);
console.log(sum1(2)() == 3);
console.log(sum1(3) == 4);
console.log(sum(1)(2)(3) == 6);
console.log(sum(5)(-1)(2) == 6);
