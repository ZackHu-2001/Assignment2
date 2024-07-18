import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style, textStyle }) => {
    return (
        <Pressable style={({ pressed }) => [
            styles.button,
            style,
            pressed && styles.buttonPressed,
        ]}
            onPress={onPress}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>

        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 140,
    },
    buttonPressed: {
        backgroundColor: '#0056b3',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Button;