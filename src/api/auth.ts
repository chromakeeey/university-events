import firebase from 'api'
import { User } from 'Users'

const COLLECTION_KEY = 'users'

export const getUser = async (id: string): Promise<User | null> => {
  const ref = await firebase
    .firestore()
    .collection(COLLECTION_KEY)
    .doc(id)
    .get()

  if (!ref.exists) {
    return null
  }

  return ref.data()! as User
}

export const createUser = async (user: User) => {
  await firebase.firestore().collection(COLLECTION_KEY).doc(user.id).set(user)
}

export const getUserByEmailAndPassword = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const ref = await firebase
    .firestore()
    .collection(COLLECTION_KEY)
    .where('email', '==', email)
    .where('password', '==', password)
    .get()

  if (!ref.docs.length) {
    return null
  }

  return ref.docs[0].data()! as User
}

export const getUserCreatedState = async (email: string): Promise<boolean> => {
  const ref = await firebase
    .firestore()
    .collection(COLLECTION_KEY)
    .where('email', '==', email)
    .get()

  if (!ref.docs.length) {
    return false
  }

  return true
}
