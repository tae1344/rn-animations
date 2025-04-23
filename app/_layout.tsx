import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from "react-native";
import {
    GestureHandlerRootView
} from 'react-native-gesture-handler';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);


    return (
        <GestureHandlerRootView>
        <View style={{flex: 1}}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
                >
                <Stack.Screen name="home" />
                <Stack.Screen name="+not-found" options={{headerShown: false}} />
            </Stack>
            <StatusBar style="light"/>
        </View>
        </GestureHandlerRootView>
    );
}
