import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc, updateDoc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCT-PkWLCs0XHEv7cZfMt_Dp78tWxAWRpw",
  authDomain: "contact-book-566b4.firebaseapp.com",
  projectId: "contact-book-566b4",
  storageBucket: "contact-book-566b4.firebasestorage.app",
  messagingSenderId: "352367618519",
  appId: "1:352367618519:web:0cd0f438b0ac44e0dc0392",
  measurementId: "G-TDF5S3FFS6"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db, collection, getDocs, doc, deleteDoc, addDoc, updateDoc, getDoc }