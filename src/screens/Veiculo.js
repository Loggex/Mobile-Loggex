import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, } from 'react-native';
import PagerView from 'react-native-pager-view';
import imgVeiculo from '../assets/caminhao.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Veiculo({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <PagerView style={styles.viewPager} initialPage={0}>
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
            <TouchableOpacity style={styles.btnVoltar}>
                <MaterialCommunityIcons name="chevron-left-circle" size={40} color="#FFF" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.boxInfo}>
                <View style={styles.boxTabela}>
                    <View style={styles.tabela}>
                        <Text style={styles.nomeVeiculo}>Volvo Fh 540 6x4</Text>
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
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#bca',
        // justifyContent: 'center',
    },

    viewPager: {
        minHeight: 230,
        width: '100%',
        marginTop: 20,
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

    nomeVeiculo: {
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

    btnVoltar: {
        position: 'absolute',
        marginTop: '8%',
        marginLeft: '5%'
    }

});