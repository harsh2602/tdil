/**
 * @param {HTMLElement} el - element to be wrapped
 */
function $(el) {
  const element = typeof el === 'string' ? document.querySelector(el) : el;
  if (element === null) return;

  return {
    css: function (property, value) {
      element.style[property] = value;
      return this;
    },
  };
}

// Turn button into black button with white background
$('#button')
  .css('color', '#fff')
  .css('backgroundColor', '#000')
  .css('fontWeight', 'bold');
