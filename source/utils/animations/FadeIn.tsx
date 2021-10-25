import React, { useRef, useEffect, ReactNode } from "react";
import { Animated, StyleProp } from "react-native";

type FadeInPropType = {
  children: ReactNode;
  style: StyleProp;
};

const FadeInView = ({ children, style }: FadeInPropType): ReactNode => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...style, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
