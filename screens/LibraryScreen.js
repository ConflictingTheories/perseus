// screens/LibraryScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '../app/ThemeContext';
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';
import FTSService from '../services/ftsService';
import demo from '../data/demo';

/**
 * Load demo data into the FTS database.
 */
loadDemoData = async (page, limit, setBooks) => {
  const grcFts = new FTSService('perseus.db', 'grc');
  const latFts = new FTSService('perseus.db', 'lat');
  const enFts = new FTSService('perseus.db', 'en');
  const itFts = new FTSService('perseus.db', 'it');
  const jpnFts = new FTSService('perseus.db', 'jpn');

  try {
    Promise.all([
      grcFts.openDatabase(),
      latFts.openDatabase(),
      enFts.openDatabase(),
      itFts.openDatabase(),
      jpnFts.openDatabase(),
    ]).then(() => Promise.all([
      grcFts.initialize(),
      latFts.initialize(),
      enFts.initialize(),
      itFts.initialize(),
      jpnFts.initialize(),
    ])).then(() => Promise.all([
      grcFts.loadFtsData(demo.grc),
      latFts.loadFtsData(demo.lat),
      enFts.loadFtsData(demo.en),
      itFts.loadFtsData(demo.it),
      jpnFts.loadFtsData(demo.jpn),
    ])).then(() => Promise.all([
      grcFts.getBookList(page, limit),
      latFts.getBookList(page, limit),
      enFts.getBookList(page, limit),
      itFts.getBookList(page, limit),
      jpnFts.getBookList(page, limit),
    ])).then((data) => {
      const allBooks = data.flat();//.filter((book) => {
        // return book && book.id && book.title && book.language && book.font
      // });
      if (allBooks && allBooks.length > 0) {
        setBooks(allBooks);
      }
      console.log('Books fetched:', allBooks);
    }).then(() => Promise.all([
      grcFts.closeDatabase(),
      latFts.closeDatabase(),
      enFts.closeDatabase(),
      itFts.closeDatabase(),
      jpnFts.closeDatabase(),
    ]))
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  } catch (error) {

  }
}

const LibraryScreen = ({ navigation, darkMode }) => {
  const [books, setBooks] = useState([]);
  const { theme } = useTheme();
  const [page, setPage] = useState(1);
  const limit = 10;

  const styles = StyleSheet.create(theme === 'light' ? lightModeStyle.library : darkModeStyle.library);

  useEffect(() => {
    loadDemoData(page, limit, setBooks);

    // TODO - support fetching books from API

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
