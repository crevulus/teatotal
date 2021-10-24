import React, { ReactNode } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Linking,
  Button,
} from "react-native";
import { useImageFromFirebase } from "../data/firebase";
import { useTeaSettingsContext } from "../store/createContext";

export const TeaPage = (): ReactNode => {
  const { state } = useTeaSettingsContext();
  const [image] = useImageFromFirebase(state.chosenTea.logo);
  return (
    <>
      {state.chosenTea && (
        <SafeAreaView>
          <Text>{state.chosenTea.name}</Text>
          <Image style={styles.logo} source={{ uri: image }} />
          <Button
            title={`Get some ${state.chosenTea.name}`}
            onPress={() => Linking.openURL(state.chosenTea.url)}
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
