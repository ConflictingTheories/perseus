import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../app/ThemeContext';
import lightModeStyle from '../../styles/lightMode';
import darkModeStyle from '../../styles/darkMode';
// Not working at the moment - TODO
// import TEIService from '../../services/teiService';
// import LibraryService from '../../services/libraryService';

const RepositoryManagementScreen = () => {
    const { theme } = useTheme();
    const styles = StyleSheet.create(theme === 'light' ? lightModeStyle.library : darkModeStyle.library);

    const [repositories, setRepositories] = useState([]);
    const [newRepoUrl, setNewRepoUrl] = useState('');
    // const teiService = new TEIService();
    // const libraryService = new LibraryService();

    /**
     * Add a new repository to the list
     */
    const addRepository = () => {
        if (!newRepoUrl.trim()) {
            Alert.alert('Error', 'Please enter a valid repository URL.');
            return;
        }

        setRepositories([...repositories, { url: newRepoUrl }]);
        setNewRepoUrl('');
    };

    /**
     * Remove a repository from the list
     * @param {*} index 
     */
    const removeRepository = (index) => {
        const updatedRepositories = [...repositories];
        updatedRepositories.splice(index, 1);
        setRepositories(updatedRepositories);
    };

    /**
     * Fetch and process TEI files from the repository
     * @param {*} repository 
     */
    const fetchRepository = async (repository) => {
        // try {
        //     const response = await fetch(repository.url);
        //     if (!response.ok) {
        //         Alert.alert('Error', `Failed to fetch repository: ${repository.url}`);
        //         return;
        //     }

        //     const data = await response.text(); // Assuming the repository returns XML content
        //     const parsedContent = await teiService.parseXMLContent(data);

        //     // Add parsed content to the library
        //     parsedContent.forEach((content) => {
        //         libraryService.addBook({
        //             id: content.canonicalId || Math.random().toString(36).substr(2, 9),
        //             title: content.title || 'Untitled',
        //             language: content.language || 'en',
        //             font: teiService.getFont(content.language),
        //             content: content.content,
        //             metadata: content.metadata,
        //         });
        //     });

        //     Alert.alert('Success', `Repository processed successfully: ${repository.url}`);
        // } catch (error) {
        //     console.error('Error fetching repository:', error);
        //     Alert.alert('Error', `Failed to process repository: ${repository.url}`);
        // }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Repository Management</Text>

            {/* Add Repository */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter repository URL"
                    placeholderTextColor={theme === 'light' ? 'gray' : '#d4af37'}
                    value={newRepoUrl}
                    onChangeText={setNewRepoUrl}
                />
                <TouchableOpacity style={styles.addButton} onPress={addRepository}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            {/* Repository List */}
            <FlatList
                style={styles.main}
                data={repositories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.repositoryItem}>
                        <Text style={styles.repositoryText}>{item.url}</Text>
                        <TouchableOpacity
                            style={styles.fetchButton}
                            onPress={() => fetchRepository(item)}
                        >
                            <Text style={styles.fetchButtonText}>Fetch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeRepository(index)}
                        >
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default RepositoryManagementScreen;