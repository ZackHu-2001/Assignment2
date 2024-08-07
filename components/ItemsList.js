import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Item from './Item';

const ItemsList = ({ items, itemsType }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                itemsType === 'activity' ?
                    items.map(item => (
                        <Item
                            key={item.id}
                            id={item.id}
                            title={item.activity}
                            alert={item.special}
                            date={new Date(item.date).toDateString()} // Convert Firestore timestamp to date string
                            detail={`${item.duration} mins`}
                            goto="AddActivity"
                        />
                    )) :
                    items.map(item => (
                        <Item
                            key={item.id}
                            id={item.id}
                            title={item.description}
                            alert={item.special}
                            date={new Date(item.date).toDateString()} // Convert Firestore timestamp to date string
                            detail={`${item.calories} cal`}
                            goto="AddDiet"
                        />
                    ))
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 30,
        gap: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});

export default ItemsList;
