// import { View, Text, Linking } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

const CompanyCard = ({ data }) => {
  const { item } = data;
  return (
    <Card>
      <Card.Title
        title={item.Company}
        subtitle={"Points or SOMETHINF ELSE in future"}
      />
      <Card.Cover
        source={{
          uri: item.LOGO,
        }}
      />
    </Card>
  );
};

export default CompanyCard;
