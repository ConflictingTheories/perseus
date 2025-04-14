import LexiconService from './lexiconService.js';

export default class LexiconService {
    /**
     * 
     */
    constructor() {
        this.lexicon = {
            'en': {}, // English lexicon
            'grc': {}, // Greek lexicon
            'lat': {}, // Latin lexicon
            'jpn': {}, // Japanese lexicon
            'it': {}, // Italian lexicon
        };
        this.languages = ['en', 'grc', 'lat', 'jpn', 'it'];
    }

    /**
     * 
     * @param {*} language 
     * @param {*} url 
     */
    async loadLexiconFromUrl(language, url, options = {}) {
        try {
            const response = await fetch(url); // Replace with your lexicon URL
            const data = await response.json();

            // process data (e.g., format, filter, sort, etc.)
            const formattedData = data.map(item => {
                // Format the data as needed
                return item;
            });

            // apply lexicon
            this.lexicon[language] = formattedData;

            // add language to the list if not already present
            if (!this.languages.includes(language)) {
                this.languages.push(language);
            }
        } catch (error) {
            console.error('Error loading lexicon:', error);
        }
    }

    /**
     * 
     * @param {*} word 
     * @returns 
     */
    getDefinition(word, language = 'en') {
        if (!this.languages.includes(language)) {
            console.error(`Language ${language} not supported.`);
            return null;
        }

        if (!this.lexicon[language]) {
            console.error(`Lexicon for ${language} not loaded.`);
            return null;
        }

        // Check if the word exists in the lexicon
        if (this.lexicon[language][word]) {
            return this.lexicon[language][word];
        }

        // If the word is not found, return a default message or handle it as needed
        console.error(`Word "${word}" not found in the lexicon for ${language}.`);

        return { definition: 'Definition not found' };
    }

    /**
     * translate text to english
     * @param {*} text 
     * @param {*} language 
     * @returns 
     */
    translateText(text, language) {
        if (!this.languages.includes(language)) {
            console.error(`Language ${language} not supported.`);
            return null;
        }

        if (!this.lexicon[language]) {
            console.error(`Language ${language} not loaded.`);
            return null;
        }

        // use translation Service to translate text
        const translationService = new TranslationService();
        return translationService.translate(text, language);
    }
}