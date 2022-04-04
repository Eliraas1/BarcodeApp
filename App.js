import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth, { AuthProvider } from "./src/useAuth";
import StackNavigator from "./src/StackNavigator";
// import AppLoading from "expo-app-loading";
// import { useFonts } from "expo-font";
LogBox.ignoreAllLogs(); //Ignore log notfication by message
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer screenOptions={{ headerTransparent: true }}>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

/*
npm install -g expo-cli
expo init BarcodeApp
cd BarcodeApp
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
*/
