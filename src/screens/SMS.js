
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { TextInputMask } from 'react-native-masked-text';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';



import {
    FlatList,
    SafeAreaView,
    ScrollView,
    useColorScheme,
    ImageBackground,
    Image,
    TextInput,
} from 'react-native';
import { parseJwt } from '../services/auth';



export default function SMS({ navigation }) {
    //const [telefone, setTelefone] = useState("");
    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Poppins_700Bold,
        Sen_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    /* const [SMS, setSMS] = useState(null)

    const [errorSMS, setErrorSMS] = useState(null)

    let SMSField = null


    const validar = () => {
        let error = false
        setErrorEmail(null)
        setErrorCpf(null)
        setErrorSenha(null)
        if (SMS == null){
          setErrorSMS("Preencha seu telefone corretamente")
          error = true
        }
        return !error
    } */

    async function VerificarCodigo() {
        if (value === (await parseJwt()).CodigoLogin) {
            navigation.navigate("Main")
        } else {
            console.debug((await parseJwt()).CodigoLogin)
            console.debug("Código errado, tente novamente")
        }

    }

    return (

        <View style={styles.container}>

            <Image source={require('../assets/logoLoggex.png')}
                style={styles.MainImgLogin}
            />
            <View>

                <Text style={styles.TextMain}> Acesse sua conta </Text>
            </View>

            <View style={styles.containerLogin}>


                <View style={styles.boxSMS}>
                    <Text style={styles.textSMS}>Um código de SMS foi mandado para o seu numero de telefone, insira o codigo no campo abaixo</Text>
                </View>

                {/* <TextInputMask
                    style={styles.inputLogin}
                    type={'custom'}
                    options={{
                        mask: '999999',
                        Validator: function (val, settings) {
                            if (val.length == 6) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }}
                    keyboardType='number-pad'
                    placeholder='Codigo do SMS'
                    value={cell}
                    onChangeText={text => setCell(text)}

                /> */}

                <View style={styles.containerSMS}>


                    {/* <SMSVerifyCode

                        verifyCodeLength={6}
                        containerPaddingVertical={10}
                        containerPaddingHorizontal={50}
                        codeFontSize={26}
                        style={styles.inputSMS}
                    /> */}

                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />





                </View>


                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={() => VerificarCodigo()}
                >

                    <Text style={styles.LoginText}>Entrar</Text>

                </TouchableOpacity>
            </View>
            <StatusBar style="autos" />
        </View>


    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    MainImgLogin: {
        width: 234,
        height: 62.34
    },

    containerLogin: {
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputLogin: {
        width: '100%',
        height: 50,
        fontSize: 18,
        borderColor: '#F2F1FB',
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: 20
    },

    TextMain: {
        fontFamily: 'Sen_700Bold',
        color: '#140440',
        fontSize: 30,
        marginTop: 80,
        paddingBottom: 40
    },

    btnLogin: {
        backgroundColor: '#060657',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 2
    },

    LoginText: {
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
        fontSize: 18

    },

    boxSMS: {
        width: '100%',
        paddingBottom: 30
    },

    textSMS: {
        fontSize: 17,
        fontFamily: 'Sen_400Regular',
    },

    inputSMS: {
        alignItems: 'center'
    },

    containerSMS: {
        width: "100%",
        alignItems: 'center'
    },

    SMSfodase: {
        width: '100%'
    },

    codeFieldRoot: {
        width: '100%'
    },

    cell: {
        width: '13%',
        //width:40,
        // height: 40,
        height: 80,
        lineHeight: 68,
        // lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },

})

