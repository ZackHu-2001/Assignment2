import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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

export const colors = {
    light: '#FEFAE0',
    dark: '#D4A373',
}
