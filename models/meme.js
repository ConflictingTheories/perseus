/**
 * Represents a meme or cultural idea in the system.
 */
class Meme {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} text - The meme text or idea.
     * @param {string} language - Language of the meme (references Language.id).
     * @param {string} culturalContext - Cultural context of the meme.
     * @param {Array<string>} relationships - Array of relationship IDs (references Relationship.id).
     */
    constructor(id, text, language, culturalContext, relationships) {
      this.id = id;
      this.text = text;
      this.language = language;
      this.culturalContext = culturalContext;
      this.relationships = Array.isArray(relationships) && relationships.every(r => typeof r === 'string') ? relationships : [];
    }
  }
  
  export default Meme;