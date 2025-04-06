/**
 * Represents the architecture of the system.
 */
class Architecture {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} name - Name of the architecture.
     * @param {string} description - Description of the architecture.
     * @param {Array<string>} components - Array of component IDs (e.g., models, services).
     */
    constructor(id, name, description, components) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.components = Array.isArray(components) && components.every(c => typeof c === 'string') 
        ? components 
        : []; // Ensure components is an array of strings
    }
  }
  
  export default Architecture;