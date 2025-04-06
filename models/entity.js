/**
 * Represents an entity in the system.
 */
class Entity {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} name - Name of the entity.
     * @param {string} type - Type of entity (e.g., person, place, concept).
     * @param {Array<string>} properties - Array of Property IDs (references Property.id).
     * @param {Array<string>} relationships - Array of Relationship IDs (references Relationship.id).
     */
    constructor(id, name, type, properties, relationships) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.properties = Array.isArray(properties) && properties.every(p => typeof p === 'string') ? properties : [];
      this.relationships = Array.isArray(relationships) && relationships.every(r => typeof r === 'string') ? relationships : [];
    }
  }
  
  export default Entity;