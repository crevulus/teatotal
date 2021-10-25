import { Login, LoginForm } from "react-admin";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "#/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

const SignInScreen = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

const CustomLoginForm = (props: any) => (
  <div>
    <LoginForm {...props} />
    <SignInScreen />
  </div>
);

const CustomLoginPage = (props: any) => (
  <Login {...props}>
    <CustomLoginForm {...props} />
  </Login>
);

export default CustomLoginPage;
