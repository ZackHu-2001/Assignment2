import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import ItemsList from '../components/ItemsList';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { getDiets } from '../services/firestore';
import { useFocusEffect } from '@react-navigation/native';

const DietScreen = ({ navigation }) => {
  const [diets, setDiets] = useState([]);

  const fetchDiets = async () => {
    const diets = await getDiets();
    setDiets(diets);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchDiets();
    }, [])
  );

  useEffect(() => {
    fetchDiets();

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15, flexDirection: 'row' }}
          onPress={() => navigation.navigate('AddDiet')} >
          <Ionicons name="add" size={24} color="black" />
          <Icon name="nutrition" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ItemsList items={diets} />
  );
};

export default DietScreen;