import admin = require("firebase-admin");
import functions = require("firebase-functions");
// import * as axios from "axios";

admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions
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
exports.makeUppercase = functions
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

exports.updateReviews = functions
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

exports.testFunction = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    const original = req.query.string;
    const writeResult = await admin
      .firestore()
      .collection("test")
      .add({ original });
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
  });

exports.scheduledFunction = functions
  .region("europe-west1")
  .pubsub.schedule("every 1 mins")
  .onRun((context) => {
    console.log(context);
    console.log(`The time is ${Date.now()}`);
    return null;
  });

// exports.getBitcoinPrice = functions
//   .region("europe-west1")
//   .runWith({ timeoutSeconds: 5 })
//   .https.onRequest(async (req, res) => {
//     const fetchData = async () => {
//       return await axios
//         .get("https://api.coindesk.com/v1/bpi/currentprice.json", {
//           timeout: 2000,
//         })
//         .then((res) => res.json())
//         .catch((error) => console.log(error));
//     };
//     const data = await fetchData();
//     console.log(await data);
//     return null;
//   });
