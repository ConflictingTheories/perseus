// screens/LibraryScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5dc99', // parchment color
  },
  title: {
    fontSize: 14,
    paddingTop: 10,
    fontWeight: 'bold',
    color: '#1E3A8A', // gold color
    fontFamily: 'serif', // classical font
  },
  button: {
    backgroundColor: '#d4af37', // sage green color
    paddingVertical: 7,
    paddingHorizontal: 49,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1E3A8A', // gold color
    marginTop: 20,
  },
  buttonText: {
    color: '#1E3A8A', // gold color
    fontSize: 16,
    fontFamily: 'serif', // classical font
    fontWeight: 'bold',
  },
});

const LibraryScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  // examples - demo data
  const defaultBooks = [
    {
      id: 'demo-gr',
      title: 'Ὀδύσσεια',
      font: 'GFSDidot_400Regular',
      content: [
        'ἄνδρα μοι ἔννεπε, Μοῦσα, πολύτροπον, ὃς μάλα πολλὰ',
        'πλάγχθη, ἐπεὶ Τροίης ἱερὸν πτολίεθρον ἔπερσε·',
        "πολλῶν δ' ἀνθρώπων ἴδεν ἄστεα καὶ νόον ἔγνω,",
        "πολλὰ δ' ὅ γ' ἐν πόντῳ πάθεν ἄλγεα ὃν κατὰ θυμόν,",
        'ἀρνύμενος ἥν τε ψυχὴν καὶ νόστον ἑταίρων.',
        "ἀλλ' οὐδ' ὣς ἑτάρους ἐρρύσατο, ἱέμενός περ·",
        'αὐτῶν γὰρ σφετέρηισιν ἀτασθαλίηισιν ὄλοντο,',
        'νήπιοι, οἳ κατὰ βους Ὑπερίονος Ἠελίοιο',
        'ἤσθιον· αὐτὰρ ὁ τοῖσιν ἀφείλετο νόστιμον ἦμαρ.',
        'τῶν ἁμόθεν γε, θεά, θύγατερ Διός, εἰπὲ καὶ ἡμῖν.',
      ].join('\n'),
    },
    {
      id: 'demo-lt',
      title: 'Lorem Ipsum',
      font: 'serif',
      content: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.',
        'Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
        'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.',
        'Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.',
        'Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.',
      ].join('\n'),
    },
    {
      id: 'demo-jp',
      font: 'sans-serif',
      title: '古池 (ふるいけ, "Furuike")',
      content: ['ふるいけや', 'かわずとびこむ', 'みずのおと'].join('\n'),
    },
  ];

  useEffect(() => {
    // Fetch books from the Perseus Library API
    fetch('https://api.perseus.tufts.edu/library')
      .then((response) => response.json())
      .then((data) => {
        if (data.books && data.books.length > 0) {
          setBooks(data.books);
        } else {
          setBooks(defaultBooks);
        }
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setBooks(defaultBooks);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collected Works</Text>
      <FlatList
        style={styles.main}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reader', { bookId: item.id, content: item.content, font: item.font, lines: 5 })}>
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LibraryScreen;
