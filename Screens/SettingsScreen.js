import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
    const context = useContext(ThemeContext);
    const { toggleTheme } = context;
    return (
        <View style={styles.container}>
            <Button title='Toggle Theme' onPress={() => toggleTheme()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SettingsScreen;