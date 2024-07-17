import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddActivitiesScreen = ({ navigation }) => {
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

    const [date, setDate] = useState(new Date());

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
            />

            <Text style={styles.label}>Dates *</Text>
            {/* <TextInput
                style={styles.input}
                keyboardType="numeric"
            /> */}

            <View style={{width: 120}}>
                <DateTimePicker value={date} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Cancel" style={[styles.button, { backgroundColor: 'red' }]} />
                <Button title="Save" style={styles.button} />
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
        marginBottom: 20
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
        marginTop: 120,
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