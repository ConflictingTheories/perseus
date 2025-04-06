/**
 * Represents grammar rules for a language.
 */
class Grammar {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} language - Language the grammar applies to (references Language.id).
     * @param {Array<string>} rules - Array of grammar rules.
     * @param {Array<string>} exceptions - Array of exceptions to the rules.
     */
    constructor(id, language, rules, exceptions) {
      this.id = id;
      this.language = language;
      this.rules = Array.isArray(rules) && rules.every(r => typeof r === 'string') ? rules : [];
      this.exceptions = Array.isArray(exceptions) && exceptions.every(e => typeof e === 'string') ? exceptions : [];
    }
  }
  
  export default Grammar;