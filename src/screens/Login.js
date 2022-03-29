import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Text>Avançar</Text>
            </TouchableOpacity>
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