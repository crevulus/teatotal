import React, { ReactNode } from "react";
import { View, Center, Box, Pressable } from "native-base";
import { useWindowDimensions, Animated } from "react-native";
import { TabView, SceneMap, TabViewProps } from "react-native-tab-view";
import { AdMobBanner } from "expo-ads-admob";

import StrengthSlider from "../components/StrengthSlider";
import { EnglishBreakfastHome } from "./EnglishBreakfastHome";
import { theme } from "../theme";

const FirstRoute = () => <EnglishBreakfastHome />;

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export const Home = (): ReactNode => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Black" },
    { key: "second", title: "Herbal" },
  ]);

  const renderTabBar = ({ navigationState, position }: TabViewProps) => {
    const inputRange = navigationState.routes.map((_, i) => i);
    return (
      <Box flexDirection="row" style={{ backgroundColor: "#ecfeff" }}>
        {navigationState.routes.map((route, i) => {
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <Box
              bg={theme.secondary}
              key={navigationState.key}
              flex={1}
              alignItems="center"
              p={2}
              cursor="pointer"
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text style={{ opacity, color: "white" }} bold>
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <View flex={1}>
      <TabView
        style={{ flexBasis: 0 }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

      <View width="100%" minH={100}>
        <Center width="100%">
          <StrengthSlider />
        </Center>
        <AdMobBanner
          bannerSize="Banner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          servePersonalizedAds
        />
      </View>
    </View>
  );
};
