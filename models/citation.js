/**
 * Represents a citation in the system.
 */
class Citation {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} text - Text of the citation.
     * @param {string} sourceId - Associated source ID (references Source.id).
     * @param {string} location - Location in the source (e.g., page, chapter).
     */
    constructor(id, text, sourceId, location) {
      this.id = id;
      this.text = text;
      this.sourceId = sourceId;
      this.location = typeof location === 'string' ? location : '';
    }
  }
  
  export default Citation;