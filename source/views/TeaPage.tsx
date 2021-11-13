import { getAuth } from "@firebase/auth";
import {
  arrayUnion,
  doc,
  getFirestore,
  getDoc,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { HStack, useToast } from "native-base";
import React, { ReactNode, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Linking,
  Button,
} from "react-native";
import { SimpleButton } from "../components/atoms/Button";
import { useImageFromFirebase } from "../data/firebase";
import { useTeaSettingsContext } from "../store/createContext";
import { checkUserAlreadyActed } from "../utils/checkUser";

const db = getFirestore();
const auth = getAuth();

// TODO: Add disabling for button when use has already voted.

export const TeaPage = (): ReactNode => {
  const { state } = useTeaSettingsContext();
  const [teaRating, setTeaRating] = useState(state.chosenTea.rating);
  const [image] = useImageFromFirebase(state.chosenTea.logo);
  const alreadyVotedToast = useToast();

  const handleRateTea = async () => {
    // get data
    const docRef = doc(db, "reviews", state.chosenTea.adminId);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      // add a new doc if non-existent
      await setDoc(doc(db, "reviews", state.chosenTea.adminId), {
        userReviews: [],
        rating: teaRating,
        reviewCount: 1,
      });
    } else {
      // if exists, check for a) whether there are user reviews and b) whether the user has already voted
      const hasVoted =
        docSnapshot.data().userReviews.length > 0 &&
        checkUserAlreadyActed(
          auth.currentUser.uid,
          docSnapshot.data().userReviews,
          "userId"
        );
      if (hasVoted) {
        alreadyVotedToast.show({ description: "Can't vote more than once." });
        return;
      }
    }
    // if allowed, add the user rating
    await updateDoc(docRef, {
      userReviews: arrayUnion({
        userId: auth.currentUser.uid,
        userRating: teaRating,
      }),
    });
  };

  return (
    <>
      {state.chosenTea && (
        <SafeAreaView>
          <Text>{state.chosenTea.name}</Text>
          <Image style={styles.logo} source={{ uri: image }} />
          <HStack>
            <SimpleButton
              variant="icon"
              iconName="remove"
              onPress={() => setTeaRating(teaRating - 1)}
            />
            <Text>{teaRating}</Text>
            <SimpleButton
              variant="icon"
              iconName="add"
              onPress={() => setTeaRating(teaRating + 1)}
            />
          </HStack>
          <SimpleButton onPress={handleRateTea}>Rate Tea</SimpleButton>
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
