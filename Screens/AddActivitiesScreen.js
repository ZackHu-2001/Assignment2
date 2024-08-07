import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addActivity, updateActivity, getActivity, deleteActivity } from '../services/firestore';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../utils/styles';

const AddActivitiesScreen = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params || {};

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
    const [special, setSpecial] = useState(false);
    const [showCheckbox, setShowCheckbox] = useState(false);

    useEffect(() => {
        if (id) {
            // Fetch activity details from Firestore
            getActivity(id).then(activity => {
                console.log(activity);
                if (activity) {
                    setActivity(activity.activity);
                    setDuration(activity.duration.toString());
                    setDate(new Date(activity.date));
                    setSpecial(activity.special);
                    setShowCheckbox(activity.special)
                }
            }).catch(error => {
                console.log(error)
            });

            navigation.setOptions({
                headerTitle: id ? 'Edit Activity' : 'Add Activity',
                headerRight: () => (
                    id ? (
                        <TouchableOpacity style={{ marginRight: 15, flexDirection: 'row' }}
                            onPress={() => {
                                Alert.alert('Delete Activity', 'Are you sure you want to delete this activity?', [
                                    {
                                        text: 'Cancel',
                                        onPress: () => { },
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Yes', onPress: () => {
                                            deleteActivity(id)
                                            alert('Activity deleted successfully.');
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
            special: false,
        };

        try {
            if (id) {
                activityData.special = special;
                await updateActivity(id, activityData);
                Alert.alert('Success', 'Activity updated successfully.');
            } else {
                if ((activity === 'running' || activity === 'weights') && duration > 60) {
                    activityData.special = true;
                }
                await addActivity(activityData);
                Alert.alert('Success', 'Activity added successfully.');
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save activity.');
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

            {id && showCheckbox ?
                <View style={{flexDirection: 'row', width: "90%", justifyContent: "center"}}>
                    <Text>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
                    <BouncyCheckbox isChecked={special} onPress={() => {
                        setSpecial(!special);
                    }} />
                </View>
                : null}

            <View style={styles.buttonContainer}>
                <Button title="Cancel" style={[styles.button, { backgroundColor: 'red' }]} onPress={() => navigation.goBack()} />
                <Button title="Save" style={styles.button} onPress={handleSave} />
            </View>
        </View>
    );
};


export default AddActivitiesScreen;
