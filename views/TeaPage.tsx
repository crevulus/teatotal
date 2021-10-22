import React, { ReactNode, useContext } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Linking,
  Button,
} from "react-native";
import AppContext from "../store/createContext.ts";
import { useImageFromFirebase } from "../data/firebase";

export const TeaPage = (): ReactNode => {
  const { chosenTea } = useContext(AppContext);
  const [image] = useImageFromFirebase(chosenTea.logo);
  return (
    <>
      {chosenTea && (
        <SafeAreaView>
          <Text>{chosenTea.name}</Text>
          <Image style={styles.logo} source={{ uri: image }} />
          <Button
            title={`Get some ${chosenTea.name}`}
            onPress={() => Linking.openURL(chosenTea.url)}
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
