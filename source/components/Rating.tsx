import React, { ReactNode } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";

import FadeInView from "../utils/animations/FadeIn.tsx";

type RatingPropType = {
  count: number;
};

export default function Rating({ count }: RatingPropType): ReactNode {
  const emptyStarsCount = 5 - count;
  const emptyStars = Array.from({ length: emptyStarsCount }, (_, i) => (
    <Icon name="star-border" color="#155e75" size={30} key={i} />
  ));

  const fullStars = Array.from({ length: count }, (_, i) => (
    <Icon name="star" color="#155e75" size={30} key={i} />
  ));

  return (
    <SafeAreaView style={styles.ratingsContainer}>
      <FadeInView style={childStyles.ratingsRow}>{fullStars}</FadeInView>
      <FadeInView style={childStyles.ratingsRow}>{emptyStars}</FadeInView>
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
