// @ts-nocheck
import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";

const FadeInView = ({ children, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...style, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
