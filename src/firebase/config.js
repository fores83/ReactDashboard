import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAm7CH8fpgkePenJMeIPcqUCvTIduyQJak",
  authDomain: "reactlogin-11d62.firebaseapp.com",
  databaseURL: "https://reactlogin-11d62.firebaseio.com",
  projectId: "reactlogin-11d62",
  storageBucket: "reactlogin-11d62.appspot.com",
  messagingSenderId: "649842772238",
  appId: "1:649842772238:web:972aee5cda725718"
};
firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);
