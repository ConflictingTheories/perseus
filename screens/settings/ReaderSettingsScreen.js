import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../app/ThemeContext';
import lightModeStyle from '../../styles/lightMode';
import darkModeStyle from '../../styles/darkMode';
import ReaderConfigService from '../../services/ReaderConfigService';
import Slider from '@react-native-community/slider';
/**
 * Reader Settings Screen Component
 * @returns 
 */
const ReaderSettingsScreen = () => {
    const { theme } = useTheme();
    const styles = StyleSheet.create(theme === 'light' ? lightModeStyle.library : darkModeStyle.library);

    const [fontSize, setFontSize] = useState(16);
    const [lineSpacing, setLineSpacing] = useState(1.5);
    const [fontFamily, setFontFamily] = useState('default');

    useEffect(() => {
        // Load saved settings on mount
        async function loadSettings() {
            const config = await ReaderConfigService.getReaderConfig();
            setFontSize(config.fontSize || 16);
            setLineSpacing(config.lineSpacing || 1.5);
            setFontFamily(config.fontFamily || 'default');
        }
        loadSettings();
    }, []);

    const saveSettings = async () => {
        const config = { fontSize, lineSpacing, fontFamily };
        await ReaderConfigService.saveReaderConfig(config);
        console.log('Reader settings saved:', config);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reader Settings</Text>

            {/* Font Size Setting */}
            <View style={styles.setting}>
                <Text style={styles.label}>Font Size</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={12}
                    maximumValue={28}
                    step={1}
                    value={fontSize}
                    onValueChange={setFontSize}
                />
                <Text style={styles.value}>{fontSize}</Text>
            </View>

            {/* Line Spacing Setting */}
            <View style={styles.setting}>
                <Text style={styles.label}>Line Spacing</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={2}
                    step={0.1}
                    value={lineSpacing}
                    onValueChange={setLineSpacing}
                />
                <Text style={styles.value}>{lineSpacing.toFixed(1)}</Text>
            </View>

            {/* Font Family Setting */}
            <View style={styles.setting}>
                <Text style={styles.label}>Font Family</Text>
                <TouchableOpacity onPress={() => setFontFamily('default')}>
                    <Text style={fontFamily === 'default' ? styles.activeOption : styles.inactiveOption}>Default</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFontFamily('serif')}>
                    <Text style={fontFamily === 'serif' ? styles.activeOption : styles.inactiveOption}>Serif</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFontFamily('sans-serif')}>
                    <Text style={fontFamily === 'sans-serif' ? styles.activeOption : styles.inactiveOption}>Sans-Serif</Text>
                </TouchableOpacity>
            </View>

            {/* Save Button */}
            <TouchableOpacity style={{ ...styles.button, ...styles.saveButton }} onPress={saveSettings}>
                <Text style={styles.saveButtonText}>Save Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ReaderSettingsScreen;