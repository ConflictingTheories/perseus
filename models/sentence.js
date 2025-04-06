/**
 * Represents a sentence in the system.
 */
class Sentence {
  /**
   * @param {string} id - Unique identifier.
   * @param {string} text - The sentence text.
   * @param {string} language - Language of the sentence (references Language.id).
   * @param {Array<string>} words - Array of Word IDs (references Word.id).
   * @param {Array<string>} relationships - Array of relationship IDs (references Relationship.id).
   */
  constructor(id, text, language, words, relationships) {
    this.id = id;
    this.text = text;
    this.language = language;
    this.words = Array.isArray(words) && words.every(w => typeof w === 'string') ? words : [];
    this.relationships = Array.isArray(relationships) && relationships.every(r => typeof r === 'string') ? relationships : [];
  }
}

export default Sentence;