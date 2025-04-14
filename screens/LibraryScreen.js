// screens/LibraryScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '../app/ThemeContext';
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';
import FTSService from '../services/ftsService';
import demo from '../data/demo';
import settings from '../config/settings';

/**
 * Setup initial demo data
 */
async function initializeDemoData() {
  await Promise.all(settings.languages.map(async (language) => {
    const fts = new FTSService(language);
    await fts.openDatabase();
    await fts.initialize();
    await fts.loadFtsData(demo[language]);
    await fts.closeDatabase();
  }));
}

/**
 * get list of books from database (paged)
 * @param {*} page 
 * @param {*} limit 
 * @returns 
 */
async function getBookList(page, limit) {
  const allBooks = await Promise.all(settings.languages.map(async (language) => {
    const fts = new FTSService(language);
    await fts.openDatabase();
    const books = await fts.getBookList(page, limit);
    console.log(['books for language', language, books]);
    await fts.closeDatabase();
    return books;
  }));
  return allBooks.flat();
}

/**
 * Load demo data into the FTS database.
 */
loadDemoData = async (page, limit, setBooks) => {
  try {
    await initializeDemoData();
    const allBooks = await getBookList(page, limit);
    if (allBooks && allBooks.length > 0) {
      setBooks(allBooks);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Screen Component
 * @param {*} param0 
 * @returns 
 */
const LibraryScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const { theme } = useTheme();
  const [page, setPage] = useState(1);
  const limit = 10;

  const styles = StyleSheet.create(theme === 'light' ? lightModeStyle.library : darkModeStyle.library);

  // load demo data - further datasets can be configured and loaded via settings (including the deletion of the demo data)
  useEffect(() => {
    loadDemoData(page, limit, setBooks);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collected Works</Text>
      <FlatList
        style={styles.main}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => navigation.navigate('Reader', { bookId: item.id, language: item.language, font: item.font, lines: 5 })}
          >
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LibraryScreen;
