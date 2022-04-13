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

            <View style={styles.containerInformacoes}>
                <View style={styles.containerConteudo}>

                    <View style={styles.containerOrigem}>
                        <Text style={styles.textOrigem}>Origem</Text>
                        <Text style={styles.textLugar}>Carapicuiba, SP</Text>

                    </View>
                    <View style={styles.boxHorario}>

                        <Text style={styles.textHorario}>18 Mar, 12h00</Text>

                    </View>
                </View>
                <View style={styles.containerConteudoDestino}>

                    <View style={styles.containerOrigem}>
                        <Text style={styles.textOrigem}>Destino</Text>
                        <Text style={styles.textLugar}>Ouro Fino, SP</Text>

                    </View>
                    <View style={styles.boxHorario}>

                        <Text style={styles.textHorario}>18 Mar, 17h00</Text>

                    </View>
                </View>

                <View style={styles.containerCarga}>
                    <Text style={styles.textOrigem}>Tipo de carga</Text>
                    <Text style={styles.textLugar}>Alimentos</Text>

                </View>

                <View style={styles.containerDescricao}>
                    <Text style={styles.textOrigem}>Descrição da carga</Text>
                    <Text style={styles.textLugar}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus sapien sollicitudin, vestibulum justo in, rutrum lacus. Maecenas eget magna ligula. </Text>

                </View>

                <View style={styles.containerVolume}>
                    <Text style={styles.textOrigem}>Volume</Text>
                    <Text style={styles.textLugar}>Não informado</Text>

                </View>

                <View style={styles.containerPeso}>
                    <Text style={styles.textOrigem}>Peso bruto</Text>
                    <Text style={styles.textLugar}>16.000 kg</Text>

                </View>
                
                <View style={styles.containerPeso}>
                    <Text style={styles.textOrigem}>Tipo de carroceria</Text>
                    <Text style={styles.textLugar}>Graneleiro</Text>

                </View>
                

                <View style={styles.btnInicar}>
                    
                <TouchableOpacity style={styles.btnRota}
                onPress={() => navigation.navigate("Checklist")}>
                    <Text style={styles.textRota}>Iniciar Rota</Text>
                </TouchableOpacity>

                </View>
            </View>





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



    imagemrota: {
        width: '100%',
        height: 240
    },

    containerInformacoes: {
        width: '100%',
        paddingHorizontal: '4%',
        justifyContent: 'center',
        paddingTop: 20,
    },

    containerConteudo: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
/*         backgroundColor:'#c4c4c4'
 */    },

    textOrigem: {
        fontFamily: 'Sen_400Regular',
        fontSize: 16,
        color: '#888888'
    },

    textLugar: {
        fontFamily: 'Sen_400Regular',
        fontSize: 20,
        paddingTop:10
    },

    boxHorario: {
        borderColor: '#090959',
        borderWidth: 1,
        borderRadius: 3,
        height: 31,
        width: '32%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textHorario: {
        fontFamily: 'Sen_400Regular',
        fontSize: 15,
        color: '#090959'
    },

    containerConteudoDestino: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
/*         backgroundColor:'#c4c4c4'
 */    },

    containerCarga:{
        paddingTop:30,
        height:80,
        /* backgroundColor:'#c4c4c4', */
    },

    containerDescricao:{
        paddingTop:30,
        height:180,
    },

    containerVolume:{

        paddingTop:30,
        height:80,
    },


    containerPeso:{
        paddingTop:30,
        height:80,
    },

    btnRota:{
        width:'100%',
        height:60,
        backgroundColor:'#090959',
        justifyContent:'center',
        alignItems:'center',
    },

    textRota:{
        fontFamily:'Poppins_700Bold',
        fontSize:18,
        color:'#fff'
    },
    
    btnInicar:{
        paddingBottom:40,
        paddingTop:30
    },








});