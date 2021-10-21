import React, { ReactNode } from "react";
import { View, Center } from "native-base";
import { AdMobBanner } from "expo-ads-admob";

import StrengthSlider from "../components/StrengthSlider";
import { Tabs } from "../components/layout/Tabs";
import { EnglishBreakfastHome } from "./EnglishBreakfastHome";

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

export const Home = (): ReactNode => {
  const scenes = [
    {
      key: "first",
      component: EnglishBreakfastHome,
    },
    {
      key: "second",
      component: SecondRoute,
    },
  ];

  return (
    <View flex={1}>
      <Tabs scenes={scenes} />
      <View width="100%" minH={50}>
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
