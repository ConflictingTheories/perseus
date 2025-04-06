/**
 * Represents a property of an entity.
 */
class Property {
  /**
   * @param {string} id - Unique identifier.
   * @param {string} name - Name of the property.
   * @param {string} value - Value of the property.
   * @param {string} entity - Associated entity ID.
   */
  constructor(id, name, value, entity) {
    this.id = id;
    this.name = typeof name === 'string' ? name : '';
    this.value = typeof value === 'string' ? value : '';
    this.entity = typeof entity === 'string' ? entity : '';
  }
}

export default Property;