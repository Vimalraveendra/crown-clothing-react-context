import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBEUP3iZjtTMkcmDsRjw3YR0S2TpmEHKWM",
  authDomain: "crownclothing-db-7209d.firebaseapp.com",
  projectId: "crownclothing-db-7209d",
  storageBucket: "crownclothing-db-7209d.appspot.com",
  messagingSenderId: "574703359657",
  appId: "1:574703359657:web:9e210460adec2ccb1fbbb8",
  measurementId: "G-Q5FJ9TTRZS"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
