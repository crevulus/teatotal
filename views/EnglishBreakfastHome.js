import React, { useState, useContext } from "react";
import { View } from "native-base";

import TeaCard from "../components/TeaCard";

import StrengthSlider from "../components/StrengthSlider";
import AppContext from "../data/createContext";

import { AdMobBanner } from "expo-ads-admob";
import { ScrollView } from "react-native-gesture-handler";

export const EnglishBreakfastHome = () => {
  const { teas, setDesiredStrength } = useContext(AppContext);

  const handleChildSliderChange = (value) => {
    setDesiredStrength(value);
  };

  return (
    <>
      <View maxWidth="100%">
        <ScrollView>
          {teas.length > 0 &&
            teas.map((teaObj) => (
              <TeaCard id={teaObj.id} teaData={teaObj.data} key={teaObj.id} />
            ))}
        </ScrollView>
        <StrengthSlider handleChildSliderChange={handleChildSliderChange} />
      </View>
      <View>
        <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          servePersonalizedAds
        />
      </View>
    </>
  );
};
