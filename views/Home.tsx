import React, { useContext, ReactNode } from "react";
import { View, Center } from "native-base";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { AdMobBanner } from "expo-ads-admob";

import StrengthSlider from "../components/StrengthSlider";
import AppContext from "../data/createContext";
import { EnglishBreakfastHome } from "./EnglishBreakfastHome";

const FirstRoute = () => <EnglishBreakfastHome />;

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export const Home = (): ReactNode => {
  const { teas } = useContext(AppContext);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Black" },
    { key: "second", title: "Herbal" },
  ]);

  return (
    <View flex={1} bg="secondary.500">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

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
