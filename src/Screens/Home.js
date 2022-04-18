import { Button, View, Text, Image } from "react-native";
import React, { useState } from "react";
import useAuth from "../useAuth";
import AnimatedSplash from "react-native-animated-splash-screen";
import {
  db,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
  collection,
  deleteDoc,
} from "../../Firebase/firebase";

const Home = () => {
  const { logout, user } = useAuth();

  const { uid } = user;
  const [userInputs, setUserInput] = useState({
    Company: "Maccabis",
    Points: 25,
  });

  const Create = async () => {
    const myDoc = doc(db, "users", uid, "companies", userInputs.Company);
    await setDoc(myDoc, userInputs);
  };

  const Read = async () => {
    const collect = collection(db, "users", uid, "companies");
    const documents = await getDocs(collect);
    const arr = [];
    documents.docs.map((doc) => {
      arr.push([doc.data().Company, doc.data().Points]);
    });
    arr.forEach((data) => console.log(data));
    console.log(arr);
  };

  const Update = (merge) => {
    const myDoc = doc(db, "users", uid, "companies", userInputs.Company);
    setDoc(myDoc, userInputs, { merge: merge })
      .then(() => {
        alert("updated");
        setLo;
      })
      .catch((err) => {
        alert("err");
      });
  };

  const Delete = () => {
    const collect = collection(db, "users", uid, "companies");
    // const myDoc = doc(db, "users", uid, "companies", userInputs.Company);
    deleteDoc(doc(db, "users", uid, "companies", "Diesel"))
      .then(() => {
        alert("deleted");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const checkExist = async (brand) => {
    const docs = doc(db, "users", uid, "companies", brand);
    const snap = await getDoc(docs);
    const isExist = snap.exists();
    return isExist;
  };

  const Add = async () => {
    //user input
    const brand = "Pizza Hut";
    const companies = "companies";
    const Points = 15;
    const value = {
      Company: brand,
      Points: Points,
    };

    const check = await checkExist(brand);
    if (check) {
      alert(brand + "already exist");
      return;
    }
    const cpm = doc(db, "users", uid, companies, brand);
    await setDoc(cpm, value);
  };

  return (
    <View>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Button title="logout" onPress={logout} />
      <Button title="Create" onPress={Create} />
      <Button title="Read" onPress={Read} />
      <Button title="Delete" onPress={Delete} />
      <Button
        title="Update"
        onPress={() => {
          Update(true);
        }}
      />
      {/* <Button title="logout" onPress={logout} />
      <Button title="logout" onPress={logout} />
      <Button title="logout" onPress={logout} /> */}
    </View>
  );
};

export default Home;
