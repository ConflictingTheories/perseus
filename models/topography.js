/**
 * Represents a geographical or conceptual topography.
 */
class Topography {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} location - Geographical location or conceptual area.
     * @param {string} description - Description of the topography.
     * @param {Array<string>} references - Array of related URN IDs (references URN.id).
     */
    constructor(id, location, description, references) {
      this.id = id;
      this.location = location;
      this.description = description;
      this.references = Array.isArray(references) && references.every(r => typeof r === 'string') ? references : [];
    }
  }
  
  export default Topography;