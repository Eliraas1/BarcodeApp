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
  updateDoc,
} from "../Firebase/firebase";
import { createContext, useContext, useEffect } from "react";
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

// export default signInWithGoogle;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [Googleloading, setGoogleloading] = useState(false);
  const [error, setError] = useState("");
  const [dataChanged, setDataChanged] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("user setttt");
          setUser(user);
          // Read();
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  // const { uid } = user;
  const [userInputs, setUserInput] = useState();
  const [userData, setuserData] = useState([]);
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const Update2 = (Company, newPoints, currentPoints) => {
    const myDoc = doc(db, "users", user.uid, "companies", Company);
    const updatedPoints = Number(newPoints) + Number(currentPoints);
    updateDoc(myDoc, { Points: updatedPoints })
      .then(() => {
        userData.forEach((object) => {
          if (object.Company === Company) {
            object.Points = updatedPoints;
            return;
          }
        });
        setuserData(userData);
      })
      .catch((err) => {
        console.log("err in update " + err);
      })
      .finally(() => {
        // setLoading(false);
        setDataChanged(true);
        setIsBarcodeScanned(true);
      });
  };

  const Create = (data) => {
    setLoading(true);
    let obj = {
      Company: data.Company,
      Points: parseInt(data.Points),
      Logo: data.Logo,
    };
    //check if data exist and updates points
    // else created new one in DB
    const checkData = isExist(obj);
    if (checkData.Company !== undefined) {
      Update2(obj.Company, obj.Points, checkData.Points);
      return;
    }
    const myDoc = doc(db, "users", user.uid, "companies", data.Company);
    setDoc(myDoc, obj)
      .then(() => {
        userData.push(obj);
        setDataChanged(true);
        setuserData(userData);
      })
      .catch(() => {
        alert("Error!!");
      })
      .finally(() => {
        setIsBarcodeScanned(true);
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

  const Read = () => {
    // setuserData(null);
    while (userData.length > 0) userData.pop();

    setuserData(userData);
    if (!loading) setLoading(true);
    const collect = collection(db, "users", user.uid, "companies");
    getDocs(collect)
      .then((doc) => {
        doc.docs.map((doc) => {
          userData.push(doc.data());
          // setuserData(userData);
        });
        // userData.forEach((data) => console.log(data));
      })
      .catch(() => {
        console.log("ERRORRR READING DATA!");
      })
      .finally(() => {
        setuserData(userData);
        // console.log(userData.length);
        setDataChanged(false);
        setLoading(false);
        setLogged(false);
      });
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

  const Delete = (Company) => {
    setLoading(true);
    deleteDoc(doc(db, "users", user.uid, "companies", Company))
      .then(() => {
        const filteredUserData = userData.filter((obj) => {
          obj.Company != Company;
        });
        setuserData(filteredUserData);
        console.log("deleted" + Company + "\n");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setDataChanged(true);
        setIsBarcodeScanned(true);
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
    // setLoading(true);
    setGoogleloading(true);
    await logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          setGoogleloading(false);
          setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
        setLogged(true);
      });
  };

  const memoValue = useMemo(
    () => ({
      user,
      loading,
      error,
      Googleloading,
      signInWithGoogle,
      logout,
      Create,
      Read,
      Update,
      Delete,
      userData,
      setIsBarcodeScanned,
      isBarcodeScanned,
      dataChanged,
      setDataChanged,
      setLogged,
    }),
    [
      user,
      loading,
      error,
      Googleloading,
      isBarcodeScanned,
      userData,
      dataChanged,
      logged,
    ]
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
