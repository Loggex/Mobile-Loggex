import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const bottomTab = createBottomTabNavigator()

import OCR from './OCR'
import ListaRotas from './ListaRotas'
import Perfil from './Perfil'
import Checklist from './Checklist';

export default function Main() {
    return (
        <View style={styles.container}>
            <bottomTab.Navigator
                initialRouteName="OCR"

                screenOptions={({ route }) => ({
                    tabBarIcon: () => {
                        if (route.name === 'OCR') {
                            return (
                                <Text>OCR</Text>
                            )
                        }
                        if (route.name === 'Perfil') {
                            return (
                                <Text>Perfil</Text>
                            )
                        }
                        if (route.name === 'ListaRotas') {
                            return (
                                <Text>Rotas</Text>
                            )
                        }
                    },

                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveBackgroundColor: '#FFFFF',
                    tabBarInactiveBackgroundColor: '#FFFFF',
                    tabBarStyle: { height: 50 }
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
});