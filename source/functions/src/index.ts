import admin = require("firebase-admin");
import functions = require("firebase-functions");
import { UserRecord } from "firebase-functions/v1/auth";
import { getBitcoinPrice, getAdviceSlip, getRandomAnimal } from "./callApis";
import { createNewProfileImage } from "./userActions";

admin.initializeApp();

const updateReviews = functions
  .region("europe-west1")
  .firestore.document("/reviews/{documentId}")
  .onUpdate((change, context) => {
    const data = change.after.data();
    const prevData = change.before.data();
    if (data.userReviews.length === prevData.userReviews.length) {
      return null;
    }
    const reviewCount = data.userReviews.length;
    return change.after.ref.set(
      {
        reviewCount,
      },
      { merge: true }
    );
  });

const scheduledFunction = functions
  .region("europe-west1")
  .pubsub.schedule("every day 00:00")
  .onRun(async () => {
    const priceRate = await getBitcoinPrice();
    const advice = await getAdviceSlip();
    const animalImg = await getRandomAnimal();
    const updatedTimestamp = admin.firestore.Timestamp.fromDate(new Date());
    await admin
      .firestore()
      .collection("tea-leaves")
      .doc("daily-data")
      .set({
        time: updatedTimestamp,
        bitcoin: { type: "bitcoin", priceRate },
        advice: { type: "advice", advice },
        animal: { type: "animal", animalImg },
      });
    return null;
  });

const createNewUser = functions
  .region("europe-west1")
  .auth.user()
  .onCreate(async (user: UserRecord) => {
    const svg = createNewProfileImage();
    return await admin.firestore().collection("users").doc(user.uid).set(
      {
        createdAt: admin.firestore.Timestamp.now(),
        profileAvatar: svg,
      },
      { merge: true }
    );
  });

const deleteUser = functions
  .region("europe-west1")
  .auth.user()
  .onDelete(async (user: UserRecord) => {
    return await admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .delete()
      .then(() => console.log("deleted!"))
      .catch((err) => console.log(err));
  });

module.exports = {
  updateReviews,
  scheduledFunction,
  createNewUser,
  deleteUser,
};
