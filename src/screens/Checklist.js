import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';
import { Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

export default function Checklist({ navigation }) {
    const [isSelected, setSelected] = useState(false)
    const [listaPecas, setListaPecas] = useState([])
    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Sen_400Regular,
        Poppins_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    async function ListarPecas() {

        const token = await tokenUsuario()

        const requisicao = await api.get('/pecas', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        console.debug(requisicao.data)
    }

    useEffect(ListarPecas, [])

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
                        checked={isSelected}
                        onPress={() => setSelected(!isSelected)}
                        style={styles.checkbox}
                    />
                    <View style={styles.foto}>
                        <Text style={styles.label}>Pneu</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("FotoPeca")}>
                            <MaterialIcons name="add-photo-alternate" size={33} color="#070757" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        checkedIcon="check"
                        uncheckedIcon="square-o"
                        checkedColor="green"
                        checked={isSelected}
                        onPress={() => setSelected(!isSelected)}
                        style={styles.checkbox}
                    />
                    <View style={styles.foto}>
                        <Text style={styles.label}>Pneu</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("FotoPeca")}>
                            <MaterialIcons name="add-photo-alternate" size={33} color="#070757" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        checkedIcon="check"
                        uncheckedIcon="square-o"
                        checkedColor="green"
                        checked={isSelected}
                        onPress={() => setSelected(!isSelected)}
                        style={styles.checkbox}
                    />
                    <View style={styles.foto}>
                        <Text style={styles.label}>Pneu</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("FotoPeca")}>
                            <MaterialIcons name="add-photo-alternate" size={33} color="#070757" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        checkedIcon="check"
                        uncheckedIcon="square-o"
                        checkedColor="green"
                        checked={isSelected}
                        onPress={() => setSelected(!isSelected)}
                        style={styles.checkbox}
                    />
                    <View style={styles.foto}>
                        <Text style={styles.label}>Pneu</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("FotoPeca")}>
                            <MaterialIcons name="add-photo-alternate" size={33} color="#070757" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        checkedIcon="check"
                        uncheckedIcon="square-o"
                        checkedColor="green"
                        checked={isSelected}
                        onPress={() => setSelected(!isSelected)}
                        style={styles.checkbox}
                    />
                    <View style={styles.foto}>
                        <Text style={styles.label}>Pneu</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("FotoPeca")}>
                            <MaterialIcons name="add-photo-alternate" size={33} color="#070757" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        checkedIcon="check"
                        uncheckedIcon="square-o"
                        checkedColor="green"
                        checked={isSelected}
                        onPress={() => setSelected(!isSelected)}
                        style={styles.checkbox}
                    />
                    <View style={styles.foto}>
                        <Text style={styles.label}>Pneu</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("FotoPeca")}>
                            <MaterialIcons name="add-photo-alternate" size={33} color="#070757" />
                        </TouchableOpacity>
                    </View>
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