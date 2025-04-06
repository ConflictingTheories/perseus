/**
 * Represents a paragraph in the system.
 */
class Paragraph {
  /**
   * @param {string} id - Unique identifier.
   * @param {string} text - Paragraph text.
   * @param {Array<string>} sentences - Array of Sentence IDs (references Sentence.id).
   * @param {string} chapterId - Associated chapter ID (references Chapter.id).
   */
  constructor(id, text, sentences, chapterId) {
    this.id = id;
    this.text = text;
    this.sentences = Array.isArray(sentences) && sentences.every(s => typeof s === 'string') ? sentences : [];
    this.chapterId = chapterId; // Associated chapter
  }
}

export default Paragraph;