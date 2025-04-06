/**
 * Represents a chapter in a book.
 */
class Chapter {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} title - Title of the chapter.
     * @param {number} number - Chapter number.
     * @param {Array<string>} pages - Array of Page IDs (references Page.id).
     */
    constructor(id, title, number, pages) {
      this.id = id;
      this.title = title;
      this.number = number;
      this.pages = Array.isArray(pages) && pages.every(p => typeof p === 'string') ? pages : [];
    }
  }
  
  export default Chapter;