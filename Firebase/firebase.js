import { getApps, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkE0L3ZPEzKtJ9ssNmokmVm4dv5fXeMqA",
  authDomain: "barcodeapp-a6a63.firebaseapp.com",
  projectId: "barcodeapp-a6a63",
  storageBucket: "barcodeapp-a6a63.appspot.com",
  messagingSenderId: "49149816867",
  appId: "1:49149816867:web:3b9bd5eecaea4b20aac196",
};

// Initialize Firebase
let app;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  // Initialize other firebase products here
} else {
  app = getApps();
}
// const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword };
