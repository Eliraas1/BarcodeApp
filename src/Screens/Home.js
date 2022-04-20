import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import useAuth from "../useAuth";
import Loading from "../Loading";
// import AnimatedSplash from "react-native-animated-splash-screen";
// import {} from "../../Firebase/firebase";
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BarCode from "../components/BarCode";
import { AppBar, IconButton, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import CompanyCard from "../components/CompanyCard";
import Background from "../components/Background";

const Home = () => {
  const { loading, logout, Create, Read, Delete } = useAuth();

  //STATES FOR BARCODE
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const [barCodeData, setBarCodeData] = useState([]);

  const handleAdd = () => {
    setIsBarcodeScanned(true);
  };

  const HandleBarcodeScan = () => {
    return (
      <BarCode
        setIsBarcodeScanned={setIsBarcodeScanned}
        barCodeData={barCodeData}
        setBarCodeData={setBarCodeData}
      />
    );
  };

  const renderCards = ({ item }) => {
    return <CompanyCard data={{ item }} />;
  };

  const renderItems = () => (
    // <SafeAreaView>
    <Background>
      <SafeAreaView
        style={{
          paddingHorizontal: 30,
          flex: 1,
          width: "100%",
          // backgroundColor: "black",
        }}
      >
        <FlatList
          data={barCodeData}
          renderItem={renderCards}
          keyExtractor={(item) => item.Company}
        />
      </SafeAreaView>
    </Background>
    // </SafeAreaView>
  );

  if (loading) return <Loading />;

  return isBarcodeScanned ? (
    HandleBarcodeScan()
  ) : (
    <View style={styles.container}>
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

      {!isBarcodeScanned ? renderItems() : null}

      <AppBar
        variant="bottom"
        leading={(props) => (
          <IconButton
            icon={(props) => <Icon name="menu" {...props} />}
            {...props}
          />
        )}
        trailing={(props) => (
          <IconButton
            icon={(props) => <Icon name="magnify" {...props} />}
            {...props}
          />
        )}
        style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
      >
        <FAB
          onPress={() => handleAdd()}
          icon={(props) => <Icon name="plus" {...props} />}
          style={{ position: "absolute", top: -28, alignSelf: "center" }}
        />
      </AppBar>
    </View>
  );
  {
    /* <Button title="logout" onPress={logout} />
  <Button title="Create" onPress={Create} />
  <Button title="Read" onPress={Read} />
  <Button title="Delete" onPress={Delete} />
  <Button
    title="Update"
    onPress={() => {
      Update(true);
    }}
  /> */
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
