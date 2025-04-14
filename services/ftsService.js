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
     * 
     * @returns 
     */
    async openDatabase() {
        this.db = await this.sqliteService.openDatabase(this.database);
        return this.db;
    }

    /**
     * 
     */
    async closeDatabase() {
        await this.sqliteService.closeDatabase();
    }

    /**
     * 
     * @param {*} language 
     * @returns 
     */
    async initializeFts(language) {
        try {
            if (!this.db) {
                console.error(`Database not initialized. Cannot check table existence.`);
                return false;
            }
            const tableExists = await this.sqliteService.checkIfTableExists(this.ftsTableName);
            if (!tableExists) {
                await this.db.execAsync(`CREATE VIRTUAL TABLE ${this.ftsTableName} USING fts5(id, title, language, font, content, metadata)`);
                console.log('FTS table created.');

            } else {
                console.log('FTS table already exists. Skipping initialization.');
            }
        } catch (error) {
            console.error('Error initializing FTS table:', error);
        }
    };

    /**
     * 
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
                await this.db.runAsync(`INSERT INTO ${this.ftsTableName} (id, title, language, font, content, metadata) VALUES (?, ?, ?, ?, ?, ?)`, [
                    row.id,
                    row.title,
                    row.language,
                    row.font,
                    row.content,
                    row.metadata,
                ]);
            }
        } catch (error) {
            console.error('Error loading FTS data:', error);
        }
    }
}