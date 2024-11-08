import { useEffect, useState } from "react";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDU28sfqPfCGUuU3NXemz-DWKHkVS42J-k",
  authDomain: "pptdesigner-9ccaf.firebaseapp.com",
  projectId: "pptdesigner-9ccaf",
  storageBucket: "pptdesigner-9ccaf.appspot.com",
  messagingSenderId: "519267137891",
  appId: "1:519267137891:web:a2053706e1f9cde1737b56",
  measurementId: "G-DM4R26DTHT",
};

// export const useFirebase = () => {
//   const [firebase, setFirebase] = useState(null);
//   const [storage, setStorage] = useState<FirebaseStorage | any>([]);

//   useEffect(() => {
//     const app = initializeApp(firebaseConfig);
//     const storage = getStorage(app);
//     setFirebase(app);
//     setStorage(storage);
//   }, []);

//   return { firebase, storage };
// };
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);