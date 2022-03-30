import * as Font from 'expo-font';
import { useFonts, Sen_400Regular, Sen_700Bold, Sen_800ExtraBold } from '@expo-google-fonts/sen';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';

export default UseFonts = async () =>
    await Font.loadAsync({
        Sen_700Bold,
        Sen_800ExtraBold,
        Sen_400Regular,
        Poppins_700Bold
    });