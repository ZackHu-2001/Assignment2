import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import ItemsList from '../components/ItemsList';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { getDiets } from '../services/firestore';

const DietScreen = ({ navigation }) => {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    getDiets().then(diets => {
      setDiets(diets);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15, flexDirection: 'row' }}
          onPress={() => navigation.navigate('AddDiet')} >
          <Ionicons name="add" size={24} color="black" />
          <Icon name="nutrition" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  })
  return (
    <View>
      <ItemsList items={diets} />
    </View>
  );
};

export default DietScreen;