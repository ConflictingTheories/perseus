// screens/LibraryScreen.js
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../app/ThemeContext';
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';

/**
 * Screen Component
 * @param {*} param0 
 * @returns 
 */
const SettingsScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const styles = StyleSheet.create(theme === 'light' ? lightModeStyle.library : darkModeStyle.library);

    // TODO - support fetching books from API (look into a 'settings' menu - which can be used to sync)

    // TODO - also implement the option to upload books to the database
    // from a number of sources - PDF, EPUB, Text, etc.

    // TODO - look into making this a feature (paid??)
    // support offline reading of books
    // Fetch books from the Perseus Library API
    // fetch('https://api.perseus.tufts.edu/library')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.books && data.books.length > 0) {
    //       // load into FTS database
    //       loadFtsData(data.books);
    //     } 
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching remote books:', error);
    //   });

    const settingsOptions = [
        { id: '1', title: 'Storage Management', screen: 'StorageManagement' },
        { id: '2', title: 'Repository Management', screen: 'RepositoryManagement' },
        { id: '3', title: 'Reader Settings', screen: 'ReaderSettings' },
        { id: '4', title: 'About', screen: 'About' },
        { id: '5', title: 'Open Source', screen: 'OpenSource' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <FlatList
                style={styles.main}
                data={settingsOptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate(item.screen)} // Ensure navigation works for all routes
                    >
                        <Text style={styles.buttonText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default SettingsScreen;
