// Mock API
// Mock Server
const FAILURE_COUNT = 10;
const LATENCY = 200;

function getRandomBool(n) {
  const threshold = 1000;
  if (n > threshold) n = threshold;
  return Math.floor(Math.random() * threshold) % n === 0;
}

function getSuggestions(text) {
  var pre = 'pre';
  var post = 'post';
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COUNT)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}

(function () {
  const input = document.getElementById('search');
  const suggestionArea = document.getElementById('suggestion-area');

  const onFocus = () => {
    suggestionArea.style.display = 'block';
  };

  const onBlur = (e) => {
    if (e.target == input || e.target.suggestionArea) {
      return;
    }

    suggestionArea.style.display = 'none';
  };

  const onChange = (e) => {
    const { value } = e.target;

    processData(value);
  };

  const onClick = (e) => {
    if (e.target === suggestionArea) return;
    const text = e.target.innerText;

    input.value = text;
    input.focus();
  };

  const clearResults = () => {
    suggestionArea.innerHTML = '';
  };

  const processData = async (value) => {
    // Clear before any search
    suggestionArea.innerHTML = '';
    if (!value) {
      return;
    }

    try {
      const response = await getSuggestions(value);
      if (response.length) {
        const list = document.createElement('ul');
        response.forEach((element) => {
          const listItems = document.createElement('li');
          listItems.innerText = element;
          list.appendChild(listItems);
        });
        // Clear before showing new results
        suggestionArea.innerHTML = '';
        suggestionArea.appendChild(list);
      }
    } catch (e) {
      console.error('Error while making network call', e);
    }
  };

  input.addEventListener('focus', onFocus);
  input.addEventListener('keyup', onChange);
  input.addEventListener('search', clearResults);

  window.addEventListener('click', onBlur);
  suggestionArea.addEventListener('click', onClick);
})();
