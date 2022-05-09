import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

export default function FotoPeca({ route, navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [placa, setPlaca] = useState('')
    const [teste, setTeste] = useState({})
    const idPeca = route.params?.idPeca
    const [servico, setServico] = useState(route.params?.servicoAtual)
    const ref = useRef(null)



    // const TakePicture = async () => {
    //     const foto = await ref.current.takePictureAsync()
    //     const options = {
    //         httpMethod: 'POST',
    //         uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    //         fieldName: 'file',
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //             "Ocp-Apim-Subscription-Key": "65679d72ba0245bbacadf9420515503d"
    //         }
    //     }



    //     setTeste(response.body)
    //     console.debug(response)
    //     console.debug(teste)

    //     response.body.regions.forEach(region => {
    //         region.lines.forEach(line => {
    //             line.words.forEach(word => {
    //                 if (word.text.length === 7) {
    //                     setPlaca(word.text)
    //                 }
    //             })
    //         })
    //     })

    //     console.log(placa)
    // }

    async function takePhotoAndUpload() {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false, // higher res on iOS
            aspect: [4, 3],
        });

        if (result.cancelled) {
            navigation.navigate('Checklist')
        } else {
            let localUri = result.uri;

            await AsyncStorageLib.setItem(`peca-${idPeca}`, localUri)

            navigation.navigate('Checklist', { rotaAtual: servico })
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

    useEffect(takePhotoAndUpload, [])

    return (
        <View style={styles.container}>
            {/* <View style={styles.txtOcr}>
                <Text style={styles.titulo}>Foto da peça</Text>
                <Text style={styles.desc}>Aponte sua a câmera para a peça do veículo de modo que ela encaixe na região abaixo:</Text>
            </View>
            <Camera
                style={styles.camera}
                type={type}
                ref={ref}
            >
            </Camera>
            <TouchableOpacity onPress={TakePicture} style={styles.btnFoto}>
                <Text style={styles.btnTxt}>Tirar Foto</Text>
            </TouchableOpacity> */}
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
    }
});
