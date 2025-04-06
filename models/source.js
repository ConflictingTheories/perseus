/**
 * Represents a source of information (e.g., book, article).
 */
class Source {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} title - Title of the source.
     * @param {string} author - Author of the source.
     * @param {string} type - Type of source (e.g., book, article).
     * @param {string} language - Language of the source (references Language.id).
     * @param {string} urn - Associated URN ID (references URN.id).
     */
    constructor(id, title, author, type, language, urn) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.type = type;
      this.language = language;
      this.urn = typeof urn === 'string' ? urn : '';
    }
  }
  
  export default Source;