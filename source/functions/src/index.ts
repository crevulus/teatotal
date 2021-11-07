import admin = require("firebase-admin");
import functions = require("firebase-functions");
import { UserRecord } from "firebase-functions/v1/auth";
import { getBitcoinPrice, getAdviceSlip, getRandomAnimal } from "./callApis";
import { createNewProfileImage } from "./userActions";

admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
const addMessage = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin
      .firestore()
      .collection("messages")
      .add({ original: original });
    // Send back a message that we've successfully written the message
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
  });

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
const makeUppercase = functions
  .region("europe-west1")
  .firestore.document("/messages/{documentId}")
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data().original;

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log("Uppercasing", context.params.documentId, original);

    const uppercase = original.toUpperCase();

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({ uppercase }, { merge: true });
  });

const updateReviews = functions
  .region("europe-west1")
  .firestore.document("/reviews/{documentId}")
  .onUpdate((change, context) => {
    const data = change.after.data();
    console.log(data);
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

const testFunction = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    const original = req.query.string;
    const writeResult = await admin
      .firestore()
      .collection("test")
      .add({ original });
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
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

module.exports = {
  addMessage,
  makeUppercase,
  updateReviews,
  testFunction,
  scheduledFunction,
  createNewUser,
};
