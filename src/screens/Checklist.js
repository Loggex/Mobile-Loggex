
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';
/* import Animated, {useSharedValue, useAnimatedStyle,} from 'react-native-reanimated'; */
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from 'react-native-elements';


//navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const bottomTab = createBottomTabNavigator()

import OCR from './OCR'
import ListaRotas from './ListaRotas'
import Perfil from './Perfil'



export default function Checklist({ navigation }) {
    const [isSelected, setSelected] = useState(false)
    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Sen_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

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
                                <Image style={styles.imageVoltar} source={require('../assets/X.png')} />
                            </TouchableOpacity>
                            <Text style={styles.checklistInicial}>Checklist inicial</Text>
                        </View>
                        {/* <Text>{item.idTipoVeiculoNavigation.modeloVeiculo}</Text> */}
                        <Text style={styles.nomeVeiculo}>Volvo Fh 540 6x4</Text>
                    </LinearGradient>
                </View>

            </View>
            <View style={styles.containerChecklist}>
                <Text style={styles.mensagemCheck}>Marque apenas os componentes que se encontram em condições adequadas para a execução do serviço.</Text>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                         checkedIcon="check"
                         uncheckedIcon="square-o"
                         checkedColor="green"
                         uncheckedColor="red"
                         checked={isSelected}
                         onPress={() => setSelected(!isSelected)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Pneu</Text>
                </View>
            </View>


            <StatusBar style="auto" />
        </ScrollView >
    )

}
const styles = StyleSheet.create({
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
        marginHorizontal: '4%',
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
        marginHorizontal: '4%',
        paddingVertical: 10,
    },

    containerChecklist: {
        color: '#000',
        paddingTop: 30,
        width: '90%',
        height: 700,
        marginHorizontal: '4%'
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
        alignItems:'center'
    },

    label: {
    },

});