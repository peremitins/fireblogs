import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1vkrcDk5IqtxLJoaG3KB2fsi7RmVptK4",
  authDomain: "vue-blogs-52e76.firebaseapp.com",
  projectId: "vue-blogs-52e76",
  storageBucket: "vue-blogs-52e76.appspot.com",
  messagingSenderId: "725765587765",
  appId: "1:725765587765:web:4749326d2b32c5f4c7427c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();