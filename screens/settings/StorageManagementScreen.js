import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../../app/ThemeContext';
import lightModeStyle from '../../styles/lightMode';
import darkModeStyle from '../../styles/darkMode';
import FTSService from '../../services/ftsService';
import SQLiteService from '../../services/sqliteService';
import settings from '../../config/settings';

/**
 * Clear demo data from the database
 */
async function clearDemoData() {
    try {
        await Promise.all(settings.languages.map(async (language) => {
            const fts = new FTSService(language);
            await fts.openDatabase();
            await fts.initialize(); // Reinitialize the database to clear demo data
            await fts.closeDatabase();
        }));
        Alert.alert('Success', 'Demo data cleared successfully.');
    } catch (error) {
        console.error('Error clearing demo data:', error);
        Alert.alert('Error', 'Failed to clear demo data.');
    }
}

/**
 * Clear the entire database
 */
async function clearDatabase() {
    try {
        const sqliteService = new SQLiteService();
        await sqliteService.deleteDatabase(settings.database);
        Alert.alert('Success', 'Database cleared successfully.');
    } catch (error) {
        console.error('Error clearing database:', error);
        Alert.alert('Error', 'Failed to clear database.');
    }
}

/**
 * Setup a new database file
 * @param {*} newDatabaseName 
 */
async function setupNewDatabase(newDatabaseName) {
    try {
        settings.database = newDatabaseName; // Update the database name in settings
        const sqliteService = new SQLiteService();
        await sqliteService.deleteDatabase(newDatabaseName); // Ensure the new database is clean
        await Promise.all(settings.languages.map(async (language) => {
            const fts = new FTSService(language);
            await fts.openDatabase();
            await fts.initialize();
            await fts.closeDatabase();
        }));
        Alert.alert('Success', `New database "${newDatabaseName}" set up successfully.`);
    } catch (error) {
        console.error('Error setting up new database:', error);
        Alert.alert('Error', 'Failed to set up new database.');
    }
}

const StorageManagementScreen = () => {
    const { theme } = useTheme();
    const styles = StyleSheet.create(theme === 'light' ? lightModeStyle.library : darkModeStyle.library);

    const [newDatabaseName, setNewDatabaseName] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Storage Management</Text>

            {/* Clear Demo Data */}
            <TouchableOpacity style={styles.button} onPress={clearDemoData}>
                <Text style={styles.buttonText}>Clear Demo Data</Text>
            </TouchableOpacity>

            {/* Clear Database */}
            <TouchableOpacity style={styles.button} onPress={clearDatabase}>
                <Text style={styles.buttonText}>Clear Database</Text>
            </TouchableOpacity>

            {/* Setup New Database */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter new database name"
                    placeholderTextColor={theme === 'light' ? 'gray' : '#d4af37'}
                    value={newDatabaseName}
                    onChangeText={setNewDatabaseName}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        if (!newDatabaseName.trim()) {
                            Alert.alert('Error', 'Please enter a valid database name.');
                            return;
                        }
                        setupNewDatabase(newDatabaseName);
                    }}
                >
                    <Text style={styles.addButtonText}>Set New Database</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default StorageManagementScreen;