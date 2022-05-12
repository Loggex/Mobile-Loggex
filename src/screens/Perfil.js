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
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { parseJwt } from '../services/auth';
import api from '../services/api';
import AsyncStorageLib from '@react-native-async-storage/async-storage';


export default function Perfil({ navigation }) {
    const [veiculoAtual, setVeiculoAtual] = useState({})
    const [usuarioLogado, setUsuarioLogado] = useState({})

    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Poppins_700Bold,
        Sen_400Regular
    });

    // if (!fontsLoaded) {
    //     return <AppLoading />;
    // }

    async function BuscarUsuario() {
        const usuario = await parseJwt()

        const requisicao = await api.get(`/usuarios/${usuario.jti}`)

        setUsuarioLogado(requisicao.data)
    }

    // const logout = (navigation) => {
    //     AsyncStorage.setItem("TOKEN", "").then(() => {
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name: "Login" }]
    //         })
    //     }).catch((error) => {
    //         console.log(error)
    //         Alert.alert("Erro ao sair")
    //     })
    // }

    /* realizarLogout = async() => {
        try {
            await AsyncStorage.removeItem('usuarioLogin')
            this.props.navigation.navigate('Login')
        }catch (error) {
            console.warn(error)
        }
    }; */

    async function Logout() {
        await AsyncStorageLib.removeItem('login-loggex')
        await AsyncStorageLib.removeItem('veiculo-atual')
        navigation.navigate("Login")
    }

    async function BuscaVeiculoAtual() {
        setVeiculoAtual(JSON.parse(await AsyncStorageLib.getItem('veiculo-atual')))
        console.debug(veiculoAtual)
    }

    useEffect(BuscarUsuario, [])
    useEffect(() => {
        const atualizar = navigation.addListener('focus', () => {
            BuscaVeiculoAtual()
        });
        return atualizar;
    }, [navigation])

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
                <Text style={styles.textNome}>{usuarioLogado.nome}</Text>
                <Text style={styles.textEmpresa}>{usuarioLogado.numCelular}</Text>
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
                    <Text style={styles.textEmail}>{usuarioLogado.email}</Text>
                </View>

                <View>
                    <Text style={styles.textVeiculo}>Veículo</Text>

                </View>

                <View style={styles.containerVeiculo}>
                    {
                        veiculoAtual != null ?
                            <View style={styles.boxVeiculo}>
                                <Image style={styles.fotoCaminhao} source={require('../assets/fotoCaminhao.png')} />
                                <View style={styles.boxText}>
                                    <Text style={styles.nomeVeiculo}>{veiculoAtual.idTipoVeiculoNavigation?.modeloVeiculo}</Text>
                                    <Text style={styles.quilometragem}>Quilometragem: {veiculoAtual.quilometragem}</Text>
                                </View>
                            </View>
                            :
                            <View style={styles.boxVeiculo}>
                                <View style={styles.naoVinculadoTxt}>
                                    <Text >Nenhum veículo escaneado</Text>
                                </View>
                            </View>
                    }

                </View>

                <View>
                    <Text style={styles.textServicoAtual}>Serviço atual</Text>
                </View>

                <View style={styles.containerServicoAtual}>
                    <View style={styles.boxServico}>
                        <View style={styles.miniboxDestino}>
                            <FontAwesome5 name="road" size={30} color="#060657" />
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
                        onPress={() => Logout()}
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

    naoVinculadoTxt: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        paddingHorizontal: '4%'
    },

    containerInformacoes: {
        width: '100%',
        paddingHorizontal: '4%',
        flexDirection: 'row',
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
        backgroundColor: '#FFF',
        elevation: 3,
        borderRadius: 5
    },

    boxText: {
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%'
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
        height: '100%',
        width: '25%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },

    containerServicoAtual: {
        width: '100%',
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        marginTop: 20
        /*         backgroundColor:'grey'
         */

    },

    textServicoAtual: {
        fontFamily: 'Sen_700Bold',
        fontSize: 18,
        paddingTop: 10
    },

    boxServico: {
        backgroundColor: '#FFF',
        elevation: 3,
        width: '100%',
        height: '100%',
        borderBottomWidth: 7,
        borderBottomColor: '#060657',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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


    miniboxDestino: {
        flexDirection: 'row',
        paddingLeft: 20,
        height: '90%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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
        paddingRight: 10

    },

    boxSair: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerSair: {
        paddingBottom: 40
    }




});