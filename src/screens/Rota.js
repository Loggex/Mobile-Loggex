import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Icon, TouchableOpacity, Touchable } from 'react-native';
import { useNavigate } from 'react-router';
import AppLoading from 'expo-app-loading';
import { AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import Hr from "hr-native";


//ATENÇÃO NA BOX VEICULO E NA FOTO DO CAMINHAO





export default function Rota({ navigation }) {

    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Poppins_700Bold,
        Sen_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }







    return (
        <ScrollView style={styles.container}>

            <View style={styles.boxTitulo}>


                <View style={styles.titulos}>
                    <LinearGradient
                        style={styles.gradiente}

                        colors={['#29297A', '#353569', '#060657']}>
                        <View style={styles.box}>

                            <TouchableOpacity
                                style={styles.btnSair}
                                onPress={() => navigation.navigate("Main")}
                            >
                                {/* <Image style={styles.imageVoltar} source={require('../assets/X.png')} /> */}
                            </TouchableOpacity>
                            <Text style={styles.checklistInicial}>Rota</Text>
                        </View>
                        {/* <Text>{item.idTipoVeiculoNavigation.modeloVeiculo}</Text> */}
                        <Text style={styles.placaVeiculo}>jn028dne</Text>
                    </LinearGradient>
                </View>

            </View>

            <Image style={styles.imagemrota} source={require('../assets/imagemrota.png')} />
            






            <StatusBar style="auto" />

        </ScrollView>



    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
    },
    boxTitulo: {
        width: '100%',
        height: 160,
    },

    gradiente: {
        paddingTop: 40,
        height: 160

    },

    checklistInicial: {
        width: '80%',
        color: '#fff',
        fontFamily: 'Sen_400Regular',
        fontSize: 30,
    },

    placaVeiculo: {
        fontFamily: 'Sen_700Bold',
        color: '#fff',
        fontSize: 30,
        paddingHorizontal: '4%',
        textTransform: 'uppercase'
    },
    titulos: {

        height: 150,
        width: '100%',
    },
    imageVoltar: {
    },

    box: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        paddingVertical: 10,
    },

    containerChecklist: {
        color: '#000',
        paddingTop: 30,
        width: '100%',
        paddingHorizontal: '4%',
        flexDirection: 'column'
    },

    mensagemCheck: {
        fontFamily: 'Sen_400Regular',
        fontSize: 16,
        color: '#888888'
    },
    checkbox: {

    },

    checkboxContainer: {
        flexDirection: "row",
        alignItems: 'center',
        width: '100%',
        height: 60
    },

    label: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 17,
        paddingTop: 3
    },

    foto: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    imagemrota:{
        width:'100%'
    }



});