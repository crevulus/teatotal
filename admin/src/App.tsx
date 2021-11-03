import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
  RAFirebaseOptions,
} from "react-admin-firebase";

import { BlackteaEdit } from "./components/BlackTea/BlackteaEdit";
import { BlackteaList } from "./components/BlackTea/BlackteaList";

import firebaseConfig from "./firebaseConfig.js";
import CustomLoginPage from "./components/CustomLoginPage";

const options: RAFirebaseOptions = {
  logging: true,
  watch: ["blackTeas", "users", "reviews"],
};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authBase: any = FirebaseAuthProvider(firebaseConfig, options);

const authProvider = {
  ...authBase,
  login: async (params: any) => {
    const user = await authProvider.login(params);
    // getPermissions is how when get the custom claims for the logged in user
    const claims = await authProvider.getPermissions();
    const isAdmin = Array.isArray(claims) && claims.includes("admin");
    if (isAdmin) {
      return user;
    }
    // Make sure user is logged out, if not an admin
    await authProvider.logout();
    throw new Error("Login error, invalid permissions");
  },
  getPermissions: async (params: any) => {
    console.log(await authProvider.login(params));
  },
};

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={CustomLoginPage}
    >
      <Resource name="blackTeas" list={BlackteaList} edit={BlackteaEdit} />
      <Resource name="users" list={ListGuesser} />
      <Resource name="reviews" list={ListGuesser} />
    </Admin>
  );
}

export default App;
