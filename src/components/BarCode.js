import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import useAuth from "../useAuth";

const BarCode = (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const { Create } = useAuth();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanner = ({ data }) => {
    setScanData(data);
    const scannedData = JSON.parse(data);
    console.log(scannedData);
    if (!isDataExist(scannedData)) {
      props.barCodeData.push(scannedData);
      props.setBarCodeData(props.barCodeData);
      Create(scannedData);
    }
    // const j = JSON.stringify(scannedData);
    // console.log(scannedData);
    props.setIsBarcodeScanned(false);
  };

  const isDataExist = (data) => {
    const size = props.barCodeData?.filter((obj) => {
      return obj["Company"] === data["Company"];
    }).length;

    return size > 0;
  };

  if (!hasPermission) {
    return (
      <View>
        <Text>no camera permission</Text>
      </View>
    );
  }

  return (
    <BarCodeScanner
      style={{ height: "100%", width: "100%" }}
      onBarCodeScanned={scanData ? undefined : handleBarCodeScanner}
    />
  );
};

export default BarCode;
