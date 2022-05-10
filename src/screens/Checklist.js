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
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function Checklist({ route, navigation }) {
    const rota = route.params?.rotaAtual
    const [isSelected, setSelected] = useState(false)
    const [listaPecas, setListaPecas] = useState(route.params?.rotaAtual.idVeiculoNavigation.pecas)
    const [veiculo, setVeiculo] = useState('')
    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Sen_400Regular,
        Poppins_400Regular
    });

    // if (!fontsLoaded) {
    //     return <AppLoading />;
    // }

    // ListarPecas = async () => {

    //     const token = await tokenUsuario()

    //     console.debug(rota)

    //     const requisicao = await api.get(`/veiculos/${rota.idVeiculo}`, {
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //         }
    //     })

    //     console.debug('chegou aqui')
    //     setListaPecas(requisicao.data.pecas)
    //     setVeiculo(requisicao.data.placa)
    //     console.debug(listaPecas)
    // }

    async function takePhotoAndUpload(id) {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false, // higher res on iOS
            aspect: [4, 3],
        });

        if (result.cancelled) {

        } else {
            let localUri = result.uri;

            // console.warn(localUri)

            const index = listaPecas.findIndex(peca => peca.idPeca === id)

            const updateListaPeca = Object.assign([...listaPecas], {
                [index]: {
                    ...listaPecas[index],
                    imgPeca: localUri
                }
            });

            setListaPecas(updateListaPeca)
        }


        // let filename = localUri.split('/').pop();

        // let match = /\.(\w+)$/.exec(filename);
        // let type = match ? `image/${match[1]}` : `image`;

        // let formData = new FormData();
        // formData.append('photo', { uri: localUri, name: filename, type });

        // return await fetch('http://example.com/upload.php', {
        //     method: 'POST',
        //     body: formData,
        //     header: {
        //         'content-type': 'multipart/form-data',
        //     },
        // });
    }


    AtualizarEstados = async () => {
        const token = await tokenUsuario()

        if (rota.idSituacao === 1) {
            rota.idSituacao = 2
        } else if (rota.idSituacao === 2) {
            rota.idSituacao = 3
        }

        await api.put(`/rotas/${rota.idRota}`, rota, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => console.debug(response))


        listaPecas.map(async peca => {

            delete peca.idTipoPecaNavigation
            delete peca.logAlteracaos
            let filename = peca.imgPeca.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            var formData = new FormData();
            formData.append('arquivo', { uri: peca.imgPeca, name: filename, type });
            formData.append('IdPeca', peca.idPeca)
            formData.append('IdTipoPeca', peca.idTipoPeca)
            formData.append('IdVeiculo', peca.idVeiculo)
            formData.append('EstadoPeca', peca.estadoPeca)
            formData.append('ImgPeca', peca.imgPeca)

            console.debug(formData.entries)
            await api.put('/pecas', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token
                }
            }).then(response => console.debug(response))

            // await axios('/pecas', {
            //     method: 'PUT',
            //     body: formData,
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         Authorization: 'Bearer ' + token
            //     },
            // }).then(response => console.debug(response))


            // console.debug(peca),
            //     await api.put(`/pecas/${peca.idPeca}`, peca, {
            //         headers: {
            //             Authorization: 'Bearer ' + token
            //         }
            //     }).then(response => console.debug(response))

        })

        navigation.navigate('Main')

        // listaPecas.forEach(peca => {
        //     api.put(`/pecas/${peca.idPeca}`, peca, {
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

    // useEffect(ListarPecas, []);
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
                                    <TouchableOpacity onPress={() => takePhotoAndUpload(peca.idPeca)}>
                                        {
                                            peca.imgPeca === '.../teste.png' ?
                                                <MaterialIcons name="add-photo-alternate" size={33} color="#070757" />
                                                :
                                                <Image style={{ height: 40, width: 40 }} source={{ uri: peca.imgPeca }} />
                                        }
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
        marginVertical: 20
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