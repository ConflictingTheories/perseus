/**
 * Represents an article in the system.
 */
class Article {
    /**
     * @param {string} id - Unique identifier.
     * @param {string} title - Title of the article.
     * @param {string} author - Author of the article.
     * @param {string} publication - Publication where the article appeared.
     * @param {string} language - Language of the article (references Language.id).
     * @param {string} content - Full content of the article.
     */
    constructor(id, title, author, publication, language, content) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.publication = publication;
      this.language = language;
      this.content = typeof content === 'string' ? content : '';
    }
  }
  
  export default Article;