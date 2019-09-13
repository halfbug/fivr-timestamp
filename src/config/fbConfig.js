import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyApMPnLXwTWWf0_8mAscBYr4LwquJ5F618",
    authDomain: "timestamp-d5284.firebaseapp.com",
    databaseURL: "https://timestamp-d5284.firebaseio.com",
    projectId: "timestamp-d5284",
    storageBucket: "timestamp-d5284.appspot.com",
    messagingSenderId: "305355539380"
  };
  firebase.initializeApp(config);

  firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 