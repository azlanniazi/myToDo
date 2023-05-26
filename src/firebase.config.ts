// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  doc,
  collection,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcb3aBk6PI0wIP9WPBxsuyot74Vs6g3zc",
  authDomain: "my-todo-e3606.firebaseapp.com",
  projectId: "my-todo-e3606",
  storageBucket: "my-todo-e3606.appspot.com",
  messagingSenderId: "289278191635",
  appId: "1:289278191635:web:a4f6d6910cab63659a37e6",
};

// Function to update completed field to false for all documents in the collection
async function updateCompletedField() {
  const collectionRef = collection(db, "tasks");

  const querySnapshot = await getDocs(collectionRef);

  querySnapshot.forEach((docSnap) => {
    updateDoc(doc(db, "tasks", docSnap.id), { completed: false });
  });
}

// Define the scheduled task
const scheduledTask = async () => {
  try {
    await updateCompletedField();
    console.log("completed field updated successfully");
  } catch (error) {
    console.error("Error updating completed field:", error);
  }
};

// Calculate the time for the next 12 am
const now = new Date();
const nextMidnight = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 1,
  0,
  0,
  0
);
const delay = nextMidnight.getTime() - now.getTime();

// Wait until the next 12 am and then execute the scheduled task
setTimeout(async () => {
  await scheduledTask();
}, delay);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
