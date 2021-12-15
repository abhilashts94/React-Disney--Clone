import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCDTeRTtK8Fte-Nj8frZsxeqXtN_dpvCzM',
  authDomain: 'disneyplus-clone-49e36.firebaseapp.com',
  projectId: 'disneyplus-clone-49e36',
  storageBucket: 'disneyplus-clone-49e36.appspot.com',
  messagingSenderId: '573524910071',
  appId: '1:573524910071:web:d3219ca32e5dc4ce7758f2',
  measurementId: 'G-7YE77FKB2G',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
var provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

export { auth, provider, storage }
export default db
