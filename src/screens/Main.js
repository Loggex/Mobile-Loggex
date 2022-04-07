import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const bottomTab = createBottomTabNavigator()

import OCR from './OCR'
import ListaRotas from './ListaRotas'
import Perfil from './Perfil'

export default function Main() {
    return (
        <View style={styles.container}>
            <bottomTab.Navigator
                initialRouteName="OCR"
                style={styles.tabNavigator}

                screenOptions={({ route }) => ({
                    tabBarIcon: () => {
                        if (route.name === 'OCR') {
                            return (
                                <View style={styles.aba}>
                                    <AntDesign name="scan1" size={26} color="black" />
                                    <Text style={styles.txtAba}>Placa</Text>
                                </View>

                            )
                        }
                        if (route.name === 'Perfil') {
                            return (
                                <Text>Perfil</Text>
                            )
                        }
                        if (route.name === 'ListaRotas') {
                            return (
                                <FontAwesome5 name="route" size={26} color="black" />
                            )
                        }
                    },

                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveBackgroundColor: '#FFFFF',
                    tabBarInactiveBackgroundColor: '#FFFFF',
                    tabBarStyle: { height: 60 }
                })}
            >
                <bottomTab.Screen name="ListaRotas" component={ListaRotas} />
                <bottomTab.Screen name="OCR" component={OCR} />
                <bottomTab.Screen name="Perfil" component={Perfil} />
            </bottomTab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    aba: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    txtAba: {
        fontFamily: 'Sen_400Regular',
        fontSize: 12
    }
});