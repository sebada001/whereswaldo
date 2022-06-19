import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyATHynYU_KHmktdF4syjj4d5xQC2NFfJ1w",
  authDomain: "where-s-waldo-56d03.firebaseapp.com",
  projectId: "where-s-waldo-56d03",
  storageBucket: "where-s-waldo-56d03.appspot.com",
  messagingSenderId: "1005997577717",
  appId: "1:1005997577717:web:05b734325ebfd78ab8bcbc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCoords(db) {
  const coordCollection = collection(db, "coords");
  const coordSnap = await getDocs(coordCollection);
  const coordList = coordSnap.docs.map(function (doc) {
    return {
      name: doc.id,
      coordinates: doc.data().coords,
    };
  });
  return coordList;
}
export { getCoords, db };
