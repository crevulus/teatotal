import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Container } from "native-base";

import TeaCard from "../components/TeaCard";

import StrengthSlider from "../components/StrengthSlider";
import AppContext from "../data/createContext";

import { AdMobBanner } from "expo-ads-admob";
import { ScrollView } from "react-native-gesture-handler";

export const EnglishBreakfastHome = () => {
  const [teaStrength, setTeaStrength] = useState(0.5);
  const { teas } = useContext(AppContext);

  const handleChildSliderChange = (value) => {
    setTeaStrength(value);
  };

  return (
    <>
      <Container style={styles.container}>
        <ScrollView>
          <Container style={styles.teaCardContainer}>
            {teas.length > 0 &&
              teas.map((teaObj) => (
                <TeaCard
                  id={teaObj.id}
                  teaData={teaObj.data}
                  key={teaObj.id}
                  strength={teaStrength * 2}
                />
              ))}
          </Container>
        </ScrollView>
        <StrengthSlider handleChildSliderChange={handleChildSliderChange} />
      </Container>
      <Container style={styles.adBanner}>
        <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          servePersonalizedAds
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teaCardContainer: {
    alignItems: "center",
    width: "100%",
    padding: "5%",
  },
  adBanner: {
    bottom: 0,
    width: "100%",
  },
});
