export default class TranslationService {
    constructor() {
        // default target language for translation output (english only for now)
        this.targetLanguage = 'en';

        // supported languages for translation
        this.languages = ['grc', 'lat', 'jpn', 'it'];

        // details about supported languages
        this.languageMap = {
            grc: {
                direction: 'ltr',
                font: 'GFSDidot_400Regular',
                name: 'Greek',
                description: 'Ancient Greek language, used in classical literature.',
                example: 'Ἀθηναῖος',
                api: {
                    url: 'https://api.example.com/translate/grc',
                    key: 'API_KEY_FOR_GREEK',
                    defaultParams: {
                        text: '',
                        target: this.targetLanguage,
                    }
                }

            },
            jpn: {
                direction: 'ltr',
                font: 'sans-serif',
                name: 'Japanese',
                description: 'Japanese language, used in modern literature.',
                example: 'こんにちは',
                api: {
                    url: 'https://api.example.com/translate/jpn',
                    key: 'API_KEY_FOR_JAPANESE',
                    defaultParams: {
                        text: '',
                        target: this.targetLanguage,
                    }
                }
            },
            lat: {
                direction: 'ltr',
                font: 'serif',
                name: 'Latin',
                description: 'Latin language, used in classical literature.',
                example: 'Salve',
                api: {
                    url: 'https://api.example.com/translate/lat',
                    key: 'API_KEY_FOR_LATIN',
                    defaultParams: {
                        text: '',
                        target: this.targetLanguage,
                    }
                }
            },
            it: {
                direction: 'ltr',
                font: 'serif',
                name: 'Italian',
                description: 'Italian language, used in modern literature.',
                example: 'Ciao',
                api: {
                    url: 'https://api.example.com/translate/it',
                    key: 'API_KEY_FOR_ITALIAN',
                    defaultParams: {
                        text: '',
                        target: this.targetLanguage,
                    }
                }
            }
        };
    }

    //translate text to english
    translateText(text, language) {
        // todo - implement translation logic
        if (!this.languages.includes(language)) {
            console.error(`Language ${language} not supported.`);
            return null;
        }
        if (!this.languageMap[language]) {
            console.error(`Language ${language} not loaded.`);
            return null;
        }

        // perform translation using the API
        const apiUrl = this.languageMap[language].api.url;
        const apiKey = this.languageMap[language].api.key;
        const params = {
            ...this.languageMap[language].api.defaultParams,
            text: text,
        };

        // For now, just return the text as is
        return text;
    }
}