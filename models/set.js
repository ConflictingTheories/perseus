/**
 * Represents a set of items.
 */
class Set {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} name - Name of the set.
     * @param {Array<string>} items - Array of item IDs (can reference any model).
     */
    constructor(id, name, items) {
      this.id = id;
      this.name = name;
      this.items = Array.isArray(items) && items.every(i => typeof i === 'string') ? items : [];
    }
  }
  
  export default Set;