import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

import { Icon } from "react-native-elements";
import FadeInView from "../utils/animations/FadeIn";

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
    <SafeAreaView style={styles.ratingsContainer}>
      <FadeInView style={childStyles.ratingsRow}>{fullStars}</FadeInView>
      <FadeInView style="">{emptyStars}</FadeInView>
    </SafeAreaView>
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
  },
});
