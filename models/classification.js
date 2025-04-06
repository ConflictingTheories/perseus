/**
 * Represents a classification of entities.
 */
class Classification {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} category - Classification category.
     * @param {string} criteria - Criteria for classification.
     * @param {Array<string>} entities - Array of classified Entity IDs (references Entity.id).
     */
    constructor(id, category, criteria, entities) {
      this.id = id;
      this.category = category;
      this.criteria = criteria;
      this.entities = Array.isArray(entities) && entities.every(e => typeof e === 'string') ? entities : [];
    }
  }
  
  export default Classification;