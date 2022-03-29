import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Touchable } from 'react-native';
import { useNavigate } from 'react-router';

export default function OCR({ navigation }) {

    return (
        <View style={styles.container}>
            <Text>OCR</Text>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});