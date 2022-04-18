import { Button, View, Text, Image } from "react-native";
import React from "react";
import useAuth from "../useAuth";
import AnimatedSplash from "react-native-animated-splash-screen";
import { db, doc, setDoc, getDoc } from "../../Firebase/firebase";

const Home = () => {
  const { logout, user } = useAuth();

  const { uid } = user;
  const myDoc = doc(db, "MyCollection", uid);
  // const ddb = getDoc(myDoc);
  // const log = () => {
  //   const l = JSON.stringify(myDoc);
  //   console.log("\n" + l + "\n");
  // };
  const Create = () => {
    const docData = {
      Company: "Fox",
      Points: "12",
    };
    setDoc(myDoc, docData)
      .then(() => {
        alert("created!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const Read = () => {
    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data());
        } else {
          alert("no doc for user");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Update = () => {};
  const Delete = () => {};

  return (
    <View>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Button title="logout" onPress={logout} />
      <Button title="Create" onPress={Create} />
      <Button title="Read" onPress={Read} />
      {/* <Button title="logout" onPress={logout} />
      <Button title="logout" onPress={logout} />
      <Button title="logout" onPress={logout} /> */}
    </View>
  );
};

export default Home;
