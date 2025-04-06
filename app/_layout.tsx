import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {View} from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <View style={{flex: 1}}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="home" />
                <Stack.Screen name="+not-found" options={{headerShown: false}} />
            </Stack>
            <StatusBar style="light"/>
        </View>
    );
}
