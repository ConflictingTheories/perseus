/**
 * Represents a word in the system.
 */
class Word {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} text - The word itself.
     * @param {string} language - Language of the word (references Language.id).
     * @param {Array<string>} phonemes - Array of phoneme IDs (references Phoneme.id).
     * @param {Array<string>} definitions - Array of definition strings.
     * @param {Array<string>} relationships - Array of relationship IDs (references Relationship.id).
     */
    constructor(id, text, language, phonemes, definitions, relationships) {
      this.id = id;
      this.text = text;
      this.language = language;
      this.phonemes = Array.isArray(phonemes) && phonemes.every(p => typeof p === 'string') ? phonemes : [];
      this.definitions = Array.isArray(definitions) && definitions.every(d => typeof d === 'string') ? definitions : [];
      this.relationships = Array.isArray(relationships) && relationships.every(r => typeof r === 'string') ? relationships : [];
    }
  }
  
  export default Word;