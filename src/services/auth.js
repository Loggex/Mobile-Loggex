import AsyncStorageLib from "@react-native-async-storage/async-storage";

export const usuarioAutenticado = () => AsyncStorageLib.getItem('login-loggex') !== null;

export const parseJwt = () => {

    let base64 = AsyncStorageLib.getItem('login-loggex').split('.')[1];

    return JSON.parse(window.atob(base64));
}