import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Item = ({ title, alert, date, detail }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {alert ? <Feather name="alert-triangle" size={16} color="black" /> : <View style={{width: 16}}></View>}
            <Text style={[styles.content, { width: 120 }]}>{date}</Text>
            <Text style={[styles.content, { width: 80 }]}>{detail}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    title: {
        fontSize: 20,
        width: 80,
        fontSize: 14,
    },
    content: {
        fontSize: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
        padding: 5,
        borderRadius: 5,
    }
});

export default Item;
