import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDAl5jrHdaoUZ9Tkt-8V3GdN5VQiuWExGY",
    authDomain: "crwn-db-aaa5a.firebaseapp.com",
    projectId: "crwn-db-aaa5a",
    storageBucket: "crwn-db-aaa5a.appspot.com",
    messagingSenderId: "1019432472843",
    appId: "1:1019432472843:web:92a74a54c2ae9ef3ca520e",
    measurementId: "G-7PRM3HG52E"
    };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapShot = await userRef.get();

if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        })
    } catch (error) {
        console.log('error creating user', error.message);
    }
}

return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;