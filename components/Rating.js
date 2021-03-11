import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Icon } from "react-native-elements";

import AppStyles from "../AppStyles";

export default function Rating({ count }) {
  const emptyStarsCount = 5 - count;
  const emptyStars = Array.from({ length: emptyStarsCount }, () => (
    <Icon name="star-border" size={30} color={AppStyles.colour.primary} />
  ));
  const fullStars = Array.from({ length: count }, () => (
    <Icon name="star" size={30} color={AppStyles.colour.primary} />
  ));
  return (
    <View style={styles.ratingsContainer}>
      {fullStars}
      {emptyStars}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingsContainer: {
    flexDirection: "row",
  },
});
