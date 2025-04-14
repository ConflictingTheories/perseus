import * as SQLite from 'expo-sqlite';
import demo from './demo';
import { deleteDatabaseAsync } from 'expo-sqlite';

export default class SQLiteService {
    constructor() {
        this.db = null;
    }

    async openDatabase(database) {
        if (!this.db) {
            this.db = await SQLite.openDatabaseAsync(database, { useNewConnection: true });
        }
        return this.db;
    }

    async closeDatabase() {
        if (this.db) {
            await this.db.closeAsync();
            this.db = null;
        }
    }

    async deleteDatabase(database) {
        await deleteDatabaseAsync(database);
    };

    async checkIfTableExists(tableName) {
        try {
            console.log(`Checking if table exists: ${tableName}`);
            if (!this.db) {
                console.error(`Database not initialized. Cannot check table existence.`);
                return false;
            }
            const rows = await this.db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table' AND name=?", [tableName]);
            return rows.length > 0;
        } catch (error) {
            console.error(`Error checking table "${tableName}":`, error);
            return false;
        }
    };

   
}

// Insert data into FTS table
export const loadFtsData = async (data) => {
    try {
        await db.runAsync('INSERT INTO text_fts (id, title, language, font, content, metadata) VALUES (?, ?, ?, ?, ?, ?)', [
            row.id,
            row.title,
            row.language,
            row.font,
            row.content,
            row.metadata,
        ]);
    } catch (error) {
        console.error('Error inserting data into FTS:', error);
    }
};

// Search in FTS table
export const searchFts = async (query) => {
    try {
        let connection = await openConnection();
        return await connection.getAllAsync('SELECT * FROM text_fts WHERE content MATCH ?', [query]);
    } catch (error) {
        console.error('Error searching FTS:', error);
        return [];
    }
};

// Fetch paginated book list
export const getBookList = async (page, limit) => {
    let connection = await openConnection();
    const offset = (page - 1) * limit;
    try {
        return await connection.getAllAsync('SELECT title,id,font FROM text_fts LIMIT ? OFFSET ?', [limit, offset]);
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
};

// Fetch book content by ID
export const getBookContent = async (bookId, lines) => {
    try {
        let connection = await openConnection();
        let row = await connection.getFirstAsync('SELECT content FROM text_fts WHERE id = ? LIMIT 1', [bookId]);
        let lines = String.prototype.split.call(row.content, '\n');
        console.log(lines);

        return lines.join('\n') || '';
    } catch (error) {
        console.error('Error fetching book content:', error);
        return '';
    }
};
