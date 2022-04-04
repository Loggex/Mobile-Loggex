import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';
import { Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';





export default function FotoPeca({ navigation }) {
    
    
    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Sen_400Regular,
        Poppins_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return(
        <View>
            
        </View>
    )


}