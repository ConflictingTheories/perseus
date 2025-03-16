import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';


const ReaderScreen = ({ route }) => {
  const { bookId, lines, content } = route.params;
  const [bookContent, setBookContent] = useState(content || '');
  const [mode, setMode] = useState('reader'); // 'reader' or 'wordLookup'
  const [selectedText, setSelectedText] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  useEffect(() => {
    if (!content && bookId !== 'lorem-ipsum') {
      // Fetch book content from the Perseus Library API
      fetch(`https://scaife.perseus.org/api/cts?request=GetPassage&urn=${bookId}&start=1&end=${lines}`)
        .then(response => response.json())
        .then(data => {
          if (data.passages && data.passages.length > 0) {
            const passage = data.passages[0].content;
            setBookContent(passage);
          } else {
            setBookContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
          }
        })
        .catch(error => {
          console.error('Error fetching book content:', error);
          setBookContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
        });
    }
  }, [bookId, lines, content]);

  const handleWordPress = (word) => {
    if (mode === 'wordLookup') {
      setSelectedText(word);
      // Implement word lookup logic here
      console.log(`Selected word: ${word}`);
    }
  };

  const handleLinePress = (line) => {
    if (mode === 'reader') {
      setSelectedText(line);
      // Implement line selection logic here
      console.log(`Selected line: ${line}`);
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
      <View>
        {renderContentWithLineNumbers(bookContent)}
      </View>
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
  }
});

export default ReaderScreen;