import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addDiet, updateDiet } from '../services/firestore';

const AddDietsScreen = ({ navigation, id }) => {
    const [open, setOpen] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');

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
                console.log(error);
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        height: '100%',
    },
    headerText: {
        fontSize: 24,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    dropdown: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007bff',
        width: 140,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default AddDietsScreen;
