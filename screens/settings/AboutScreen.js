import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../app/ThemeContext';
import lightModeStyle from '../../styles/lightMode';
import darkModeStyle from '../../styles/darkMode';

/**
 * About Screen Component
 * @returns 
 */
const AboutScreen = () => {
    const { theme } = useTheme();
    const styles = StyleSheet.create(theme === 'light' ? lightModeStyle.library : darkModeStyle.library);

    return (
        <View style={{...styles.lineContainer, padding:10}}>    
            <Text style={styles.title}>About</Text>
            <Text style={styles.text}>
                Logios is an open-source project designed to provide a seamless reading experience.
                It supports multiple formats like PDF, EPUB, and plain text, and offers features like
                offline reading, repository management, and more.
            </Text>
            <Text style={styles.text}>
                Version: 0.1.1
            </Text>
            <Text style={styles.text}>
                Developed by Kyle Derby MacInnis in partnership with Sovereign Research Corporation.
            </Text>
        </View>
    );
};

export default AboutScreen;