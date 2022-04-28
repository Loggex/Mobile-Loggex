import AsyncStorageLib from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const usuarioAutenticado = async () => await AsyncStorageLib.getItem('login-loggex') !== null;

export const parseJwt = async () => {

    return jwtDecode(await AsyncStorageLib.getItem('login-loggex'));

}

export const tokenUsuario = async () => {
    return await AsyncStorageLib.getItem('login-loggex')
}