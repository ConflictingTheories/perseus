/**
 * Represents a line in the system.
 */
class Line {
  /**
   * @param {string} id - Unique identifier.
   * @param {string} text - Text of the line.
   * @param {number} number - Line number.
   * @param {string} paragraphId - Associated paragraph ID (references Paragraph.id).
   * @param {Array<string>} relationships - Array of Relationship IDs (references Relationship.id).
   */
  constructor(id, text, number, paragraphId, relationships) {
    this.id = id;
    this.text = text;
    this.number = number;
    this.paragraphId = paragraphId;
    this.relationships = Array.isArray(relationships) && relationships.every(r => typeof r === 'string') ? relationships : [];
  }
}

export default Line;