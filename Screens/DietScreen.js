import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import ItemsList from '../components/ItemsList';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

const DietScreen = ({ navigation }) => {
  const handleAddDiet = () => {
    navigation.navigate('AddDiet');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15, flexDirection: 'row' }} onPress={handleAddDiet} >
          <Ionicons name="add" size={24} color="black" />
          <Icon name="nutrition" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  })
  return (
    <View>
        <ItemsList items={[]}/>
    </View>
  );
};

export default DietScreen;