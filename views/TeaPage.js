// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Linking,
  Button,
} from "react-native";

const TeaPage = (props) => {
  return (
    <>
      {teaData && (
        <SafeAreaView>
          <Text>{teaData.name}</Text>
          <Image style={styles.logo} source={{ uri: teaData.logo }} />
          <Button
            title={`Get some ${teaData.name}`}
            onPress={() => Linking.openURL(teaData.url)}
          />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
});

export default TeaPage;
