import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, Modal, Alert, Pressable } from 'react-native';
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';
import { Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import api, { url } from '../services/api';
import { tokenUsuario } from '../services/auth';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function Checklist({ route, navigation }) {
    const rota = route.params?.rotaAtual
    const [modalVisible, setModalVisible] = useState(false);
    const [imagemModal, setImagemModal] = useState("")
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

        // if (rota.idSituacao === 1) {
        //     rota.idSituacao = 2
        // } else if (rota.idSituacao === 2) {
        //     rota.idSituacao = 3
        // }

        await api.put(`/rotas/${rota.idRota}`, rota, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => console.debug(response))


        listaPecas.map(async (peca) => {

            delete peca.idTipoPecaNavigation
            delete peca.logAlteracaos
            let filename = peca.imgPeca.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            const formData = new FormData();
            formData.append('arquivo', { uri: peca.imgPeca, name: filename, type: type });
            formData.append('IdPeca', peca.idPeca)
            formData.append('IdTipoPeca', peca.idTipoPeca)
            formData.append('IdVeiculo', peca.idVeiculo)
            formData.append('EstadoPeca', peca.estadoPeca)

            var comparacaoFormData = new FormData()

            comparacaoFormData.append('imagemBase', { uri: url + peca.imgPecaC, name: peca.imgPecaC.split('.')[0], type: `image/${peca.imgPecaC.split('.')[1]}` })
            comparacaoFormData.append('imagemNova', { uri: peca.imgPeca, name: filename, type: type })

            const comparacaoImagens = await axios({
                url: 'http://loggex.brazilsouth.cloudapp.azure.com/comparar',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: comparacaoFormData
            }).then(response => console.warn(response.data))
                .catch(error => console.debug(JSON.stringify(error)))

            // console.debug(comparacaoImagens.data)

            await api.put("/pecas", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token,
                }
            }).then(response => console.debug(response)).catch(err => console.debug(JSON.stringify(err)))

            // await axios({
            //     data: formData,
            //     url: 'https://e7bd-2804-431-c7df-bc6c-594e-a550-1cb9-43ec.sa.ngrok.io/api/pecas',
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         // 'Content-Type': 'multipart/form-data',
            //         // 'Accept': 'application/json',
            //         // 'Accept': 'application/json',
            //         'Authorization': 'Bearer ' + token
            //         // encType: 'multipart/form-data'
            //     }
            // }).then(response => console.debug(response)).catch(err => console.debug(JSON.stringify(err)))

            // await fetch('https://eca0-189-19-219-247.sa.ngrok.io/api/pecas', {
            //     headers: {
            //         // 'Content-Type': 'multipart/form-data; boundary=--WebKitFormBoundaryNvGcT5hiEi7d9qBR',
            //         'Content-Type': 'multipart/form-data',
            //         // 'Accept': 'application/json',
            //         'Accept': 'application/json',
            //         'Authorization': 'Bearer ' + token
            //         // encType: 'multipart/form-data'
            //     },
            //     method: 'PUT',
            //     body: formData
            // }).then(response => console.debug(response)).catch(err => console.debug(JSON.stringify(err)))

            // await api.put('/pecas', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         Authorization: 'Bearer ' + token
            //     }
            // }).then(response => console.debug(response))

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

    AbrirModal = (enderecoImagem) => {
        setImagemModal(url + enderecoImagem)
        setModalVisible(true)
    }

    // useEffect(ListarPecas, []);
    // useEffect(console.debug('teste'), [])

    return (
        <ScrollView style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.txtModal}>
                            Ao registrar uma foto da respectiva peça, busque o ângulo e a distância semelhantes aos da imagem abaixo:
                        </Text>
                        <Image
                            style={styles.imagemExemplo}
                            source={{uri: imagemModal}}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Entendido</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}
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
                                <View style={styles.foto}>
                                    <CheckBox
                                        checkedIcon="check"
                                        uncheckedIcon="square-o"
                                        checkedColor="green"
                                        checked={peca.estadoPeca}
                                        onPress={() => CheckPeca(peca.idPeca)}
                                        style={styles.checkbox}
                                    />
                                    <TouchableOpacity onPress={() => AbrirModal(peca.imgPecaC)}>
                                        <Text style={styles.label}>{peca.idTipoPecaNavigation.nomePeça}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => takePhotoAndUpload(peca.idPeca)}>
                                        {
                                            peca.imgPeca.startsWith('file:') === false ?
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
                <View style={styles.viewComentario}>
                    <Text style={styles.txtComentario}>Observações gerais:</Text>
                    <TextInput multiline={true} style={styles.inserirComentario} />
                </View>
                <TouchableOpacity onPress={() => AtualizarEstados()} style={styles.concluirChecklist}>
                    <Text style={styles.txtBtnConcluir}>Concluir</Text>
                </TouchableOpacity>

            </View>


            <StatusBar style="auto" />


        </ScrollView >

    )

}
const styles = StyleSheet.create({

    imagemExemplo: {
        width: '90%',
        height: '80%',
        borderRadius: 5
    },

    txtModal: {
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Sen_400Regular',
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.33);'
    },

    modalView: {
        margin: 20,
        width: '90%',
        height: '90%',
        backgroundColor: "white",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '30%',
        height: 60,
        backgroundColor: '#090959',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginVertical: 20
    },

    buttonOpen: {
        backgroundColor: "#F194FF",
    },

    buttonClose: {
        backgroundColor: "#090959",
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    txtComentario: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 15,
        paddingTop: 3
    },

    viewComentario: {
        marginTop: 20,
        height: 190,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    inserirComentario: {
        backgroundColor: '#F3F2F2',
        height: 150,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#CECECE",
        padding: "3%",
        textAlignVertical: 'top'
    },

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

    box: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        paddingVertical: 10,
    },

    containerChecklist: {
        color: '#000',
        paddingTop: 30,
        // width: '100%',
        paddingHorizontal: '4%',
        display: 'flex',
        flexDirection: 'column',
    },

    mensagemCheck: {
        fontFamily: 'Sen_400Regular',
        fontSize: 16,
        color: '#888888'
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});