import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoWPAvLhY-cyRwd4P0F9nwqEsC7DELMSA",
  authDomain: "clothing-ecommerce-app-408fb.firebaseapp.com",
  projectId: "clothing-ecommerce-app-408fb",
  storageBucket: "clothing-ecommerce-app-408fb.appspot.com",
  messagingSenderId: "103744397199",
  appId: "1:103744397199:web:c7076e3031c7db1bdc35fa",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const createUserProfile = async (user, additionalData) => {
  if (!user) {
    return;
  }
  const documentRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await documentRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = user;
    const createdAt = new Date();
    try {
      await documentRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  // console.log(snapshot.data());
  return documentRef;
};
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const docRef = collectionRef.doc();
    batch.set(docRef, obj);
  });
  return await batch.commit();
};

export default firebase;
