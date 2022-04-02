import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./src/Screens/SignIn";
import SignUp from "./src/Screens/SignUp";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AppLoading from "expo-app-loading";
// import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Helvetica-Bold": require("./assets/fonts/Helvetica-Bold.ttf"),
  //   "Helvetica-BoldOblique": require("./assets/fonts/Helvetica-BoldOblique.ttf"),
  //   "SharpSansNo1-Book": require("./assets/fonts/SharpSansNo1-Book.ttf"),
  // });

  return (
    <NavigationContainer screenOptions={{ headerTransparent: true }}>
      <Stack.Navigator screenOptions={{ headerTransparent: false }}>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
npm install -g expo-cli
expo init BarcodeApp
cd BarcodeApp
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm start
*/
