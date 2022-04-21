import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import useAuth from "../useAuth";
import Loading from "../Loading";
// import AnimatedSplash from "react-native-animated-splash-screen";
// import {} from "../../Firebase/firebase";
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import BarCode from "../components/BarCode";
// import { AppBar, IconButton, FAB } from "@react-native-material/core";
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import CompanyCard from "../components/CompanyCard";
import Background from "../components/Background";
import LottieView from "lottie-react-native";

const Home = ({ navigation }) => {
  const {
    loading,
    logout,
    Create,
    Read,
    Delete,
    userData,
    isBarcodeScanned,
    setIsBarcodeScanned,
  } = useAuth();
  // const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);

  const animation = useRef(null);

  useEffect(() => {
    let timerid = null;
    // console.log("\nasdasd\n");
    if (isBarcodeScanned) {
      animation.current.play(0, 18);
      timerid = setTimeout(() => {
        animation.current.play(18, 0);
      }, 1500);
      return () => {
        clearTimeout(timerid);
      };
    }
  }, [isBarcodeScanned]);

  const navigate = () => {
    navigation.navigate("BarCode", {
      setIsBarcodeScanned: setIsBarcodeScanned,
    });
  };

  const renderCards = ({ item }) => {
    return <CompanyCard data={{ item }} />;
  };

  const renderItems = () => (
    <SafeAreaView
      style={{
        paddingHorizontal: 30,
        flex: 1,
        width: "100%",
      }}
    >
      <FlatList
        data={userData}
        renderItem={renderCards}
        keyExtractor={(item) => item.Company}
      />
    </SafeAreaView>
  );

  if (loading) return <Loading />;

  return (
    <Background>
      <TouchableOpacity
        style={{
          width: "100%",
          height: "10%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "tomato",
        }}
        onPress={logout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      <Button title="Read" onPress={Read} />
      {renderItems()}
      <TouchableOpacity style={styles.plusLottie} onPress={() => navigate()}>
        <LottieView
          ref={animation}
          source={require("../../assets/lottie/plus.json")}
          autoPlay={false}
          loop={false}
          speed={0.4}
          onAnimationFinish={() => setIsBarcodeScanned(false)}
        />
      </TouchableOpacity>
      {/* <FAB
        onPress={() => navigate()}
        icon={(props) => <Icon name="plus" {...props} />}
        // color="white"
        style={{
          // position: "absolute",
          top: -28,
          alignSelf: "center",
        }}
      /> */}
    </Background>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plusLottie: {
    width: hp("11.5%"),
    height: hp("11.5%"),
    top: -28,
    alignSelf: "center",
  },
  Navbar: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "flex-end",
    height: hp("10%"),
    width: "100%",
    backgroundColor: "black",
    borderBottomLeftRadius: hp("2.5%"),
    borderBottomRightRadius: hp("2.5%"),
    paddingTop: 15,
  },
  PlusButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: "15%",
    height: "100%",
    borderBottomRightRadius: hp("2.5%"),
    fontSize: hp("5%"),
  },
});
