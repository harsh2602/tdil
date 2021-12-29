function model(state: { value: string }, element: HTMLInputElement) {
  element.value = state.value;

  Object.defineProperty(state, 'value', {
    get: () => element.value,
    set: (val: string) => (element.value = val),
  });
}

const input = document.createElement('input');
const state = { value: 'BFE' };
model(state, input);

console.log(input.value); // 'BFE'
state.value = 'dev';
console.log(input.value); // 'dev'
input.value = 'BFE.dev';
input.dispatchEvent(new Event('change'));
console.log(state.value); // 'BFE.dev'
