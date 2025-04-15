import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, PanResponder, Modal, Dimensions } from 'react-native';
import { useTheme } from '../app/ThemeContext';
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package
import FTSService from '../services/ftsService';
import settings from '../config/settings';

const ReaderScreen = ({ route }) => {
  const { bookId, language, font, lines } = route.params;
  const { theme } = useTheme();
  const [bookContent, setContent] = useState('');
  const [mode, setMode] = useState('reader');
  const [text, setSelectedText] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fontSize, setFontSize] = useState(16); // Default font size
  const scrollViewRef = useRef(null);

  console.log('Book ID:', bookId);
  console.log('Language:', language);

  const fts = new FTSService(language);

  useEffect(() => {
    async function loadReaderConfig() {
        const config = await ReaderConfigService.getReaderConfig();
        setFontSize(config.fontSize || 16);
        setFontFamily(config.fontFamily || settings.defaultFont);
    }
    loadReaderConfig();
}, []);

  useEffect(() => {
    async function fetchContent(id) {
      await fts.openDatabase();
      const content = await fts.getBookContent(id, lines)
      setContent(content);
    }

    fetchContent(bookId);
  }, [bookId, lines]);

  const styles = StyleSheet.create({
    ...(theme === 'light' ? lightModeStyle.reader : darkModeStyle.reader),
    lineText: {
      fontFamily: font || settings.defaultFont,
      fontSize: fontSize,
      color: theme === 'light' ? 'black' : '#d4af37',
    },
    word: {
      fontFamily: font || settings.defaultFont,
      fontSize: fontSize,
      color: theme === 'light' ? 'black' : '#d4af37',
    }
  });

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 28)); // Limit max size to 28
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12)); // Limit min size to 12
  };

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
    <View style={styles.scrollContainer}>

      {/* Mode Select Switch */}
      <View style={styles.modeSwitch}>
        <TouchableOpacity onPress={() => setMode('reader')}>
          <Text style={mode === 'reader' ? styles.activeMode : styles.inactiveMode}>Reader Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('wordLookup')}>
          <Text style={mode === 'wordLookup' ? styles.activeMode : styles.inactiveMode}>Word Lookup Mode</Text>
        </TouchableOpacity>
      </View>

      {/* Content display */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
        {...panResponder.panHandlers}
        showsVerticalScrollIndicator={false}
      >
        <View>{renderContentWithLineNumbers(bookContent)}</View>
      </ScrollView>

      {/* Top feathered overlay */}
      <LinearGradient
        colors={[theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)', 'transparent']}
        style={styles.overlayTop}
        pointerEvents="none"
      />

      {/* Bottom feathered overlay */}
      <LinearGradient
        colors={['transparent', theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)']}
        style={styles.overlayBottom}
        pointerEvents="none"
      />

      {/* Control buttons */}
      <View style={styles.controlButtonsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={increaseFontSize}>
          <Text style={{ fontSize: 10, color: theme === 'light' ? 'black' : '#d4af37' }}>
            <Ionicons
              name="text"
              size={24}
              color={theme === 'light' ? 'black' : '#d4af37'}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={decreaseFontSize}>
          <Text style={{ fontSize: 10, color: theme === 'light' ? 'black' : '#d4af37' }}>
            <Ionicons
              name="text-outline"
              size={20}
              color={theme === 'light' ? 'black' : '#d4af37'}
            />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for lookup */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <Text style={{ color: theme === 'light' ? 'black' : 'white', fontFamily: font }}>{selectedWord}</Text>
          <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalClose}>
            <Text style={{ color: theme === 'light' ? 'black' : 'white', fontFamily: font }}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ReaderScreen;