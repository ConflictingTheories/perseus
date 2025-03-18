import * as SQLite from 'expo-sqlite';
import demo from './demo';
import { deleteDatabaseAsync } from 'expo-sqlite';

// Open a SINGLE database connection globally

// Open database connection
export const openConnection = async () => {
  return await SQLite.openDatabaseAsync('perseus.db', { useNewConnection: true });
};

// delete database (for testing / reset)
export const deleteTable = async () => {
  await deleteDatabaseAsync('perseus.db');
};

// Check if table exists
export const checkIfTableExists = async (tableName) => {
  try {
    console.log(`Checking if table exists: ${tableName}`);
    let connection = await openConnection();
    let rows = await connection.getAllAsync("SELECT name FROM sqlite_master WHERE type='table' AND name=?", [tableName]);
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
      let connection = await openConnection();
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
    const db = SQLite.openDatabaseAsync('perseus.db', { useNewConnection: false });
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
