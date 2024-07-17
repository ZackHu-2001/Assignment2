import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Button from './Button';

const ItemsList = ({ items, itemsType }) => {
    return (
        <ScrollView>
            {items.map(item => (
                <Button key={item.id}>{item.name}</Button>
            ))}
        </ScrollView>
    );
};

export default ItemsList;