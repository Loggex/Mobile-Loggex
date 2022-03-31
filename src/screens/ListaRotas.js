import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Touchable, Stack } from 'react-native';
import { useNavigate } from 'react-router';

import AppLoading from 'expo-app-loading';
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';



import {
    FlatList,
    SafeAreaView,
    ScrollView,
    useColorScheme,
    ImageBackground,
    Image,
    TextInput,
} from 'react-native';
import Checklist from './Checklist';

export default function ListaRotas({ navigation }) {


    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Sen_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }


    return (
        <View style={styles.container}>

            <Image source={require('../assets/caminhaozinho.png')}
                style={styles.MainImgLogin}
            />

            <Text style={styles.TextMain}>Nenhuma rota foi encontrada. Escaneie a placa do veículo para ter acesso a todos os serviços programados</Text>



            <StatusBar style="auto" />

            <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => navigation.navigate("Checklist")}
            >

                <Text style={styles.LoginText}>Entrar</Text>

            </TouchableOpacity>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    TextMain: {
        fontFamily: 'Sen_400Regular',
        fontSize: 16,
        width: 310,
        height: 100,
        color: '#888888',
        textAlign: 'center',
    },

})
