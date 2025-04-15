export default {
  // navigation styles (unchanged)
  navigation: {
    headerStyle: {
      backgroundColor: '#111',
      color: '#d4af37', // gold color
    },
    headerTintColor: '#d4af37',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'serif',
    },
    headerBackTitleStyle: {
      fontFamily: 'serif',
    },
  },
  themeProvider: {
    container: {
      flex: 1,
      backgroundColor: 'black',
      color: 'white',
    },
    text: {
      padding: 10,
      color: '#d4af37', // gold color
    }
  },
  // library screen (unchanged)
  library: {
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
    repositoryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
    },
    repositoryText: {
      flex: 1,
      fontSize: 14,
      color: 'white',
    },
    fetchButton: {
      backgroundColor: 'blue',
      padding: 5,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    fetchButtonText: {
      color: 'white',
      fontSize: 12,
    },
    removeButton: {
      backgroundColor: 'red',
      padding: 5,
      borderRadius: 5,
    },
    removeButtonText: {
      color: 'white',
      fontSize: 12,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      color: 'white',
    },
    addButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      marginLeft: 10,
    },
    addButtonText: {
      color: 'white',
      fontSize: 14,
    },
  },
  // reader screen - updated for dark mode
  reader: {
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#d4af37', // gold color
      fontFamily: 'serif', // classical font
    },
    modalClose: {
      position: 'absolute',
      top: 10,
      right: 25,
    },
    modal: {
      flex: 1,
      alignItems: 'center',
      height: '40%',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#1a1a1a', // dark background for modal
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: '#121212', // dark background
    },
    modeSwitch: {
      flexDirection: 'row',
      backgroundColor: '#1a1a1a', // dark background
      justifyContent: 'space-around',
      marginBottom: 10,
      marginTop: 10,
    },
    activeMode: {
      fontWeight: 'bold',
      color: '#d4af37', // gold color for active mode
    },
    inactiveMode: {
      color: '#666', // dimmed color for inactive
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
      color: '#555', // dimmed color for line numbers
    },
    lineText: {
      flex: 1,
      flexWrap: 'wrap',
      color: '#e0e0e0', // light text color
    },
    word: {
      fontWeight: 'normal',
      color: '#e0e0e0', // light text color
    },
    overlayTop: {
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0,
      height: 30,
      zIndex: 1,
    },
    overlayBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 40,
      zIndex: 1,
    },
    scrollContainer: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#1a1a1a', // dark background
    },
    contentContainer: {
      paddingTop: 32,
      paddingBottom: 32,
      backgroundColor: 'black'
    },
    controlButtonsContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 2,
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    controlButton: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
  },
};