/**
 * Represents a phoneme in the system.
 */
class Phoneme {
  /**
   * @param {string} id - Unique identifier.
   * @param {string} symbol - Phoneme symbol.
   * @param {string} sound - Sound representation (e.g., IPA notation).
   * @param {string} language - Language of the phoneme (references Language.id).
   * @param {Array<string>} relationships - Array of relationship IDs (references Relationship.id).
   */
  constructor(id, symbol, sound, language, relationships) {
    this.id = id;
    this.symbol = symbol;
    this.sound = sound;
    this.language = language;
    this.relationships = Array.isArray(relationships) && relationships.every(r => typeof r === 'string') ? relationships : []; // Relationships to other phonemes
  }
}

export default Phoneme;