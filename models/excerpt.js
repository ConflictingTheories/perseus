/**
 * Represents an excerpt from a source.
 */
class Excerpt {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} text - Text of the excerpt.
     * @param {string} sourceId - Associated source ID (references Source.id).
     * @param {string} context - Context of the excerpt (e.g., chapter, paragraph).
     */
    constructor(id, text, sourceId, context) {
      this.id = id;
      this.text = text;
      this.sourceId = sourceId;
      this.context = typeof context === 'string' ? context : '';
    }
  }
  
  export default Excerpt;