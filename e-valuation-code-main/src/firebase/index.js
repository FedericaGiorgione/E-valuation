import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCc-2ZvN38GDL6MsL5BmMNsAZrP-gYPSwY",
  authDomain: "e-valuation-10a54.firebaseapp.com",
  projectId: "e-valuation-10a54",
  storageBucket: "e-valuation-10a54.appspot.com",
  messagingSenderId: "855993987232",
  appId: "1:855993987232:web:c2147a7e7975e4323b59c5"
})

const storage = firebase.storage()
const firestore = firebase.firestore()

export {storage, firestore, firebase as default}
