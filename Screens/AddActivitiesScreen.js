import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addActivity, updateActivity, getActivity } from '../services/firestore';

const AddActivitiesScreen = ({ navigation, id }) => {
    const [open, setOpen] = useState(false);
    const [activity, setActivity] = useState(null);
    const [items, setItems] = useState([
        { label: 'Walking', value: 'walking' },
        { label: 'Running', value: 'running' },
        { label: 'Swimming', value: 'swimming' },
        { label: 'Weights', value: 'weights' },
        { label: 'Yoga', value: 'yoga' },
        { label: 'Cycling', value: 'cycling' },
        { label: 'Hiking', value: 'hiking' },
    ]);
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [duration, setDuration] = useState('');

    useEffect(() => {
        if (id) {
            // Fetch activity details from Firestore
            getActivity().then(activity => {
                if (activity) {
                    setActivity(activity.activity);
                    setDuration(activity.duration);
                    setDate(new Date(activity.date));
                }
            });
        }
    }, [id]);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(false);
        setDate(currentDate);
    };

    const handleSave = async () => {

        // Validation logic
        if (!activity) {
            Alert.alert('Validation Error', 'Please select an activity.');
            return;
        }
        if (!duration || isNaN(duration) || duration <= 0) {
            Alert.alert('Validation Error', 'Please enter a valid duration.');
            return;
        }
        if (!date) {
            Alert.alert('Validation Error', 'Please select a date.');
            return;
        }

        const activityData = {
            activity,
            duration: parseInt(duration),
            date: date.toISOString(),
        };

        if (id) {
            try {
                await updateActivity(activityData);
                Alert.alert('Success', 'Activity updated successfully.');
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error', 'Failed to update activity.');
            }
        } else {
            try {
                await addActivity(activityData);
                Alert.alert('Success', 'Activity added successfully.');
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error', 'Failed to add activity.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Activity *</Text>
            <DropDownPicker
                open={open}
                value={activity}
                items={items}
                setOpen={setOpen}
                setValue={setActivity}
                setItems={setItems}
                style={styles.dropdown}
            />

            <Text style={styles.label}>Duration (min) *</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter duration"
                value={duration}
                onChangeText={setDuration}
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

export default AddActivitiesScreen;
