// import { View, Text } from "react-native";
import React, { useState, useMemo } from "react";
import { logInAsync } from "expo-google-app-auth";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import {
  auth,
  db,
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "../Firebase/firebase";
import { createContext, useContext, useEffect } from "react";
import { where, query } from "firebase/firestore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthContext = createContext({});

const config = {
  androidClientId:
    "49149816867-l2jrqmc8nojv209lgft0r8006p5l9rnd.apps.googleusercontent.com",
  iosClientId:
    "49149816867-a1h90lek49qepil3qeloumeacm30ofck.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

let error;

// export default signInWithGoogle;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // console.log(user);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const [userInputs, setUserInput] = useState();
  const [userData, setuserData] = useState([]);
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);

  const Create = (data) => {
    let obj = {
      Company: data.Company,
      Points: parseInt(data.Points),
      Logo: data.Logo,
    };
    //check if data exist and updates points
    // else created new one in DB
    const checkData = isExist(obj);
    if (checkData.Company !== undefined) {
      obj = {
        ...obj,
        Points: obj.Points + parseInt(checkData.Points),
      };

      userData.forEach((object) => {
        if (object.Company === obj.Company)
          object.Points += parseInt(obj.Points);
      });
      setuserData(userData);
      console.log(userData);
    }
    const myDoc = doc(db, "users", user.uid, "companies", data.Company);
    setLoading(true);
    setDoc(myDoc, obj)
      .then(() => {
        // arr.push(obj);
      })
      .catch(() => {
        alert("Error!!");
      })
      .finally(() => {
        setLoading(false);
        setIsBarcodeScanned(true);
      });
  };

  const Read = () => {
    // setuserData(null);
    while (userData.length > 0) userData.pop();

    setuserData(userData);

    setLoading(true);
    const collect = collection(db, "users", user.uid, "companies");
    getDocs(collect)
      .then((doc) => {
        doc.docs.map((doc) => {
          userData.push(doc.data());
          setuserData(userData);
        });
        // userData.forEach((data) => console.log(data));
      })
      .catch(() => {
        console.log("ERRORRR READING DATA!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isExist = (object) => {
    const { Company } = object;
    let newObj = {};
    userData.forEach((obj) => {
      if (obj.Company === Company) {
        newObj = obj;
        return;
      }
    });
    return newObj;
  };

  const Update = (merge) => {
    const myDoc = doc(db, "users", user.uid, "companies", userInputs.Company);
    setDoc(myDoc, userInputs, { merge: merge })
      .then(() => {
        alert("updated");
      })
      .catch((err) => {
        alert("err");
      });
  };

  const Delete = () => {
    deleteDoc(doc(db, "users", user.uid, "companies", userInputs.Company))
      .then(() => {
        alert("deleted");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const logout = () => {
    console.log("first");
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    await logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credantial = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credantial);
          console.log("Heidad!");
        } else return Promise.reject();
      })
      .catch((err) => {
        error = err;
      });
  };

  const memoValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
      Create,
      Read,
      Update,
      Delete,
      userData,
      setIsBarcodeScanned,
      isBarcodeScanned,
    }),
    [user, loading, error, userData, isBarcodeScanned]
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
