/**
 * Represents a Universal Resource Name (URN).
 */
class URN {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} reference - The URN reference.
     * @param {string} type - Type of resource (e.g., book, article).
     * @param {Object} metadata - Additional metadata about the resource.
     */
    constructor(id, reference, type, metadata) {
      this.id = id;
      this.reference = reference;
      this.type = type;
      this.metadata = typeof metadata === 'object' && metadata !== null ? metadata : {};
    }
  }
  
  export default URN;