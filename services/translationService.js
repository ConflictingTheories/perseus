import settings from "../config/settings";

export default class TranslationService {
    constructor() {
        // details about supported languages
        this.languageMap = {
            grc: {
                direction: 'ltr',
                name: 'Greek',
                description: 'Ancient Greek language, used in classical literature.',
                example: 'Ἀθηναῖος',
                api: {
                    url: 'https://api.example.com/translate/grc',
                    key: 'API_KEY_FOR_GREEK',
                    defaultParams: {
                        text: '',
                        target: settings.defaultLanguage,
                    }
                }

            },
            jpn: {
                direction: 'ltr',
                name: 'Japanese',
                description: 'Japanese language, used in modern literature.',
                example: 'こんにちは',
                api: {
                    url: 'https://api.example.com/translate/jpn',
                    key: 'API_KEY_FOR_JAPANESE',
                    defaultParams: {
                        text: '',
                        target: settings.defaultLanguage,
                    }
                }
            },
            lat: {
                direction: 'ltr',
                name: 'Latin',
                description: 'Latin language, used in classical literature.',
                example: 'Salve',
                api: {
                    url: 'https://api.example.com/translate/lat',
                    key: 'API_KEY_FOR_LATIN',
                    defaultParams: {
                        text: '',
                        target: settings.defaultLanguage,
                    }
                }
            },
            it: {
                direction: 'ltr',
                name: 'Italian',
                description: 'Italian language, used in modern literature.',
                example: 'Ciao',
                api: {
                    url: 'https://api.example.com/translate/it',
                    key: 'API_KEY_FOR_ITALIAN',
                    defaultParams: {
                        text: '',
                        target: settings.defaultLanguage,
                    }
                }
            }
        };
    }

    //translate text to english
    translateText(text, language) {
        if (!settings.languages.includes(language)) {
            console.error(`Language ${language} not supported.`);
            return null;
        }

        if (!this.languageMap[language]) {
            console.error(`Language ${language} not loaded.`);
            return null;
        }

        // todo - implement translation logic

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