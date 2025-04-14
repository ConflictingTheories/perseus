import * as SQLite from 'expo-sqlite';
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

    async dropTable(tableName) {
        try {
            if (!this.db) {
                console.error(`Database not initialized. Cannot drop table.`);
                return false;
            }
            await this.db.execAsync(`DROP TABLE IF EXISTS ${tableName}`);
            return true;
        } catch (error) {
            console.error(`Error dropping table "${tableName}":`, error);
            return false;
        }
    }
}

