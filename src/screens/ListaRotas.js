import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import logo from '../assets/logoLoggex.png';
import caminhao from '../assets/caminhao.png'
import { Entypo } from '@expo/vector-icons';
import Checklist from './Checklist';

export default function ListaRotas({ navigation }) {

    return (
        <ScrollView
            contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.imgLogo}
                    source={logo}
                />
            </View>
            <View style={styles.conteudo}>
                <View>
                    <TextInput style={styles.inputPesquisa} placeholder='Pesquise aqui'></TextInput>
                </View>
                <View style={styles.veiculoAtual}>
                    <Text style={styles.txtVeiculoAtual}>Veículo atual</Text>
                    <View style={styles.btnVeiculo}>
                        <View style={styles.boxVeiculo}>
                            <Image
                                style={styles.imgVeiculoAtual}
                                source={caminhao}
                            />
                            <Text style={styles.nomeVeiculo}>Volvo Fh 540 6x4</Text>
                        </View>
                        <TouchableOpacity
                         onPress={() => navigation.navigate("Rota")}>
                            <Entypo name="chevron-right" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rotaHoje}>
                    <Text style={styles.txtRotas}>Rotas para hoje</Text>
                    <View style={styles.rota}>
                        <View style={styles.conteudoRota}>
                            <View>
                                <Text></Text>
                                <Text></Text>
                            </View>
                            <View>
                                <Text></Text>
                                <Text></Text>
                            </View>
                            <View>
                                <View></View>
                                <View></View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btnRota}
                        
                        onPress={() => navigation.navigate("Checklist")}>
                            <Text style={styles.txtBtnRota}>Ver mais</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        paddingHorizontal: '4%',
    },

    margin: {
        marginVertical: 30
    },

    imgLogo: {
        width: 147,
        height: 39.11
    },

    header: {
        width: '100%',
        height: 120,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputPesquisa: {
        width: '100%',
        backgroundColor: '#E1DADA',
        height: 50,
        borderRadius: 5,
        padding: 15,
        marginBottom: 15
    },

    conteudo: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    imgVeiculoAtual: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },

    txtVeiculoAtual: {
        fontFamily: 'Sen_700Bold',
        fontSize: 15
    },

    btnVeiculo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },

    veiculoAtual: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 75,
        marginVertical: 15
    },

    boxVeiculo: {
        display: 'flex',
        width: '55%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    nomeVeiculo: {
        fontFamily: 'Sen_400Regular',
        fontSize: 15
    },

    rotaHoje: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 230,
        marginVertical: 30
    },

    rota: {
        width: '100%',
        height: 180,
        backgroundColor: '#fff',
        borderRadius: 3,
        elevation: 20
    },

    txtRotas: {
        fontFamily: 'Sen_700Bold',
        fontSize: 18
    },

    btnRota: {
        width: '100%',
        backgroundColor: '#060657',
        height: 43,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    conteudoRota: {
        width: '100%',
        padding: '5%',
        height: '77%',
        // backgroundColor: '#abc',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },

    txtBtnRota: {
        fontFamily: 'Sen_700Bold',
        fontSize: 16,
        color: '#fff'
    },

    linhaRota: {
        height: '100%'

    }
});
