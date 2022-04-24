import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Animated,
} from "react-native";
import React, { useState } from "react";
import useAuth from "../useAuth";
import Loading from "../Loading";
import {
  ActivityIndicator,
  Colors,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Modal,
  Title,
} from "react-native-paper";
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import BarCode from "../components/BarCode";
import CompanyCard from "../components/CompanyCard";
import Background from "../components/Background";
import LottieView from "lottie-react-native";
import CARD_HEIGHT from "../components/Card";
const AnimatiedFlatList = Animated.createAnimatedComponent(FlatList);

const Home = ({ navigation }) => {
  const {
    loading,
    logout,
    Read,
    userData,
    isBarcodeScanned,
    setIsBarcodeScanned,
    user,
    dataChanged,
    setDataChanged,
    logged,
  } = useAuth();

  //STATES FOR BARCODE
  // const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  // const [barCodeData, setBarCodeData] = useState([]);

  const animation = React.useRef(null);
  let initialScrollIndex = userData.length;

  const navigate = () => {
    // console.log(auth);
    navigation.navigate("BarCode", {
      setIsBarcodeScanned: setIsBarcodeScanned,
    });
  };
  const flatList = React.useRef(null);
  const finishAnim = () => {
    if (!loading) {
      console.log(isBarcodeScanned);
      flatList.current.scrollToEnd();

      if (isBarcodeScanned) {
        console.log("second");
        animation.current.play(18, 0);
      }
      setIsBarcodeScanned(false);
    }
  };
  React.useEffect(() => {
    console.log("READDDDDINNNGGGG");
    Read();
  }, [dataChanged, logged]);
  React.useEffect(() => {
    // if (!loading) {
    // Read();
    let timerid = null;
    if (isBarcodeScanned) {
      animation.current.play(0, 18);
      if (userData.length > 0) {
        console.log(isBarcodeScanned);

        flatList.current.scrollToIndex({
          animated: true,
          index: 0,
        });
      }
    }
    // }
    console.log(userData.length);
  }, [isBarcodeScanned]);
  const renderCards = ({ item }) => {
    return <CompanyCard data={{ item }} />;
  };
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  const renderItems = () => {
    if (loading)
      return (
        <View style={styles.fetchingDataIndicator}>
          <ActivityIndicator
            style={styles.fetchingDataIndicator}
            animating={true}
            size={"large"}
            color={Colors.red800}
          />
        </View>
      );
    else
      return (
        <AnimatiedFlatList
          ref={flatList}
          contentContainerStyle={{ justifyContent: "center" }}
          // scrollEventThrottle={5}
          // horizontal
          // inverted={true}
          bounces={false}
          // initialScrollIndex={userData.length - 1}
          // pagingEnabled={true}
          data={userData}
          onContentSizeChange={() => {
            flatList.current.scrollToEnd();
          }}
          renderItem={({ item, index }) => (
            <CompanyCard data={{ item, index, y, setVisible }} />
          )}
          keyExtractor={(item) => item.Company}
          // key={{ index }}
          {...{ onScroll }}
          getItemLayout={(data, index) => ({
            length: 288 + 70,
            offset: 288 * index,
            index,
          })}
        />
      );
  };

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const TransferPointsDialog = () => (
    <Provider>
      <Portal>
        <Modal
          style={styles.dialog}
          visible={visible}
          onDismiss={hideDialog}
          contentContainerStyle={{ alignSelf: "center" }}
        >
          <View>
            <Title>Transfer Points</Title>

            <Paragraph>Are You Sure You Want to Delete Card?</Paragraph>

            <View style={styles.txtContentContainer}>
              <Button
                color="#5F9DA5"
                mode="contained"
                dark={true}
                onPress={hideDialog}
              >
                No
              </Button>
              <Button
                onPress={() => {
                  // Delete(item.Company);
                  setVisible(false);
                }}
              >
                Yes
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );

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
      {/* <Button title="Read" onPress={Read} /> */}
      <View style={styles.cardsContainer}>
        <SafeAreaView style={styles.CardsView}>{renderItems()}</SafeAreaView>
        {TransferPointsDialog()}
      </View>

      <TouchableOpacity style={styles.plusLottie} onPress={() => navigate()}>
        <LottieView
          resizeMode="cover"
          ref={animation}
          source={require("../../assets/lottie/plus.json")}
          autoPlay={false}
          loop={false}
          speed={0.8}
          onAnimationFinish={finishAnim}
        />
      </TouchableOpacity>
    </Background>
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
  cardsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "center",
  },
  CardsView: {
    justifyContent: "flex-start",
    height: "75%",
    // flex: 2,
  },
  plusLottie: {
    width: hp("10.5%"),
    height: hp("10.5%"),
    top: -28,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
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
  fetchingDataIndicator: {
    // flex: 1,
    // height: "200%",

    alignItems: "center",
    justifyContent: "center",
  },
  dialog: {
    // width: widthPercentageToDP("90%"),
    // alignSelf: "center",
    padding: "10%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    borderRadius: 30,
  },
});
