// Create a simple store for DOM element

/**
 * The NodeStore class is a simple class that stores a value for a given node.
 */
class NodeStore {
  constructor() {
    /**
     * Use the Object as a memory
     */
    this.nodes = {};
  }
  /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    /**
     * Using Symbol for 100% elimination of collisions of node properties
     */
    node.__nodeKey__ = new Symbol();
    this.nodes[node.__nodeKey__] = value;
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    return this.nodes[node.__nodeKey__];
  }

  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    return !!this.nodes[node.__nodeKey__];
  }
}
