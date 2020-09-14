import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCgIjzLqq8XQg8Q11ScvGHutxtJRpFPPxU",
  authDomain: "firegram-b5fdf.firebaseapp.com",
  databaseURL: "https://firegram-b5fdf.firebaseio.com",
  projectId: "firegram-b5fdf",
  storageBucket: "firegram-b5fdf.appspot.com",
  messagingSenderId: "513668343626",
  appId: "1:513668343626:web:5d6ac63194ec626fa103b3",
  measurementId: "G-PB02RRXFDG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();