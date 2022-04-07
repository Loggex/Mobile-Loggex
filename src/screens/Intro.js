import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';



import {
    FlatList,
    SafeAreaView,
    ScrollView,
    useColorScheme,
    ImageBackground,
    Image,
    TextInput,
} from 'react-native';

export default function Intro({ navigation }) {

    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Poppins_700Bold,
        Sen_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>

            <Image source={require('../assets/logo2.png')}
                style={styles.mainImgLogin}
            />

            <Image source={require('../assets/imagem-back.png')}
                style={styles.imagemBack}
            />

            <View style={styles.boxConteudo}>

                <Text style={styles.textMain}>Obtenha informações de seu veículo e informe seu gestor.</Text>


                <TouchableOpacity style={styles.boxIniciar} onPress={() => navigation.navigate("Login")}>
                    <View>
                        <Text style={styles.textLogin}>Iniciar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#060657',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainImgLogin: {
        marginBottom: 10
    },

    imagemBack: {
        width: '100%',
        height: 260
    },

    boxConteudo: {
        width: '100%',
        paddingHorizontal: '4%',
        alignItems: 'center',
    },


    textMain: {
        color: '#fff',
        fontFamily: 'Sen_400Regular',
        fontSize: 22,
        width: '80%',
        marginTop: 20

    },

    textLogin: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',

    },

    boxIniciar: {
        backgroundColor: '#FF1717',
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        borderRadius: 2
    }


});