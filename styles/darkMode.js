export default {
    // navigation styles
    navigation: {
      headerStyle: {
        backgroundColor: '#fff',
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
    // library screen
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
    },
    // reader screen
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
        backgroundColor: 'white',
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
    },
  };
  