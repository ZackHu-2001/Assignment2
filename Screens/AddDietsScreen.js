import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addDiet, updateDiet, getDiet, deleteDiet } from '../services/firestore';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../utils/styles';

const AddDietsScreen = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params || {};

    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');

    useEffect(() => {
        if (id) {
            // Fetch diets details from Firestore
            getDiet(id).then(diets => {
                if (diets) {
                    setDescription(diets.description);
                    setCalories(diets.calories.toString());
                    setDate(new Date(diets.date));
                }
            }).catch(error => {
                console.log(error)
            });
        }

        navigation.setOptions({
            headerTitle: id ? 'Edit Diets' : 'Add Diets',
            headerRight: () => (
                id ? (
                    <TouchableOpacity style={{ marginRight: 15, flexDirection: 'row' }}
                        onPress={() => {
                            Alert.alert('Delete Diet', 'Are you sure you want to delete this diet?', [
                                {
                                    text: 'Cancel',
                                    onPress: () => { },
                                    style: 'cancel',
                                },
                                {
                                    text: 'Yes', onPress: () => {
                                        deleteDiet(id)
                                        alert('Diet deleted successfully.');
                                        navigation.goBack();
                                    }
                                },
                            ])
                        }} >
                        <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                ) : null
            ),
        });
    }, [id]);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(false);
        setDate(currentDate);
    };

    const handleSave = async () => {
        // Validation logic
        if (!description) {
            Alert.alert('Validation Error', 'Please enter the description.');
            return;
        }
        if (!calories || isNaN(calories) || calories <= 0) {
            Alert.alert('Validation Error', 'Please enter valid calories.');
            return;
        }
        if (!date) {
            Alert.alert('Validation Error', 'Please select a date.');
            return;
        }

        const dietsData = {
            description,
            calories: parseInt(calories),
            date: date.toISOString(),
        };

        if (id) {
            try {
                // Update the existing diets
                await updateDiet(id, dietsData);
                Alert.alert('Success', 'Diets updated successfully.');
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error', 'Error updating diets.');
            }
        } else {
            try {
                // Add a new diets
                await addDiet(dietsData);
                Alert.alert('Success', 'Diets added successfully.');
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error', 'Error adding diets.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
            />


            <Text style={styles.label}>Calories *</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter calories"
                value={calories}
                onChangeText={setCalories}
            />

            <Text style={styles.label}>Date *</Text>
            <TouchableOpacity onPress={() => setShowDate(!showDate)}>
                <TextInput
                    style={styles.input}
                    value={date.toDateString()}
                    editable={false}
                    pointerEvents="none"
                />
            </TouchableOpacity>

            {showDate && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="inline"
                    onChange={handleDateChange}
                />
            )}

            <View style={styles.buttonContainer}>
                <Button title="Cancel" style={[styles.button, { backgroundColor: 'red' }]} onPress={() => navigation.goBack()} />
                <Button title="Save" style={styles.button} onPress={handleSave} />
            </View>
        </View>
    );
};

export default AddDietsScreen;
