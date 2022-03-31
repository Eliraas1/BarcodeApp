import React from "react";
import { Text, View, StyleSheet } from "react-native";

const SignUp = () => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.textStyle}>Sign Up</Text>
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
    backgroundColor: "#696969",
  },
  textStyle: {
    color: "white",
  },
});

export default SignUp;
