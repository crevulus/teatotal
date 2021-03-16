import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Icon } from "react-native-elements";
import FadeInView from "./animations/FadeIn";

import AppStyles from "../AppStyles";

export default function Rating({ count }) {
  const emptyStarsCount = 5 - count;
  const emptyStars = Array.from({ length: emptyStarsCount }, (_, i) => (
    <Icon
      name="star-border"
      size={30}
      color={AppStyles.colour.primary}
      key={i}
    />
  ));
  const fullStars = Array.from({ length: count }, (_, i) => (
    <Icon name="star" size={30} color={AppStyles.colour.primary} key={i} />
  ));
  return (
    <View style={styles.ratingsContainer}>
      <FadeInView style={childStyles.ratingsRow}>{fullStars}</FadeInView>
      <FadeInView style="">{emptyStars}</FadeInView>
    </View>
  );
}

const childStyles = {
  ratingsRow: {
    flexDirection: "row",
  },
};

const styles = StyleSheet.create({
  ratingsContainer: {
    flexDirection: "row",
    color: "red",
  },
  test: {
    color: "red",
  },
});
