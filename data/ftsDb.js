import * as SQLite from 'expo-sqlite';
import demo from './demo';
import { deleteDatabaseAsync } from 'expo-sqlite';

// Open a SINGLE database connection globally
deleteDatabaseAsync('perseus.db');
const db = SQLite.openDatabaseAsync('perseus.db', { useNewConnection: false });

// Check if table exists
export const checkIfTableExists = async (tableName) => {
  try {
    console.log(`Checking if table exists: ${tableName}`);
    let connection = await db;
    let res = await connection.runAsync("SELECT name FROM sqlite_master WHERE type='table' AND name=?", [tableName]);
    let rows = await res.getAllAsync();
    return rows.length > 0;
  } catch (error) {
    console.error(`Error checking table "${tableName}":`, error);
    return false;
  }
};

// Initialize FTS table (async)
export const initializeFts = async () => {
  try {
    let tableExists = await checkIfTableExists('text_fts');

    if (!tableExists) {
      let connection = await db;
      await connection.execAsync('CREATE VIRTUAL TABLE text_fts USING fts4(id, title, language, font, content, metadata)');
      console.log('FTS table created.');

      console.log('Inserting demo data...');
      for (const row of demo) {
        await connection.runAsync('INSERT INTO text_fts (id, title, language, font, content, metadata) VALUES (?, ?, ?, ?, ?, ?)', [
          row.id,
          row.title,
          row.language,
          row.font,
          row.content,
          row.metadata,
        ]);
      }
      console.log('FTS table populated.');
    } else {
      console.log('FTS table already exists. Skipping initialization.');
    }
  } catch (error) {
    console.error('Error initializing FTS table:', error);
  }
};

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
    return await db.getAllAsync('SELECT * FROM text_fts WHERE content MATCH ?', [query]);
  } catch (error) {
    console.error('Error searching FTS:', error);
    return [];
  }
};

// Fetch paginated book list
export const getBookList = async (page, limit) => {
  const db = await SQLite.openDatabaseAsync('perseus.db', { useNewConnection: true });
  const offset = (page - 1) * limit;
  try {
    return await db.getAllAsync('SELECT * FROM text_fts LIMIT ? OFFSET ?', [limit, offset]);
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

// Fetch book content by ID
export const getBookContent = async (bookId) => {
  try {
    let res = await db.runAsync('SELECT content FROM text_fts WHERE rowid = ? LIMIT 1', [bookId]);
    let content = await res.getFirstAsync();
    return content ? content.content : '';
  } catch (error) {
    console.error('Error fetching book content:', error);
    return '';
  }
};
