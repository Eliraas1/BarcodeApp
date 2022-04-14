import { View, Text } from "react-native";
import React, { useState } from "react";
import * as Google from "expo-google-app-auth";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from "../Firebase/firebase";
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

let error;

// export default signInWithGoogle;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  const signInWithGoogle = async () => {
    await Google.logInAsync(config)
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

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
