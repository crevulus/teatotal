import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import { FirebaseDataProvider, RAFirebaseOptions } from "react-admin-firebase";

import firebaseConfig from "./firebaseConfig.js";

const options: RAFirebaseOptions = {
  logging: true,
};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="blackTeas" list={ListGuesser} />
    </Admin>
  );
}

export default App;
