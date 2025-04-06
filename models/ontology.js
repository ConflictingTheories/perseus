/**
 * Represents an ontology in the system.
 */
class Ontology {
  /**
   * @param {string} id - Unique identifier.
   * @param {string} name - Name of the ontology.
   * @param {Array<string>} entities - Array of Entity IDs (references Entity.id).
   * @param {Array<string>} relationships - Array of Relationship IDs (references Relationship.id).
   */
  constructor(id, name, entities, relationships) {
    this.id = id;
    this.name = name;
    this.entities = Array.isArray(entities) && entities.every(e => typeof e === 'string') ? entities : [];
    this.relationships = Array.isArray(relationships) && relationships.every(r => typeof r === 'string') ? relationships : [];
  }
}

export default Ontology;