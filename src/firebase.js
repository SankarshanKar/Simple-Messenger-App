import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDEzmnrU39uH3qWmff_9t__RcQhXLjhREY",
  authDomain: "facebook-messenger-clone-e952c.firebaseapp.com",
  projectId: "facebook-messenger-clone-e952c",
  storageBucket: "facebook-messenger-clone-e952c.appspot.com",
  messagingSenderId: "601783956167",
  appId: "1:601783956167:web:0f15590a336fbfb43d44e2",
  measurementId: "G-0XBGC91CBH"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
export default db;