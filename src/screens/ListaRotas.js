import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import logo from '../assets/logoLoggex.png';
import caminhao from '../assets/caminhao.png'
import { Entypo } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';
import PagerView from 'react-native-pager-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
// import { Platform } from 'react-native';

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
                <View style={styles.boxInput}>
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
                        <TouchableOpacity>
                            <Entypo name="chevron-right" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rotaHoje}>
                    <Text style={styles.txtRotas}>Rotas para hoje</Text>
                    <View style={styles.rota}>
                        <View style={styles.conteudoRota}>
                            <View style={styles.viewLocais}>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>Carapicuíba, SP</Text>
                                    <Text style={styles.txtH2}>18 Mar, 12h00</Text>
                                </View>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>Ouro Fino, MG</Text>
                                    <Text style={styles.txtH2}>18 Mar, 16h00</Text>
                                </View>
                            </View>
                            <View style={styles.viewLocais}>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>Código</Text>
                                    <Text style={styles.txtH2}>JN028DN30E</Text>
                                </View>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>Tipo de carga</Text>
                                    <Text style={styles.txtH2}>Alimentos</Text>
                                </View>

                            </View>

                        </View>
                        <TouchableOpacity style={styles.btnRota}>
                            <Text style={styles.txtBtnRota}>Ver mais</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.conteudo}>
                    <View style={styles.tituloOutrasRotas}>
                        <Text style={styles.txtRotas}>Outras rotas</Text>
                    </View>
                    <PagerView style={styles.viewPager} initialPage={0}>
                        <ScrollView contentContainerStyle={styles.page} key="1">
                            <View style={styles.viewFuturasRotas}>
                                <View style={styles.futuraRota}>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>
                                            Código
                                        </Text>
                                        <Text style={styles.txtH2}>
                                            JN028DN30E
                                        </Text>
                                    </View>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>
                                            Destino
                                        </Text>
                                        <Text style={styles.txtH2}>
                                            Ouro Fino, MG
                                        </Text>
                                    </View>
                                    <Entypo name="chevron-right" size={30} color="black" />
                                </View>
                                <View style={styles.futuraRota}>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>
                                            Código
                                        </Text>
                                        <Text style={styles.txtH2}>
                                            JN028DN30E
                                        </Text>
                                    </View>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>
                                            Destino
                                        </Text>
                                        <Text style={styles.txtH2}>
                                            Ouro Fino, MG
                                        </Text>
                                    </View>
                                    <Entypo name="chevron-right" size={30} color="black" />
                                </View>
                                <View style={styles.futuraRota}>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>
                                            Código
                                        </Text>
                                        <Text style={styles.txtH2}>
                                            JN028DN30E
                                        </Text>
                                    </View>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>
                                            Destino
                                        </Text>
                                        <Text style={styles.txtH2}>
                                            Ouro Fino, MG
                                        </Text>
                                    </View>
                                    <Entypo name="chevron-right" size={30} color="black" />
                                </View>
                                <View style={styles.futuraRota}>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>
                                            Código
                                        </Text>
                                        <Text style={styles.txtH2}>
                                            JN028DN30E
                                        </Text>
                                    </View>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>
                                            Destino
                                        </Text>
                                        <Text style={styles.txtH2}>
                                            Ouro Fino, MG
                                        </Text>
                                    </View>
                                    <Entypo name="chevron-right" size={30} color="black" />
                                </View>

                            </View>
                        </ScrollView>
                        <ScrollView contentContainerStyle={styles.page} key="2">
                            <View style={styles.futuraRota}>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>
                                        Código
                                    </Text>
                                    <Text style={styles.txtH2}>
                                        JN028DN30E
                                    </Text>
                                </View>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>
                                        Destino
                                    </Text>
                                    <Text style={styles.txtH2}>
                                        Ouro Fino, MG
                                    </Text>
                                </View>
                                <Entypo name="chevron-right" size={30} color="black" />
                            </View>
                            <View style={styles.futuraRota}>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>
                                        Código
                                    </Text>
                                    <Text style={styles.txtH2}>
                                        JN028DN30E
                                    </Text>
                                </View>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>
                                        Destino
                                    </Text>
                                    <Text style={styles.txtH2}>
                                        Ouro Fino, MG
                                    </Text>
                                </View>
                                <Entypo name="chevron-right" size={30} color="black" />
                            </View>
                            <View style={styles.futuraRota}>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>
                                        Código
                                    </Text>
                                    <Text style={styles.txtH2}>
                                        JN028DN30E
                                    </Text>
                                </View>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>
                                        Destino
                                    </Text>
                                    <Text style={styles.txtH2}>
                                        Ouro Fino, MG
                                    </Text>
                                </View>
                                <Entypo name="chevron-right" size={30} color="black" />
                            </View>
                            <View style={styles.futuraRota}>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>
                                        Código
                                    </Text>
                                    <Text style={styles.txtH2}>
                                        JN028DN30E
                                    </Text>
                                </View>
                                <View style={styles.local}>
                                    <Text style={styles.txtH1}>
                                        Destino
                                    </Text>
                                    <Text style={styles.txtH2}>
                                        Ouro Fino, MG
                                    </Text>
                                </View>
                                <Entypo name="chevron-right" size={30} color="black" />
                            </View>
                        </ScrollView>
                    </PagerView>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // paddingHorizontal: '4%',
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

    boxInput: {
        paddingHorizontal: '4%',
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
        marginVertical: 20,
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
        paddingHorizontal: '4%',
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
        paddingHorizontal: '4%',
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
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    tituloOutrasRotas: {
        paddingHorizontal: '4%',
    },

    txtBtnRota: {
        fontFamily: 'Sen_700Bold',
        fontSize: 16,
        color: '#fff'
    },

    linhaRota: {
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
    },

    txtH1: {
        fontFamily: 'Sen_700Bold',
        fontSize: 16
    },

    txtH2: {
        fontFamily: 'Sen_400Regular',
        fontSize: 14
    },

    viewLocais: {
        height: '100%',
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    local: {
        display: 'flex',
        height: 40,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    futuraRota: {
        width: '100%',
        height: 74,
        backgroundColor: '#FFF',
        elevation: 5,
        borderLeftWidth: 7,
        borderLeftColor: '#060657',
        borderRadius: 3,
        marginVertical: 12,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    viewFuturasRotas: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'visible'
    },


    viewPager: {
        minHeight: 400,
        // width: '100%',
        marginTop: 20,
    },

    page: {
        paddingHorizontal: '4%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflow: 'visible'
    },
});