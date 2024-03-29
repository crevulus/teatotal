import React, { ReactNode, useMemo, useState } from "react";
import { Box, Pressable } from "native-base";
import { useWindowDimensions, Animated } from "react-native";
import { TabView, SceneMap, TabViewProps } from "react-native-tab-view";
import { theme } from "../../theme";

type ScenesType = {
  key: string;
  title: string;
  component: () => ReactNode;
};

type TabsProps = {
  scenes: ScenesType[];
  styles: Record<string, unknown>;
};

export const Tabs = ({ scenes, styles }: TabsProps): ReactNode => {
  const layout = useWindowDimensions();

  const renderScenes = useMemo(() =>
    scenes.reduce((map, scene) => {
      map[scene.key] = scene.component;
      return map;
    }, {})
  );

  const renderScene = SceneMap(renderScenes);
  const [index, setIndex] = useState(0);

  const renderTabBar = ({ navigationState, position }: TabViewProps) => {
    const inputRange = navigationState.routes.map((_, i) => i);
    return (
      <Box flexDirection="row">
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
    <TabView
      style={styles}
      navigationState={{ index, routes: scenes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};
