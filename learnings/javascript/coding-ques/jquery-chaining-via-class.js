function $(el) {
  return new Wrapper(el);
}

class Wrapper {
  constructor(el) {
    this.el = el;
  }

  css(property, value) {
    this.el.style[property] = value;
    return this;
  }
}
