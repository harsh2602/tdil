// BFE#25
/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function sort(items, newOrder) {
  for (let i = 0; i < items.length; i++) {
    const orderIdx = newOrder[i];
    [items[i], items[orderIdx]] = [items[orderIdx], items[i]];
    [newOrder[i], newOrder[orderIdx]] = [newOrder[orderIdx], newOrder[i]];
  }
  return items;
}

const A = ['A', 'B', 'C', 'D', 'E', 'F'];
const B = [1, 5, 4, 3, 2, 0];

console.log(sort(A, B));
