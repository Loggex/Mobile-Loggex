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
import DropShadow from "react-native-drop-shadow";
import CardView from 'react-native-cardview';


//ATENÇÃO NA BOX VEICULO E NA FOTO DO CAMINHAO





export default function Perfil({ navigation }) {

    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Poppins_700Bold,
        Sen_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }


    const logout = (navigation) => {
        AsyncStorage.setItem("TOKEN", "").then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }]
            })
        }).catch((error) => {
            console.log(error)
            Alert.alert("Erro ao sair")
        })
    }

    /* realizarLogout = async() => {
        try {
            await AsyncStorage.removeItem('usuarioLogin')
            this.props.navigation.navigate('Login')
        }catch (error) {
            console.warn(error)
        }
    }; */


    return (
        <ScrollView style={styles.container}>







            <View style={styles.containerPerfil}>

                <LinearGradient
                    style={styles.gradiente}
                    locations={[0.0, 1.0]}
                    colors={['#33338A', '#060657',]}>
                    <View style={styles.caixalogo}>

                        <Image source={require('../assets/logoBranco.png')}

                        />
                    </View>


                    <View style={styles.containerFoto}>

                        <Image source={require('../assets/avatarJose.png')}
                            style={styles.avatar}
                        />


                        <TouchableOpacity>

                            <Text style={styles.atualizarFoto}>Atualizar foto</Text>

                        </TouchableOpacity>
                    </View>


                </LinearGradient>
            </View>

            <View style={styles.containerConteudoInformacoes}>
                <Text style={styles.textNome}>José João Barros</Text>
                <Text style={styles.textEmpresa}>Senai Transportes</Text>
                <Hr lineStyle={{
                    backgroundColor: "#C0C0C0",
                    height: 1,
                    with: '100%',
                    marginTop: 30

                }} />

            </View>

            <View style={styles.containerInformacoes}>

                <View style={styles.containerEmail}>

                    <Text style={styles.Email}>E-mail</Text>
                    <Text style={styles.textEmail}>josejoaobarros132@gmail.com</Text>
                </View>

                <View>
                    <Text style={styles.textVeiculo}>Veiculo</Text>

                </View>
                <View style={styles.containerVeiculo}>

                    <View style={styles.boxVeiculo}>

                        <Image style={styles.fotoCaminhao} source={require('../assets/fotoCaminhao.png')} />


                        <View style={styles.boxText}>

                            <Text style={styles.nomeVeiculo}>Volvo Fh 540 6x4</Text>
                            <Text style={styles.quilometragem}>Quilometragem: 300 km</Text>
                        </View>
                    </View>

                </View>

                <View>
                    <Text style={styles.textServicoAtual}>Servico atual</Text>
                </View>

                <View style={styles.containerServicoAtual}>
                    <View style={styles.boxServico}>
                        <View style={styles.miniboxDestino}>

                            <Image style={styles.fotoRota} source={require('../assets/rota.png')} />


                            <View style={styles.boxText}>

                                <Text style={styles.textDestino}>Destino</Text>
                                <Text style={styles.textLugar}>Ouro Fino, MG</Text>
                            </View>
                        </View>
                    </View>


                </View>

                <Hr lineStyle={{
                    backgroundColor: "#C0C0C0",
                    height: 1,
                    with: '100%',
                    marginTop: 50

                }} />


                <View style={styles.containerSair}>

                    <TouchableOpacity
                        style={styles.btnLogin}
                        title="Sair"
                        onPress={() => logout(navigation)}
                    >


                        <View style={styles.boxSair}>


                            <Text style={styles.LoginText}>Sair</Text>

                            <Image source={require('../assets/exit.png')} />

                        </View>
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
    },

    gradiente: {
        width: '100%',
        height: 240,
        alignItems: 'center'
    },

    containerPerfil: {
        width: '100%',
        height: 370
    },

    caixalogo: {
        width: '100%',
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
        marginTop: 20
    },

    avatar: {
        marginTop: 10
    },

    containerFoto: {
        width: '100%',
        alignItems: 'center',
        height: 210
    },

    atualizarFoto: {
        fontFamily: 'Sen_400Regular',
        color: '#060657',
        fontSize: 16,
        paddingTop: 20
    },

    textNome: {
        fontSize: 30,
        fontFamily: 'Sen_700Bold',
        color: '#000'
    },
    textEmpresa: {
        fontSize: 22,
        fontFamily: 'Sen_400Regular',
        color: '#000',
        paddingTop: 20
    },

    containerConteudoInformacoes: {
        width: '100%',
        height: 160,
/*         backgroundColor:'#c4c4c4',
 */        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '4%',
    },

    containerInformacoes: {
        width: '100%',
        paddingHorizontal: '4%',
        flexDirection: 'row',
        marginLeft: 5,
        flexDirection: 'column'
    },


    containerEmail: {
        flexDirection: 'row',
    },

    Email: {
        color: '#B0B0B0',
        fontSize: 15,
        fontFamily: 'Sen_400Regular',

    },

    textEmail: {
        fontSize: 15,
        fontFamily: 'Sen_400Regular',
        color: '#000',
        paddingLeft: 38,
        textDecorationLine: 'underline'
    },

    containerVeiculo: {
        paddingTop: 20,
        flexDirection: 'row',
        paddingBottom: 40,
    },

    textVeiculo: {
        fontFamily: 'Sen_700Bold',
        fontSize: 18,
        paddingTop: 40
    },

    boxVeiculo: {
        width: '100%',
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        /*                 backgroundColor:'grey'
         */
    },

    boxText: {
        paddingLeft: 20,
    },

    nomeVeiculo: {
        fontFamily: 'Sen_700Bold',
        fontSize: 18
    },

    quilometragem: {
        fontSize: 15,
        fontFamily: 'Sen_400Regular',
        color: '#b0b0b0'
    },

    fotoCaminhao: {
        height: 82,
        width: '20%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginTop: 4
    },

    containerServicoAtual: {
        width: '100%',
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        /*         backgroundColor:'grey'
         */

    },

    textServicoAtual: {
        fontFamily: 'Sen_700Bold',
        fontSize: 18,
        paddingTop: 10
    },

    boxServico: {

/*         backgroundColor:'grey',
 */        width: '99%',
        height: '100%',
        justifyContent: 'center',
        borderBottomWidth: 7,
        borderBottomColor: '#060657',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5


    },

    textDestino: {
        fontSize: 15,
        fontFamily: 'Sen_400Regular',
        color: '#b0b0b0'
    },

    textLugar: {
        fontFamily: 'Sen_700Bold',
        fontSize: 18
    },

    fotoRota: {

    },

    miniboxDestino: {
        flexDirection: 'row',
        paddingLeft: 20,
    },

    btnLogin: {
        backgroundColor: '#FF1717',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        borderRadius: 2,
        flexDirection: 'row',
    },

    LoginText: {
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        paddingRight:10

    },

    boxSair: {
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerSair:{
        paddingBottom:40
    }




});