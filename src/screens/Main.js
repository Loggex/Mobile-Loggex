import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome5, AntDesign, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const bottomTab = createBottomTabNavigator()

import OCR from './OCR'
import ListaRotas from './ListaRotas'
import Perfil from './Perfil'

export default function Main() {
    return (
        <View style={styles.container}>
            <StatusBar
                style='dark'
                backgroundColor='#FFF'
            />
            <bottomTab.Navigator
                initialRouteName="OCR"
                style={styles.tabNavigator}

                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        if (route.name === 'OCR') {
                            return (
                                <View style={styles.aba}>
                                    <AntDesign name="scan1" color={focused ? "#060657" : "#796F6F"} size={26} />
                                    <Text style={styles.txtAba} color={focused ? "#060657" : "#796F6F"}>Placa</Text>
                                </View>
                            )
                        }
                        if (route.name === 'Perfil') {
                            return (
                                <View style={styles.aba}>
                                    <Ionicons name="person-sharp" color={focused ? "#060657" : "#796F6F"} size={26} />
                                    <Text style={styles.txtAba} color={focused ? "#060657" : "#796F6F"}>Perfil</Text>
                                </View>
                            )
                        }
                        if (route.name === 'ListaRotas') {
                            return (
                                <View style={styles.aba}>
                                    <FontAwesome5 name="route" size={26} color={focused ? "#060657" : "#796F6F"} />
                                    <Text style={styles.txtAba} color={focused ? "#060657" : "#796F6F"}>Rotas</Text>
                                </View>
                            )
                        }
                    },

                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveBackgroundColor: '#FFFFF',
                    tabBarInactiveBackgroundColor: '#FFFFF',
                    tabBarStyle: styles.tabNavigator
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
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-evenly'
    },

    txtAba: {
        fontFamily: 'Sen_400Regular',
        fontSize: 12
    },

    tabNavigator: {
        height: 60,
    }
});