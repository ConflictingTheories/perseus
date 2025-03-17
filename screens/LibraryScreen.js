// screens/LibraryScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import defaultBooks from '../data/demo';
import { useTheme, toggleTheme } from '../app/ThemeContext';
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';
import { getBookList, initializeFts } from '../data/ftsDb';

const LibraryScreen = ({ navigation, darkMode }) => {
  const [books, setBooks] = useState([]);
  const { theme } = useTheme();
  const [page, setPage] = useState(1);
  const limit = 10;

  const styles = StyleSheet.create(theme === 'light' ? lightModeStyle.library : darkModeStyle.library);

  useEffect(() => {
    // initialize book database internally
    initializeFts().then(() => {
      getBookList(page, limit).then((data) => {
        if (data && data.length > 0) {
          setBooks(data);
        }
        console.log('Books fetched:', data);
      });
    });

    // // Fetch books from the Perseus Library API
    // fetch('https://api.perseus.tufts.edu/library')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.books && data.books.length > 0) {
    //       setBooks(data.books);
    //     } else {
    //       // setBooks(defaultBooks);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching books:', error);
    //     // setBooks(defaultBooks);
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
            onPress={() => navigation.navigate('Reader', { bookId: item.id, content: item.content, darkMode, font: item.font, lines: 5 })}
          >
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LibraryScreen;
