import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Icon, TouchableOpacity, Touchable } from 'react-native';
import { useNavigate } from 'react-router';
import AppLoading from 'expo-app-loading';
import { AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';




export default function Perfil({ navigation }) {

    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Poppins_700Bold,
        Sen_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }


    const logout = (navigation) => {
        AsyncStorage.setItem("TOKEN", "").then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }]
            })
        }).catch((error) => {
            console.log(error)
            Alert.alert("Erro ao sair")
        })
    }

    /* realizarLogout = async() => {
        try {
            await AsyncStorage.removeItem('usuarioLogin')
            this.props.navigation.navigate('Login')
        }catch (error) {
            console.warn(error)
        }
    }; */


    return (
        <ScrollView style={styles.container}>


            {/* <Button
            icon={
                <Icon
                name="check"
                size={15}
                color="white"
                />
            }
            title="Sair"
            onPress={() => logout(navigation)}
        /> */}




            <View style={styles.containerPerfil}>

                <LinearGradient
                    style={styles.gradiente}
                    locations={[0.0, 1.0]}
                    colors={['#33338A', '#060657',]}>
                    <View style={styles.caixalogo}>

                        <Image source={require('../assets/logoBranco.png')}

                        />
                    </View>


                    <View style={styles.containerFoto}>

                        <Image source={require('../assets/avatarJose.png')}
                            style={styles.avatar}
                        />


                        <TouchableOpacity>

                            <Text style={styles.atualizarFoto}>Atualizar foto</Text>

                        </TouchableOpacity>
                    </View>


                </LinearGradient>
            </View>

            <View style={styles.containerConteudoInformacoes}>
                <Text style={styles.textNome}>José João Barros</Text>
                <Text style={styles.textEmpresa}>Senai Transportes</Text>
            </View>




            <StatusBar style="auto" />

        </ScrollView>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    gradiente: {
        width: '100%',
        height: 240,
        alignItems: 'center'
    },

    containerPerfil:{
        width:'100%',
        height: 370
    },

    caixalogo: {
        width: '100%',
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
        marginTop: 20
    },

    avatar: {
        marginTop: 10
    },

    containerFoto: {
        width: '100%',
        alignItems: 'center',
        height: 210
        /*         justifyContent:'center'
         */
    },

    atualizarFoto: {
        fontFamily: 'Sen_400Regular',
        color: '#060657',
        fontSize: 16,
        paddingTop: 20
    },

    textNome: {
        fontSize: 30,
        fontFamily: 'Sen_700Bold',
        color: '#000'
    },
    textEmpresa: {
        fontSize: 22,
        fontFamily: 'Sen_400Regular',
        color: '#000',
        paddingTop:20
    },

    containerConteudoInformacoes: {
        width: '100%',
        height:160,
        backgroundColor:'#c4c4c4',
        justifyContent: 'center',
        alignItems: 'center',
    }

});