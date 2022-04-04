import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, Icon, TouchableOpacity, Touchable } from 'react-native';
import { useNavigate } from 'react-router';
import { AsyncStorage } from 'react-native';

export default function Perfil({ navigation }) {

    const logout = (navigation) => {
        AsyncStorage.setItem("TOKEN","").then(() => {
            navigation.reset({
                index: 0,
                routes: [{name: "Login"}]
            })
        }).catch((error) => {
            console.log(error)
            Alert.alert("Erro ao sair")
        })
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
        <Button
            icon={
              <Icon
                name="check"
                size={15}
                color="white"
              />
            }
            title="Sair"
            onPress={() => logout(navigation)}
          />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});