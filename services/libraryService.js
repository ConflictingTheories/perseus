export default class LibraryService {
    /**
     * 
     */
    constructor() {
        this.library = [];
        this.language = 'en'; // Default language
    }

    /**
     * 
     * @param {*} repository 
     * @param {*} options 
     */
    async loadLibraryFromUrl(repository, options = {}) {
        try {
            // fetch the library data from the repository URL
            const response = await fetch(repository.url);
            const data = await response.json();

            // todo - process data (e.g., format, filter, sort, etc.)
            const formattedData = data.map(item => {
                // Format the data as needed
            });

            this.library = formattedData;
        } catch (error) {
            console.error('Error loading library:', error);
        }
    }

    /**
     * 
     * @param {*} filePath 
     * @param {*} options 
     */
    async loadLibraryFromFile(filePath, options = {}) {
        try {
            // Load the library data from a local file
            const response = await fetch(filePath);
            const data = await response.json();

            // todo - process data (e.g., format, filter, sort, etc.)
            const formattedData = data.map(item => {
                // Format the data as needed
            });

            this.library = formattedData;
        } catch (error) {
            console.error('Error loading library from file:', error);
        }
    }

    /**
     * 
     * @param {*} database 
     * @param {*} options 
     * @returns 
     */
    async loadLibraryFromSqlite(database, options = {}) {
        try {
            const db = await SQLite.openDatabaseAsync(database, { useNewConnection: true });

            if (!db) {
                console.error('Failed to open SQLite database.');
                return;
            }

            // Define the SQL query to fetch the library data
            const table = options.table || 'library';
            const columns = options.columns || '*';
            const where = options.where || '';
            const orderBy = options.orderBy || '';
            const limit = options.limit || 100;
            const offset = options.offset || 0;
            const sql = `SELECT ? FROM ? ? ? LIMIT ? OFFSET ?`;

            // fetch the data from the SQLite database
            const result = await db.getAllAsync(sql, [columns, table, where, orderBy, limit, offset]);
            if (result.error) {
                console.error('Error executing SQLite query:', result.error);
                return;
            }

            if (result.rows.length === 0) {
                console.warn('No data found in the SQLite database.');
                return;
            }

            db.close();

            // todo - process data (e.g., format, filter, sort, etc.)
            const formattedData = result.rows.map(item => {
                // Format the data as needed
            });

            this.library = formattedData;
        } catch (error) {
            console.error('Error loading library from sqlite database:', error);
        }
    }

    /**
     * 
     * @param {*} database 
     * @param {*} options 
     * @returns 
     */
    async storeLibraryToSqlite(database, options = {}) {
        try {
            // Check if the library is empty
            if (this.library.length === 0) {
                console.warn('Library is empty. Nothing to store.');
                return;
            }

            // Open the SQLite database
            const db = await SQLite.openDatabaseAsync(database, { useNewConnection: true });
            if (!db) {
                console.error('Failed to open SQLite database.');
                return;
            }

            // create the table if it doesn't exist
            await db.execAsync(`CREATE TABLE IF NOT EXISTS ${options.table} (id INTEGER PRIMARY KEY, title TEXT, language TEXT, font TEXT, content TEXT, metadata TEXT)`);

            // Check if the database is empty
            const tableExists = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table' AND name=?", [options.table]);
            if (tableExists.length === 0) {
                console.warn(`Table "${options.table}" does not exist in the database.`);
                return;
            }

            // Check if the database is writable
            const writable = await db.getAllAsync("PRAGMA writable_schema");
            if (!writable) {
                console.warn('Database is not writable.');
                return;
            }

            // Check if the library data is valid
            if (!Array.isArray(this.library) || this.library.length === 0) {
                console.warn('Library data is not valid.');
                return;
            }

            // Define the SQL query to store the library data
            const table = options.table || 'library';
            const columns = options.columns || '*';
            const where = options.where || '';
            const orderBy = options.orderBy || '';
            const limit = options.limit || 100;
            const offset = options.offset || 0;
            const sql = `INSERT INTO ? (?) VALUES ?`;

            // Store the data into the SQLite database
            const result = await db.runAsync(sql, [table, columns, this.library]);
            if (result.error) {
                console.error('Error executing SQLite query:', result.error);
                return;
            }

            db.close();
        } catch (error) {
            console.error('Error storing library to sqlite database:', error);
        }
    }

    /**
     * 
     * @returns 
     */
    getLibrary() {
        return this.library;
    }

    /**
     * 
     * @returns 
     */
    listBooks() {
        return this.library.map(book => ({
            id: book.id,
            title: book.title
        }));
    }

    /**
     * 
     * @param {*} query 
     * @returns 
     */
    searchBooks(query) {
        return this.library.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
    }

    /**
     * 
     * @param {*} book 
     */
    addBook(book) {
        this.library.push(book);
    }

    /**
     * 
     * @param {*} bookId 
     */
    removeBook(bookId) {
        this.library = this.library.filter(book => book.id !== bookId);
    }

    /**
     * 
     * @param {*} bookId 
     * @param {*} updatedBook 
     */
    updateBook(bookId, updatedBook) {
        const index = this.library.findIndex(book => book.id === bookId);
        if (index !== -1) {
            this.library[index] = { ...this.library[index], ...updatedBook };
        }
    }

    /**
     * 
     * @param {*} bookId 
     * @returns 
     */
    getBookById(bookId) {
        return this.library.find(book => book.id === bookId);
    }
}
