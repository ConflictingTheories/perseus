import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../app/ThemeContext';
import lightModeStyle from '../../styles/lightMode';
import darkModeStyle from '../../styles/darkMode';

/**
 * Open Source Screen Component
 * @returns 
 */
const OpenSourceScreen = () => {
    const { theme } = useTheme();
    const styles = StyleSheet.create(theme === 'light' ? lightModeStyle.library : darkModeStyle.library);

    return (
        <View style={{...styles.lineContainer, padding:10}}>    
            <Text style={styles.title}>Open Source</Text>
            <Text style={styles.text}>
                Logios is built using open-source technologies and libraries. We are grateful to the
                open-source community for their contributions, which make this project possible.
            </Text>
            <Text style={styles.text}>
                Libraries Used:
            </Text>
            <Text style={styles.text}>
                - React Native (Expo)
            </Text>
            <Text style={styles.text}>
                - SQLite
            </Text>
            <Text style={styles.text}>
                - Perseus Library API
            </Text>
            <Text style={styles.text}>
                For more details, visit our GitHub repository:
            </Text>
            <Text style={styles.link}>
                https://github.com/ConflictingTheories/logios
            </Text>
        </View>
    );
};

export default OpenSourceScreen;