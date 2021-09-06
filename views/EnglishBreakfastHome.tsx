import React, { useContext, ReactNode } from "react";
import { View, Center, ScrollView } from "native-base";

import TeaCard from "../components/TeaCard";

import StrengthSlider from "../components/StrengthSlider";
import AppContext from "../data/createContext";

import { AdMobBanner } from "expo-ads-admob";

export const EnglishBreakfastHome = (): ReactNode => {
  const { teas } = useContext(AppContext);

  return (
    <View flex={1} bg="secondary.500">
      <ScrollView>
        <Center>
          {teas.length > 0 &&
            teas.map((teaObj) => (
              <TeaCard id={teaObj.id} teaData={teaObj.data} key={teaObj.id} />
            ))}
        </Center>
      </ScrollView>

      <View width="100%">
        <Center width="100%">
          <StrengthSlider />
        </Center>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          servePersonalizedAds
        />
      </View>
    </View>
  );
};
