import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Button title='Toggle Theme' />
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