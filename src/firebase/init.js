import firebase from 'firebase'
import 'firebase/firestore'

var Config = {
   


  apiKey: "AIzaSyDwugY0Af5qWdxBn2tfLyHfUeb4J8hon1g",
  authDomain: "gwcqp-40547.firebaseapp.com",
  databaseURL: "https://gwcqp-40547.firebaseio.com",
  projectId: "gwcqp-40547",
  storageBucket: "gwcqp-40547.appspot.com",
  messagingSenderId: "571004638366",
  appId: "1:571004638366:web:6028ed37253dfc3164578f",
  measurementId: "G-5EP73N2NY2"

  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(Config);

  export default firebaseApp.firestore()
