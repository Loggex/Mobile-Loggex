import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Touchable } from 'react-native';
import { useNavigate } from 'react-router';

export default function ListaRotas({ navigation }) {

    return (
        <View style={styles.container}>
            <Text>Lista de rotas</Text>
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