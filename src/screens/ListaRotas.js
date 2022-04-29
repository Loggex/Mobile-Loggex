import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image, ScrollView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import logo from '../assets/logoLoggex.png';
import caminhao from '../assets/caminhao.png'
import { Entypo } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';
import PagerView from 'react-native-pager-view';
import { Modalize } from 'react-native-modalize';
import imgVeiculo from '../assets/caminhao.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import api from '../services/api';
import { parseJwt, tokenUsuario, usuarioAutenticado } from '../services/auth';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/min/locales'
moment.locale('pt-br')

// import { Platform } from 'react-native';

export default function ListaRotas({ navigation }) {
    const [veiculoAtual, setVeiculoAtual] = useState()
    const [listaRotas, setListaRotas] = useState([])
    const [rotaAtual, setRotaAtual] = useState({})
    const [token, setToken] = useState('')
    const ref = useRef(null)
    const modalizeRef = useRef(null)

    function onOpen() {
        modalizeRef.current?.open();
    }

    async function ListarRotas() {
        const token = await tokenUsuario()

        console.debug(token)

        const requisicao = await api.get('/rotas', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        console.debug(requisicao.data)

        const atual = requisicao.data.reduce((a, b) => {
            return new Date(a.dataInicio) > new Date(b.dataInicio) ? a : b;
        });

        const rotas = requisicao.data.filter((rota) => rota != atual)

        setRotaAtual(atual)
        setListaRotas(rotas)

        console.debug('teste aqdufi')



        console.debug(listaRotas)
        console.debug(rotaAtual)
    }

    useEffect(ListarRotas, [])

    return (
        <View

            style={styles.container}>
            <Modalize
                snapPoint={500}
                ref={modalizeRef}
                scrollViewProps={{ showsVerticalScrollIndicator: true }}
            >

                <View style={styles.boxInfo}>
                    <PagerView style={styles.viewPagerModal} initialPage={0}>
                        <Image key='1'
                            source={imgVeiculo}
                        />
                        <Image key='2'
                            source={imgVeiculo}
                        />
                        <Image key='3'
                            source={imgVeiculo}
                        />
                    </PagerView>
                    <View style={styles.boxTabela}>
                        <View>
                            <StatusBar
                                style='dark'
                                backgroundColor='#FFF'
                            />
                        </View>
                        <View style={styles.tabela}>
                            <Text style={styles.nomeVeiculoModal}>Volvo Fh 540 6x4</Text>
                            <View style={styles.boxLinhasTabela}>
                                <View style={styles.colunaItens}>
                                    <Text style={styles.th}>Marca</Text>
                                    <Text style={styles.th}>Modelo</Text>
                                    <Text style={styles.th}>Ano</Text>
                                    <Text style={styles.th}>Quilômetros</Text>
                                    <Text style={styles.th}>Transmissão</Text>
                                    <Text style={styles.th}>Status</Text>
                                </View>
                                <View style={styles.colunaItens}>
                                    <Text style={styles.td}>Volvo</Text>
                                    <Text style={styles.td}>Fh540</Text>
                                    <Text style={styles.td}>2012</Text>
                                    <Text style={styles.td}>300 km</Text>
                                    <Text style={styles.td}>Manual</Text>
                                    <Text style={styles.td}>Operante</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.descricao}>
                        <Text style={styles.th}>Descrição</Text>
                        <Text style={styles.txtDescricao}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus sapien sollicitudin, vestibulum justo in, rutrum lacus. Maecenas eget magna ligula.
                        </Text>
                    </View>
                </View>
            </Modalize>
            <ScrollView>
                <View style={styles.header}>
                    <Image
                        style={styles.imgLogo}
                        source={logo}
                    />
                </View>
                <View style={styles.conteudo}>
                    <View style={styles.boxInput}>
                        <TextInput style={styles.inputPesquisa} placeholder='Pesquise aqui' />
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
                            <TouchableOpacity onPress={onOpen}>
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
                                        <Text style={styles.txtH1}>{rotaAtual.origem}</Text>
                                        <Text style={styles.txtH2}>{moment(rotaAtual.dataPartida).format('lll')}</Text>
                                    </View>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>{rotaAtual.destino}</Text>
                                        <Text style={styles.txtH2}>{moment(rotaAtual.dataChegada).format('lll')}</Text>
                                    </View>
                                </View>
                                <View style={styles.viewLocais}>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>Volume</Text>
                                        <Text style={styles.txtH2}>{rotaAtual.volumeCarga} kg</Text>
                                    </View>
                                    <View style={styles.local}>
                                        <Text style={styles.txtH1}>Tipo de carga</Text>
                                        <Text style={styles.txtH2}>{rotaAtual.carga}</Text>
                                    </View>

                                </View>

                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("Rota", rotaAtual)} style={styles.btnRota}>
                                <Text style={styles.txtBtnRota}>Ver mais</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.conteudo}>
                        <View style={styles.tituloOutrasRotas}>
                            <Text style={styles.txtRotas}>Outras rotas</Text>
                        </View>
                        <PagerView style={styles.viewPager} initialPage={0}>
                            <View style={styles.page} key="1">
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
                            </View>
                            <View style={styles.page} key="2">
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
                        </PagerView>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    margin: {
        marginVertical: 30
    },

    imgLogo: {
        width: 147,
        height: 39.11,
        marginTop: '3%'
    },

    header: {
        width: '100%',
        height: 110,
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
        elevation: 10
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

    viewPagerModal: {
        height: 230,
        width: '100%',
        borderTopLeftRadius: 10
        // backgroundColor: '#abc'
    },

    tabela: {
        // backgroundColor: '#abc',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        alignItems: 'center',
        height: 400,
        justifyContent: 'space-around'
    },

    boxInfo: {
        // backgroundColor: '#000',
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    boxTabela: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    boxLinhasTabela: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 290
    },

    colunaItens: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    // linhaTabela: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     backgroundColor: '#abc',
    //     width: '100%',
    //     justifyContent: 'space-evenly'
    // }

    th: {
        fontFamily: 'Sen_400Regular',
        fontSize: 18,
        color: '#B0B0B0'
    },

    td: {
        fontFamily: 'Sen_400Regular',
        fontSize: 18,
        color: '#000'
    },

    nomeVeiculoModal: {
        fontFamily: 'Sen_700Bold',
        fontSize: 25,
        color: '#000'
    },

    separator: {
        width: '90%',
        height: 1,
        backgroundColor: '#D1CBCB',
        marginVertical: 15
    },

    descricao: {
        width: '90%',
        height: 180,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    txtDescricao: {
        fontFamily: 'Sen_400Regular',
        fontSize: 18,
        color: '#000'
    },

    modal: {
        flexGrow: 1,
        elevation: 40
    }
});
