import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemsList from '../components/ItemsList';
import { getActivities } from '../services/firestore';

const ActivitiesScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        getActivities().then(activities => {
            setActivities(activities);
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15, flexDirection: 'row' }} 
                    onPress={() => navigation.navigate('AddActivity')} >
                    <Ionicons name="add" size={24} color="black" />
                    <Icon name="walk" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View>
            <ItemsList items={activities} itemsType={'activity'}/>
        </View>
    );
}

export default ActivitiesScreen;