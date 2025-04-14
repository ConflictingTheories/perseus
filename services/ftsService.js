import SQLiteService from "./sqliteService";
export default class FTSService {
    constructor(database = 'perseus.db', language = 'en') {
        this.language = language;
        this.database = database;
        this.ftsTableName = `text_fts_${language}`;
        this.sqliteService = new SQLiteService();
        this.db = null;
    }

    /**
     * Open DB connection
     * @returns 
     */
    async openDatabase() {
        this.db = await this.sqliteService.openDatabase(this.database);
        return this.db;
    }

    /**
     * Close DB connection
     */
    async closeDatabase() {
        await this.sqliteService.closeDatabase();
    }

    /**
     * 
     * @returns 
     */
    async initialize() {
        try {
            if (!this.db) {
                console.error(`Database not initialized. Cannot check table existence.`);
                return false;
            }
            // raw document table
            await this.db.execAsync(`CREATE TABLE IF NOT EXISTS documents(id INTEGER PRIMARY KEY, title TEXT UNIQUE, font TEXT, language TEXT, content TEXT, metadata JSON);`);
            const tableExists = await this.sqliteService.checkIfTableExists(this.ftsTableName);
            if (!tableExists) {
                // Full Text Search Table for document content, metadata, and other fields
                await this.db.execAsync(`CREATE VIRTUAL TABLE IF NOT EXISTS ${this.ftsTableName} USING fts5(title, metadata, metadata='documents', 'metadata_rowid'='id', content, content='documents', content_rowid='id');`);

                // Triggers for Linked Updates
                await this.db.execAsync(`
                    CREATE TRIGGER documents_after_insert_${this.ftsTableName} AFTER INSERT ON documents
                    BEGIN
                        INSERT INTO ${this.ftsTableName} (rowid, title, content, metadata)
                        VALUES (new.id, new.title, new.content, new.metadata);
                    END;
                `);
                await this.db.execAsync(`
                    CREATE TRIGGER documents_after_update_${this.ftsTableName} AFTER UPDATE ON documents
                    BEGIN
                    UPDATE ${this.ftsTableName}
                    SET title = new.title, content = new.content, metadata = new.metadata
                    WHERE rowid = old.id;
                    END;
                `);
                await this.db.execAsync(`
                    CREATE TRIGGER documents_after_delete_${this.ftsTableName} AFTER DELETE ON documents
                    BEGIN
                        DELETE FROM ${this.ftsTableName} WHERE rowid = old.id;
                    END;
                `);
                console.log('FTS table created.');
            } else {
                console.log('FTS table already exists. Skipping initialization.');
            }
        } catch (error) {
            console.error('Error initializing FTS table:', error);
        }
    };

    /**
     * Load data into the FTS table and documents table
     * @param {*} data 
     * @returns 
     */
    async loadFtsData(data) {
        try {
            if (!this.db) {
                console.error(`Database not initialized. Cannot load FTS data.`);
                return;
            }
            for (const row of data) {
                try {
                    console.log(`Processing row: ${JSON.stringify(row)}`);
                    if (!row || !row.id || !row.title || !row.language || !row.font || !row.content) {
                        continue;
                    }
                    console.log(`Inserting row into documents table: ${this.ftsTableName} ${JSON.stringify(row)}`); // triggers update to FTS table
                    await this.db.runAsync(`INSERT INTO documents (title, language, font, content, metadata) VALUES (?, ?, ?, ?, ?)`, [
                        row.title,
                        row.language,
                        row.font,
                        row.content,
                        row.metadata,
                    ]);
                } catch (error) {
                    console.error('Error inserting row into FTS table:', error);
                }
            }
        } catch (error) {
            console.error('Error loading FTS data:', error);
        }
    }

    /**
     * 
     * @param {*} query 
     * @returns 
     */
    async searchFts(query) {
        try {
            return await this.db.getAllAsync(`SELECT * FROM ${this.ftsTableName} WHERE content MATCH ?`, [query]);
        } catch (error) {
            console.error('Error searching FTS:', error);
            return [];
        }
    };

    /**
     * 
     * @param {*} page 
     * @param {*} limit 
     * @returns 
     */
    async getBookList(page, limit) {
        const offset = (page - 1) * limit;
        try {
            return await this.db.getAllAsync(`
            SELECT 
                d.id, d.title, d.language, d.font, d.metadata 
            FROM documents d
            LIMIT ? 
            OFFSET ?`, [limit, offset]);
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    };

    /**
     * 
     * @param {*} bookId 
     * @returns 
     */
    async getBookContent(bookId, lineCount = 5) {
        try {
            let row = await this.db.getFirstAsync(`SELECT content FROM ${this.ftsTableName} WHERE rowid = ? LIMIT 1`, [bookId]);
            if (!row) {
                console.error(`Book with ID ${bookId} not found in ${this.ftsTableName}.`);
                return '';
            }
            // Split the content into lines
            // Get the first 'lineCount' lines
            let lines = row.content.split('\n');
            if (lineCount > 0) {
                lines = lines.slice(0, lineCount);
            }
            // Join the lines back into a single string
            return lines.join('\n');
        } catch (error) {
            console.error('Error fetching book content:', error);
            return '';
        }
    };
}