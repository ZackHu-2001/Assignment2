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
                            title={item.activity}
                            alert={item.duration > 60}
                            date={new Date(item.date).toDateString()} // Convert Firestore timestamp to date string
                            detail={`${item.duration} mins`}
                        />
                    )) :
                    items.map(item => (
                        <Item
                            key={item.id}
                            title={item.description}
                            alert={item.calories > 800}
                            date={new Date(item.date).toDateString()} // Convert Firestore timestamp to date string
                            detail={`${item.calories} cal`}
                        />
                    ))
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginTop: 30,
        gap: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});

export default ItemsList;
