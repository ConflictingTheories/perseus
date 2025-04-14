import { GFSDidot_400Regular } from '@expo-google-fonts/gfs-didot';

export default {
    database: 'perseus.db',
    databaseFile: require('../assets/perseus.db'),
    documentTableName: 'documents',
    ftsTableNamePrefix: 'text_fts_',
    languages: [
        'en', // English
        'grc', // Greek
        'lat', // Latin
        'jpn', // Japanese
        'it', // Italian
    ],
    defaultFont: 'sans-serif',
    defaultLanguage: 'en',
    fonts: {
        GFSDidot_400Regular,
    },
    fontMap: {
        'en': 'sans-serif',
        'grc': 'GFSDidot_400Regular',
        'lat': 'serif',
        'jpn': 'sans-serif',
        'it': 'serif',
    },
}