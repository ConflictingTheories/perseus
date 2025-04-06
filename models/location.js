/**
 * Represents a location in the system.
 */
class Location {
  /**
   * @param {string} id - Unique identifier.
   * @param {string} name - Name of the location.
   * @param {string} type - Type of location (e.g., geographical, conceptual).
   * @param {Array<string>} references - Array of related URN IDs (references URN.id).
   * @param {Array<string>} relationships - Array of relationship IDs (references Relationship.id).
   */
  constructor(id, name, type, references, relationships) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.references = Array.isArray(references) && references.every(r => typeof r === 'string') ? references : [];
    this.relationships = Array.isArray(relationships) && relationships.every(r => typeof r === 'string') ? relationships : [];
  }
}

export default Location;