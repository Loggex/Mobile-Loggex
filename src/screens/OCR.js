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

export default function OCR() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [placa, setPlaca] = useState('')
    const [veiculo, setVeiculo] = useState({})
    const [teste, setTeste] = useState({})

    const ref = useRef(null)
    const modalizeRef = useRef(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à camera</Text>;
    }

    function onOpen() {
        modalizeRef.current?.open();
    }

    const TakePicture = async () => {
        const foto = await ref.current.takePictureAsync()

        onOpen()

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
            })
            .catch(erro => console.debug(erro))

        console.debug(resultado)
    }

    async function BuscarVeiculo() {
        const token = await tokenUsuario()

        const placa = 'CZN4542'

        const requisicao = await api.get(`/veiculos/placa/${placa}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        console.debug(requisicao.data)
        setVeiculo(requisicao.data)
        await AsyncStorageLib.setItem("veiculo-atual", JSON.stringify(requisicao.data))
        // await AsyncStorageLib.removeItem("veiculo-atual")

        onOpen()
    }

    const FiltrarOCR = (obj) => {
        let resultado;
        let teste = JSON.parse(obj)
        // console.debug("foi aqui")
        // console.debug(teste.language)

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
    }

    return (
        <View style={styles.container}>
            <Modalize
                ref={modalizeRef}
                snapPoint={500}
            >
                <Image style={styles.image} source={imgCaminhao} />
                <View style={styles.modal} >
                    <View style={styles.txtModal}>
                        <Text style={styles.tituloModal}>
                            Veículo encontrado:
                        </Text>
                        <Text style={styles.nomeVeiculo}>
                            {veiculo.idTipoVeiculoNavigation?.modeloVeiculo}
                        </Text>
                    </View>

                    <View style={styles.modalBtns}>
                        <TouchableOpacity style={styles.btnModal}>
                            <Text style={styles.txtBtnModal1}>
                                Confirmar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.txtBtnModal2}>
                                Tentar novamente
                            </Text>
                        </TouchableOpacity>
                    </View>

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
            <TouchableOpacity onPress={() => BuscarVeiculo()} style={styles.btnFoto}>
                <Text style={styles.btnTxt}>Tirar Foto</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
        padding: '4%'
    },

    image: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 230
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