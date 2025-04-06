/**
 * Represents a language in the system.
 */
class Language {
  /**
   * @param {string} id - Unique identifier.
   * @param {string} name - Name of the language.
   * @param {string} script - Writing script of the language.
   * @param {string} family - Language family (e.g., Indo-European).
   * @param {Array<string>} phonemes - Array of Phoneme IDs (references Phoneme.id).
   * @param {Array<string>} relationships - Array of Relationship IDs (references Relationship.id).
   */
  constructor(id, name, script, family, phonemes, relationships) {
    this.id = id;
    this.name = name;
    this.script = script;
    this.family = family;
    this.phonemes = Array.isArray(phonemes) && phonemes.every(p => typeof p === 'string') ? phonemes : [];
    this.relationships = Array.isArray(relationships) && relationships.every(r => typeof r === 'string') ? relationships : [];
  }
}

export default Language;