// screens/LibraryScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '../app/ThemeContext';
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';
import FTSService from '../services/ftsService';
import demo from '../data/demo';

/**
 * Setup initial demo data
 */
async function initializeDemoData() {
  await Promise.all(['grc', 'lat', 'en', 'it', 'jpn'].map(async (language) => {
    const fts = new FTSService('perseus.db', language);
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
  const allBooks = await Promise.all(['grc', 'lat', 'en', 'it', 'jpn'].map(async (language) => {
    const fts = new FTSService('perseus.db', language);
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
const LibraryScreen = ({ navigation, darkMode }) => {
  const [books, setBooks] = useState([]);
  const { theme } = useTheme();
  const [page, setPage] = useState(1);
  const limit = 10;

  const styles = StyleSheet.create(theme === 'light' ? lightModeStyle.library : darkModeStyle.library);

  useEffect(() => {
    loadDemoData(page, limit, setBooks);
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
