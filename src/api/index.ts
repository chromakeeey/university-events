import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCnEqnj1nz2M_4Wl3Gi_iWlxOOwhZjdqgY',
  authDomain: 'universityevents-0372.firebaseapp.com',
  projectId: 'universityevents-0372',
  storageBucket: 'universityevents-0372.appspot.com',
  messagingSenderId: '770359855791',
  appId: '1:770359855791:web:d958fe23195448feb0225a',
  measurementId: 'G-5CT164L223',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export default firebase
