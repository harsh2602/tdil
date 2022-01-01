/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */

/**
 * find the node in the second tree that corresponds to the node in the first tree.
 * @param rootA - The root node of the first tree.
 * @param rootB - The root node of the second tree.
 * @param target - The node to find the corresponding node for.
 * @returns The node that corresponds to the target node in the second tree.
 */
const findCorrespondingNode = (rootA, rootB, target) => {
  const rootAWalker = document.createTreeWalker(rootA, NodeFilter.SHOW_ELEMENT);
  const rootBWalker = document.createTreeWalker(rootB, NodeFilter.SHOW_ELEMENT);

  let currentNodes = [rootAWalker.currentNode, rootBWalker.currentNode];

  while (currentNodes[0] !== target) {
    currentNodes = [rootAWalker.nextNode(), rootBWalker.nextNode()];
  }

  return currentNodes[1];
};
