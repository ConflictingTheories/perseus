import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, PanResponder, Modal } from 'react-native';
import { useTheme } from '../app/ThemeContext';
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';
import { getBookContent } from '../data/ftsDb';

const ReaderScreen = ({ route }) => {
  const { bookId, font, lines } = route.params;
  const { theme } = useTheme();
  const [bookContent, setContent] = useState('');
  const [mode, setMode] = useState('reader'); // 'reader' or 'wordLookup'
  const [text, setSelectedText] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchContent(id) {
      setContent(await getBookContent(id, lines));
    }
    fetchContent(bookId);
  }, [bookId, lines]);

  const styles = StyleSheet.create({
    ...(theme === 'light' ? lightModeStyle.reader : darkModeStyle.reader),
    lineText: {
      fontFamily: font || 'serif',
    },
    word: {
      fontFamily: font || 'serif',
    },
  });

  // Implement line selection logic here
  const handleLinePress = (line) => {
    if (mode === 'reader') {
      setSelectedText(line);
      console.log(`Selected line: ${line}`);
      // todo - fetch line translation from API
    }
  };

  // Implement word selection logic here
  const handleWordPress = (word) => {
    if (mode === 'wordLookup') {
      console.log(`Selected word: ${word}`);
      setSelectedWord(word);
      // todo - fetch word definition from API
      setShowModal(true);
    }
  };

  // Render content with line numbers
  const renderContentWithLineNumbers = (content) => {
    return content.split('\n').map((line, index) => (
      <View key={index} style={styles.lineContainer}>
        <TouchableOpacity onPress={() => handleLinePress(line)}>
          <Text style={styles.lineNumber}>{index + 1}</Text>
        </TouchableOpacity>
        <Text style={styles.lineText}>
          {line.split(' ').map((word, wordIndex) => (
            <TouchableOpacity key={wordIndex} onPress={() => handleWordPress(word)}>
              <Text style={styles.word}>{word} </Text>
            </TouchableOpacity>
          ))}
        </Text>
      </View>
    ));
  };

  // Implement PanResponder for text highlighting (TODO)
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setHighlightedText('');
    },
    onPanResponderMove: (evt, gestureState) => {
      const { moveX, moveY } = gestureState;
      // Implement logic to determine which text is being highlighted based on moveX and moveY
      // Update highlightedText state accordingly
    },
    onPanResponderRelease: () => {
      // Finalize the highlighted text selection
      console.log(`Highlighted text: ${highlightedText}`);
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container} {...panResponder.panHandlers}>
      <View style={styles.modeSwitch}>
        <TouchableOpacity onPress={() => setMode('reader')}>
          <Text style={mode === 'reader' ? styles.activeMode : styles.inactiveMode}>Reader Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('wordLookup')}>
          <Text style={mode === 'wordLookup' ? styles.activeMode : styles.inactiveMode}>Word Lookup Mode</Text>
        </TouchableOpacity>
      </View>
      <View>{renderContentWithLineNumbers(bookContent)}</View>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontFamily: font }}>{selectedWord}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalClose}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ReaderScreen;
