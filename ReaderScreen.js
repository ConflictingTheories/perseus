import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, PanResponder, Modal } from 'react-native';

const ReaderScreen = ({ route }) => {
  const { content } = route.params;
  const [bookContent] = useState(content || '');
  const [mode, setMode] = useState('reader'); // 'reader' or 'wordLookup'
  const [, setSelectedText] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleLinePress = (line) => {
    if (mode === 'reader') {
      setSelectedText(line);
      // Implement line selection logic here
      console.log(`Selected line: ${line}`);
      // todo - fetch line translation from API
    }
  };

  const handleWordPress = (word) => {
    if (mode === 'wordLookup') {
      // Implement word selection logic here
      console.log(`Selected word: ${word}`);
      setSelectedWord(word);
      // todo - fetch word definition from API
      setShowModal(true);
    }
  };

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>{selectedWord}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d4af37', // gold color
    fontFamily: 'serif', // classical font
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#f5f5dc', // parchment color
  },
  modeSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  activeMode: {
    fontWeight: 'bold',
    color: 'blue',
  },
  inactiveMode: {
    color: 'gray',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  lineNumber: {
    width: 30,
    textAlign: 'right',
    marginRight: 10,
    color: '#888',
  },
  lineText: {
    flex: 1,
    flexWrap: 'wrap',
  },
  word: {
    fontWeight: 'normal',
  },
});

export default ReaderScreen;
