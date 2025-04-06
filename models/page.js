/**
 * Represents a page in the system.
 */
class Page {
  /**
   * @param {string} id - Unique identifier.
   * @param {number} number - Page number.
   * @param {Array<string>} paragraphs - Array of Paragraph IDs (references Paragraph.id).
   * @param {string} bookId - Associated book ID (references Book.id).
   */
  constructor(id, number, paragraphs, bookId) {
    this.id = id;
    this.number = number;
    this.paragraphs = Array.isArray(paragraphs) && paragraphs.every(p => typeof p === 'string') ? paragraphs : [];
    this.bookId = bookId; // Associated book
  }
}

export default Page;