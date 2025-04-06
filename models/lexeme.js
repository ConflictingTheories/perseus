/**
 * Represents a lexeme in the system.
 */
class Lexeme {
  /**
   * @param {string} id - Unique identifier.
   * @param {string} root - Root form of the lexeme.
   * @param {string} language - Language of the lexeme (references Language.id).
   * @param {Array<string>} forms - Array of forms (e.g., conjugations, declensions).
   * @param {Array<string>} relationships - Array of Relationship IDs (references Relationship.id).
   */
  constructor(id, root, language, forms, relationships) {
    this.id = id;
    this.root = root;
    this.language = language;
    this.forms = Array.isArray(forms) && forms.every(f => typeof f === 'string') ? forms : [];
    this.relationships = Array.isArray(relationships) && relationships.every(r => typeof r === 'string') ? relationships : [];
  }
}

export default Lexeme;