import React, { useContext, ReactNode } from "react";
import { View } from "native-base";

import TeaCard from "../components/TeaCard";

import StrengthSlider from "../components/StrengthSlider";
import AppContext from "../data/createContext";

import { AdMobBanner } from "expo-ads-admob";
import { ScrollView } from "react-native-gesture-handler";

export const EnglishBreakfastHome = (): ReactNode => {
  const { teas, setDesiredStrength } = useContext(AppContext);

  const handleChildSliderChange = (value) => {
    setDesiredStrength(value);
  };

  return (
    <View flex={1}>
      <ScrollView maxWidth="100%">
        {teas.length > 0 &&
          teas.map((teaObj) => (
            <TeaCard id={teaObj.id} teaData={teaObj.data} key={teaObj.id} />
          ))}
      </ScrollView>
      <View width="100%">
        <StrengthSlider handleChildSliderChange={handleChildSliderChange} />
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          servePersonalizedAds
        />
      </View>
    </View>
  );
};
