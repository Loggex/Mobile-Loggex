import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';
import { Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';
import { tokenUsuario } from '../services/auth';

export default function Checklist({ navigation }) {

    const [isSelected, setSelected] = useState(false)
    const [listaPecas, setListaPecas] = useState([])
    const [veiculo, setVeiculo] = useState('')
    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Sen_400Regular,
        Poppins_400Regular
    });

    // if (!fontsLoaded) {
    //     return <AppLoading />;
    // }

    ListarPecas = async () => {

        const token = await tokenUsuario()

        const requisicao = await api.get('/veiculos/1', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        console.debug('chegou aqui')
        setListaPecas(requisicao.data.pecas)
        setVeiculo(requisicao.data.placa)
        console.debug(listaPecas)
    }

    AtualizarEstados = async () => {
        const token = await tokenUsuario()

        listaPecas.map(async peca => {
            return (
                delete peca.idTipoPecaNavigation,
                delete peca.logAlteracaos,
                console.debug(peca),
                api.put(`/pecas/${peca.idPeca}`, { peca }, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }).then(response => console.debug(response))
            )
        })

        navigation.navigate('ListaRotas')

        // listaPecas.forEach(peca => {
        //      api.put(`/pecas/${peca.idPeca}`, peca, {
        //         headers: {
        //             Authorization: 'Bearer ' + token
        //         }
        //     })
        // });
    }

    CheckPeca = (id) => {

        const index = listaPecas.findIndex(peca => peca.idPeca === id)

        const updateListaPeca = Object.assign([...listaPecas], {
            [index]: {
                ...listaPecas[index],
                estadoPeca: !listaPecas[index].estadoPeca
            }
        });

        setListaPecas(updateListaPeca)
    }

    useEffect(ListarPecas, []);
    // useEffect(console.debug('teste'), [])

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
                            <Text style={styles.checklistInicial}>Checklist inicial</Text>
                        </View>
                        {/* <Text>{item.idTipoVeiculoNavigation.modeloVeiculo}</Text> */}
                        <Text style={styles.nomeVeiculo}>{veiculo}</Text>
                    </LinearGradient>
                </View>

            </View>
            <View style={styles.containerChecklist}>
                <Text style={styles.mensagemCheck}>Marque apenas os componentes que se encontram em condições adequadas para a execução do serviço.</Text>
                {
                    listaPecas.map((peca) => {
                        return (
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checkedIcon="check"
                                    uncheckedIcon="square-o"
                                    checkedColor="green"
                                    checked={peca.estadoPeca}
                                    onPress={() => CheckPeca(peca.idPeca)}
                                    style={styles.checkbox}
                                />
                                <View style={styles.foto}>
                                    <Text style={styles.label}>{peca.idTipoPecaNavigation.nomePeça}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("FotoPeca")}>
                                        <MaterialIcons name="add-photo-alternate" size={33} color="#070757" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }

                <TouchableOpacity onPress={() => AtualizarEstados()} style={styles.concluirChecklist}>
                    <Text style={styles.txtBtnConcluir}>Concluir</Text>
                </TouchableOpacity>

            </View>


            <StatusBar style="auto" />


        </ScrollView >

    )

}
const styles = StyleSheet.create({

    concluirChecklist: {
        width: '100%',
        height: 60,
        backgroundColor: '#090959',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginTop: 20,
    },

    txtBtnConcluir: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 18,
        color: '#fff'
    },

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

    nomeVeiculo: {
        fontFamily: 'Sen_700Bold',
        color: '#fff',
        fontSize: 30,
        paddingHorizontal: '4%',
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
        display: 'flex',
        flexDirection: 'column',
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
        height: 80,
        borderBottomColor: '#DFD4D4',
        borderBottomWidth: 1
    },

    label: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 17,
        paddingTop: 3
    },

    foto: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }


});