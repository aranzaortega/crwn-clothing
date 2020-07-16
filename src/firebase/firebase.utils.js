import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDJ5S1xsv--JJc0PjQ3ymhwBM4_0j5cEuo",
    authDomain: "crwn-db-22bd7.firebaseapp.com",
    databaseURL: "https://crwn-db-22bd7.firebaseio.com",
    projectId: "crwn-db-22bd7",
    storageBucket: "crwn-db-22bd7.appspot.com",
    messagingSenderId: "645245062159",
    appId: "1:645245062159:web:618ccbd1799a4aa86b277a",
    measurementId: "G-W269J1TN6P"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch (error){
        console.log('error creating user', error.message)
      }
    }
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;