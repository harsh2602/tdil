const rootElement = document.querySelector('.foods');

const foodData = [
  {
    id: 1,
    image: '🌮',
    name: 'taco',
  },
  {
    id: 2,
    image: '🍔',
    name: 'burger',
  },
  {
    id: 3,
    image: '🍆',
    name: 'eggplant',
  },
  {
    id: 4,
    image: '🍎',
    name: 'apple',
  },
  {
    id: 5,
    image: '🥞',
    name: 'pancakes',
  },
];

class Foods {
  constructor(rootElement, foodData) {
    this._root = rootElement;
    this._data = foodData;
  }

  renderList() {
    this._root.addEventListener('click', function (event) {
      const { target } = event;
      !target.classList.contains('foods') && target.remove();
    });

    const fragment = document.createDocumentFragment();

    this._data.forEach((food) => {
      fragment.appendChild(this.createFoodItem(food));
    });

    this._root.appendChild(fragment);
  }

  createFoodItem(food) {
    const foodItem = document.createElement('div');

    foodItem.innerText = food.image || food;
    return foodItem;
  }

  appendFoodItem(food) {
    const foodItem = this.createFoodItem(food);
    this._root.appendChild(foodItem);
  }
}

const foods = new Foods(rootElement, foodData);
foods.renderList();

const inputItem = document.querySelector('.food-input');
const btnSubmit = document.querySelector('.btn-submit');

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  foods.appendFoodItem(inputItem.value);
  inputItem.value = '';
});
