import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Modalize } from 'react-native-modalize';
import imgCaminhao from '../assets/caminhao.png';
import { tokenUsuario } from '../services/auth';
import api from '../services/api';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default function OCR({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [placa, setPlaca] = useState('')
    const [tempVeiculo, setTempVeiculo] = useState({})
    const [veiculo, setVeiculo] = useState({})
    const [teste, setTeste] = useState({})

    const ref = useRef(null)
    const modalizeRef = useRef(null)
    const modalizeRefError = useRef(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // if (hasPermission === null) {
    //     return <View />;
    // }
    // if (hasPermission === false) {
    //     return <Text>Sem acesso à camera</Text>;
    // }

    function onOpen() {
        modalizeRef.current?.open();
    }

    function Error() {
        modalizeRefError.current?.open();
    }

    function CloseError() {
        modalizeRefError.current?.close();
    }

    function onClose() {
        modalizeRef.current?.close();
        setTempVeiculo({})
    }

    const TakePicture = async () => {
        const foto = await ref.current.takePictureAsync()

        // onOpen()

        let resultado;

        const options = {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            headers: {
                "Content-Type": "multipart/form-data",
                "Ocp-Apim-Subscription-Key": "65679d72ba0245bbacadf9420515503d"
            }
        }


        await FileSystem.uploadAsync("https://ocr-loggex.cognitiveservices.azure.com/vision/v3.2/ocr?language=pt&detectOrientation=true&model-version=latest", foto.uri, options)
            .then(response => {
                resultado = FiltrarOCR(response.body);
                console.debug(resultado)
                BuscarVeiculo(resultado)
            })
            .catch(erro => console.debug(erro))

    }

    async function BuscarVeiculo(placa) {
        const token = await tokenUsuario()

        // const placa = 'CZN4542'

        const requisicao = await api.get(`/veiculos/placa/${placa}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(async resposta => {
            if (resposta.status === 200) {
                console.debug(resposta.status)
                await AsyncStorageLib.setItem("veiculo-atual", JSON.stringify(resposta.data))
                setTempVeiculo(resposta.data)
                onOpen()
            } else {
                Error()
                console.debug(resposta.status)
            }
        })

        // console.debug(requisicao.data)
        // setVeiculo(requisicao.data)
        // await AsyncStorageLib.setItem("veiculo-atual", JSON.stringify(requisicao.data))
        // await AsyncStorageLib.removeItem("veiculo-atual")

        // onOpen()
    }

    async function BuscaVeiculoAtual() {
        setVeiculo(JSON.parse(await AsyncStorageLib.getItem('veiculo-atual')))
        console.debug(veiculo)
    }

    const FiltrarOCR = (obj) => {
        try {
            let resultado;
            let teste = JSON.parse(obj)

            teste.regions.forEach(region => {
                region.lines.forEach(line => {
                    line.words.forEach(word => {
                        if (word.text.length >= 7 && isNaN(Number(word.text.slice(-2))) !== true) {
                            resultado = word.text.slice(-7);
                        }
                    });
                });
            });

            return resultado;
        } catch (error) {
            console.debug('aqui não foi não')
        }
    }

    async function Limpar() {
        await AsyncStorageLib.removeItem('veiculo-atual')
        setVeiculo(null)
    }

    useEffect(() => {
        const atualizar = navigation.addListener('focus', () => {
            BuscaVeiculoAtual()
        });
        return atualizar;
    }, [navigation])

    if (veiculo === null) {
        return (
            <View style={styles.container}>
                <Modalize
                    ref={modalizeRef}
                    // snapPoint={500}
                    snapPoint={900}
                    panGestureEnabled={false}
                >
                    <Image style={styles.image} source={imgCaminhao} />
                    <View style={styles.modal} >
                        <View style={styles.txtModal}>
                            <Text style={styles.tituloModal}>
                                Veículo encontrado:
                            </Text>
                            <Text style={styles.nomeVeiculo}>
                                {tempVeiculo.idTipoVeiculoNavigation?.modeloVeiculo}
                            </Text>
                        </View>

                        <View style={styles.modalBtns}>
                            <TouchableOpacity style={styles.btnModal} onPress={() => setVeiculo(tempVeiculo)}>
                                <Text style={styles.txtBtnModal1}>
                                    Confirmar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onClose()}>
                                <Text style={styles.txtBtnModal2}>
                                    Tentar novamente
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modalize>
                <Modalize
                    ref={modalizeRefError}
                    // snapPoint={370}
                    snapPoint={600}
                    panGestureEnabled={false}
                >
                    <View style={styles.modalError} >
                        <LottieView style={{ width: '50%' }} source={require('../assets/lottie/lf30_editor_wnwgpvq4.json')} autoPlay loop={false} />
                        <Text style={styles.nomeVeiculo}>Nenhum veículo foi encontrado</Text>
                        <TouchableOpacity style={styles.btnModal} onPress={() => CloseError()}>
                            <Text style={styles.txtBtnModal1}>
                                Tentar novamente
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modalize>
                <View style={styles.txtOcr}>
                    <Text style={styles.titulo}>Escanear placa</Text>
                    <Text style={styles.desc}>Aponte sua a câmera para a placa do veículo de modo que ela encaixe na região abaixo:</Text>
                </View>
                <Camera
                    style={styles.camera}
                    type={type}
                    ref={ref}
                >
                </Camera>
                <TouchableOpacity onPress={() => TakePicture()} style={styles.btnFoto}>
                    <Text style={styles.btnTxt}>Tirar Foto</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <LottieView style={{ width: '100%' }} source={require('../assets/lottie/lf30_bx07iy2i.json')} autoPlay loop />
                    <Text style={styles.tituloModal}>Veículo atual</Text>
                    <Text style={styles.nomeVeiculo}>{veiculo.idTipoVeiculoNavigation?.modeloVeiculo}</Text>
                    <TouchableOpacity style={styles.btnFoto} onPress={() => Limpar()}>
                        <Text style={styles.btnTxt}>
                            Trocar veículo
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    box: {
        width: '100%',
        // height: 370,
        height: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "space-between"
    },

    container: {
        flex: 1,
        paddingHorizontal: '4%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFF'
    },
    camera: {
        flex: 0.9,
        width: '100%',
        borderRadius: 5,
        margin: 0

    },

    text: {
        fontSize: 18,
        color: 'white',
    },

    titulo: {
        fontSize: 20,
        fontFamily: 'Sen_700Bold',
        textAlign: 'center',
    },

    desc: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888888',
        fontFamily: 'Sen_400Regular'
    },

    txtOcr: {
        marginTop: 40,
        flexDirection: 'column',
        height: 90,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    btnFoto: {
        width: '100%',
        height: 51,
        backgroundColor: '#060657',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },

    btnTxt: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 18,
        color: '#FFF'
    },

    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '4%',
    },

    modalError: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '4%',
        // height: 350
        height: 590
    },

    image: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // height: 230
        height: 500
    },

    tituloModal: {
        fontFamily: 'Sen_400Regular',
        fontSize: 20
    },

    nomeVeiculo: {
        fontFamily: 'Sen_700Bold',
        fontSize: 30
    },

    txtModal: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 70
    },

    btnModal: {
        display: 'flex',
        width: '100%',
        height: 51,
        backgroundColor: '#060657',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
    },

    txtBtnModal1: {
        fontSize: 16,
        color: '#FFF',
        fontFamily: 'Poppins_700Bold',
    },

    modalBtns: {
        width: '100%',
        marginTop: '20%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 90
    },

    txtBtnModal2: {
        fontFamily: 'Sen_400Regular',
        color: '#060657',
        fontSize: 17
    }

});