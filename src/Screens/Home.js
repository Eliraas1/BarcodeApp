import { Button, View, Text } from "react-native";
import React from "react";
import useAuth from "../useAuth";
import { auth } from "../../Firebase/firebase";
import { signOut } from "firebase/auth";

const Home = () => {
  const logout = () => {
    signOut(auth).catch((err) => {
      console.log(err);
    });
  };
  return (
    <View>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

export default Home;
