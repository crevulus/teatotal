import React from "react";
import {
  Admin,
  Resource,
  ReferenceField,
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
} from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
  RAFirebaseOptions,
} from "react-admin-firebase";

import { BlackteaEdit } from "./components/BlackTea/BlackteaEdit";
import { BlackteaList } from "./components/BlackTea/BlackteaList";
import { ReviewList } from "./components/Reviews/ReviewList";

import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig.js";

firebase.initializeApp(firebaseConfig);

const options: RAFirebaseOptions = {
  logging: true,
  watch: ["blackTeas", "users", "reviews", "admins"],
};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, options);

const AdminsList = (props: any) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <EmailField source="email" />
      </Datagrid>
    </List>
  );
};

export const UserList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <ReferenceField source="id" reference="admins">
        <TextField source="id" />
      </ReferenceField>
      <TextField source="displayName" />
      <TextField source="role" />
      <DateField source="createdAt" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="users" list={UserList} />
      <Resource name="admins" list={AdminsList} />
      <Resource name="blackTeas" list={BlackteaList} edit={BlackteaEdit} />
      <Resource name="reviews" list={ReviewList} />
    </Admin>
  );
}

export default App;
