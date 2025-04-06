/**
 * Represents a relationship between entities.
 */
class Relationship {
  /**
   * @param {string} id - Unique identifier.
   * @param {string} type - Type of relationship (e.g., synonym, antonym).
   * @param {string} source - Source entity ID.
   * @param {string} target - Target entity ID.
   */
  constructor(id, type, source, target) {
    this.id = id;
    this.type = typeof type === 'string' ? type : '';
    this.source = typeof source === 'string' ? source : '';
    this.target = typeof target === 'string' ? target : '';
  }
}

export default Relationship;