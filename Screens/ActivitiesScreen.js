import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemsList from '../components/ItemsList';

const ActivitiesScreen = ({ navigation }) => {
    const handleAddActivity = () => {
        navigation.navigate('AddActivity');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15, flexDirection: 'row' }} onPress={handleAddActivity} >
                    <Ionicons name="add" size={24} color="black" />
                    <Icon name="walk" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View>
            <ItemsList items={[]}/>
        </View>
    );
}

export default ActivitiesScreen;