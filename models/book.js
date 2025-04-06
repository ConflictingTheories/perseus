class Book {
  constructor(id, title, author, language, pages) {
    this.id = id; // Unique identifier
    this.title = title; // Title of the book
    this.author = author; // Author of the book
    this.language = language; // Language of the book
    this.pages = Array.isArray(pages) && pages.every(p => typeof p === 'string') ? pages : []; // Array of Page objects
  }
}

export default Book;