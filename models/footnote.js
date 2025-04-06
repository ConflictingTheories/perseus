/**
 * Represents a footnote in the system.
 */
class Footnote {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} text - Text of the footnote.
     * @param {string} reference - Reference to the source (e.g., Citation.id or URN.id).
     * @param {string} pageId - Associated page ID (references Page.id).
     */
    constructor(id, text, reference, pageId) {
      this.id = id;
      this.text = text;
      this.reference = typeof reference === 'string' ? reference : '';
      this.pageId = typeof pageId === 'string' ? pageId : '';
    }
  }
  
  export default Footnote;