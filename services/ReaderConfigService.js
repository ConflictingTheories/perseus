import AsyncStorage from '@react-native-async-storage/async-storage';

const READER_CONFIG_KEY = 'readerConfig';

export default class ReaderConfigService {
    /**
     * Get reader configuration from AsyncStorage
     * @returns {Promise<Object>}
     */
    static async getReaderConfig() {
        try {
            const config = await AsyncStorage.getItem(READER_CONFIG_KEY);
            return config ? JSON.parse(config) : {};
        } catch (error) {
            console.error('Error fetching reader config:', error);
            return {};
        }
    }

    /**
     * Save reader configuration to AsyncStorage
     * @param {Object} config 
     */
    static async saveReaderConfig(config) {
        try {
            await AsyncStorage.setItem(READER_CONFIG_KEY, JSON.stringify(config));
        } catch (error) {
            console.error('Error saving reader config:', error);
        }
    }
}