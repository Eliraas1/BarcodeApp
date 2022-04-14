import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import schema from "../Schemes/UserScheme";
import ValidErrors from "../ValidErrors";
import { auth, signInWithEmailAndPassword } from "../../Firebase/firebase";
import useAuth from "../useAuth";
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
// import GoogleButton from "react-google-button";
//need to remove from comment!!!!!!!!@@@@@@@@@@@
// import signInWithGoogle from "../useAuth";
import { SocialIcon } from "react-native-elements";

const SignIn = ({ navigation }) => {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState(" ");
  const [isError, setIsError] = useState(false);
  // const signInWithGoogle = () => {
  //   console.log("asd");
  // };
  const navigate = () => {
    console.log(auth);
    navigation.navigate("SignUp");
  };

  const HandleSignIn = (value) => {
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((res) => {
        console.log(`${value.email} is connected succsessfully!`);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        switch (err.code) {
          case "auth/user-not-found":
            setError("Email or Password Incorrect!");
            break;
        }
      });
  };

  return (
    <View style={styles.mainView}>
      <LinearGradient
        colors={["#5a36db", "#3a288e", "rgb(36, 35, 34)"]}
        style={styles.linearGradient}
        locations={[0.1, 0.3, 1]}
      >
        <View style={styles.TopView}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://www.momentumlabs.ai/wp-content/uploads/2021/07/logow.png",
            }}
          />
        </View>
      </LinearGradient>
      <View style={styles.BottomView}>
        <Text style={styles.textStyle}>Welcome Back!</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validateOnMount={true}
          onSubmit={HandleSignIn}
          validationSchema={schema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <View style={styles.FormView}>
              {isError && <ValidErrors error={error} />}
              <TextInput
                name="email"
                placeholder="Email Address*"
                style={styles.TextInput}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                placeholderTextColor={"white"}
              />
              {errors.email && touched.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              <TextInput
                name="password"
                placeholder="Password*"
                style={styles.TextInput}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholderTextColor={"white"}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={styles.errors}>{errors.password}</Text>
              )}
              <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
                <LinearGradient
                  colors={["#845EEE", "#6F45FB", "#7045FD"]}
                  start={[0.1, 0.1]}
                  end={[1, 0.3]}
                  style={styles.GradBtn}
                  locations={[0.1, 0.5, 1]}
                >
                  <Text style={styles.btnText}>Sign in</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <View style={styles.DownButtonsView}>
        <TouchableOpacity style={styles.SignUpBtn} onPress={signInWithGoogle}>
          <LinearGradient
            colors={["#6646DC", "#3E2A97", "#6646DC"]}
            start={[0, 0.1]}
            end={[0.5, 1]}
            style={styles.GradBtn}
            locations={[1, 0.9, 1]}
          >
            <Text style={styles.SignUpText}>Sign In With Google</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SignUpBtn} onPress={navigate}>
          <LinearGradient
            colors={["#6646DC", "#3E2A97", "#6646DC"]}
            start={[0, 0.1]}
            end={[0.5, 1]}
            style={styles.GradBtn}
            locations={[1, 0.9, 1]}
          >
            <Text style={styles.SignUpText}>Sign up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <SocialIcon type="google" />
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
    backgroundColor: "rgb(36, 35, 34)",
  },
  linearGradient: {
    flex: 1,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "transparent",
  },
  GradBtn: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  TopView: {
    width: "100%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  DownButtonsView: {
    width: "70%",
    height: "30%",
    marginTop: 30,
    // flex: 4,
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    justifyContent: "space-between",
  },
  BottomView: {
    width: "100%",
    height: "40%",
    backgroundColor: "rgb(36, 35, 34)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  tinyLogo: {
    width: "60%",
    resizeMode: "contain",
    alignItems: "center",
    height: "120%",
    marginTop: 100,
  },

  textStyle: {
    color: "white",
    fontSize: 30,
    // fontFamily: "Helvetica-BoldOblique",
    // fontWeight: "",
    marginTop: 35,
    justifyContent: "center",
    // alignContent: "center",
    display: "flex",
  },
  TextInput: {
    width: "80%",
    borderColor: "white",
    borderWidth: 1,
    height: "20%",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 25,
    color: "white",
    textAlign: "center",
    // fontFamily: "Helvetica-BoldOblique",
    fontSize: 18,
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  Button: {
    height: "17%",
    width: "80%",
    color: "white",
    // backgroundColor: "rgb(58,40,142)",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  btnText: {
    color: "white",
    // fontWeight: "bold",
    // fontFamily: "Helvetica-BoldOblique",
    fontSize: 18,
  },
  SignUpBtn: {
    flex: 1,
    height: "25%",
    width: "50%",
    color: "white",
    marginTop: 70,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  SignUpText: {
    color: "white",
    // fontFamily: "Helvetica-BoldOblique",
    fontSize: 18,
  },
  errors: {
    fontSize: 12,
    color: "red",
    marginTop: 3,
    fontWeight: "bold",
  },
});

export default SignIn;
