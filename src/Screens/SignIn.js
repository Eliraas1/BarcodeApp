import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import SignUp from "./SignUp";

const SignIn = ({ navigation }) => {
  const navigate = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}>
        <View style={styles.BottomView}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 40,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#696969",
  },
  
  textStyle: {
    // color: "white",
  },
});

export default SignIn;
