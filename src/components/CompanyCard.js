// import { View, Text, Linking } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

const CompanyCard = ({ data }) => {
  const { item } = data;
  return (
    <Card>
      <Card.Title title={item.Company} subtitle={item.Points} />
      <Card.Cover
        source={{
          uri: item.Logo,
        }}
      />
    </Card>
  );
};

export default CompanyCard;
