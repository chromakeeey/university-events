import firebase from 'api'
import type { User } from 'Users'

const USERS_KEY = 'users'

export const getUsers = async (): Promise<User[]> => {
  const ref = await firebase.firestore().collection(USERS_KEY).get()

  return ref.docs.map(doc => doc.data() as User)
}

export const updateUser = async (id: string, user: Partial<User>) => {
  const ref = await firebase.firestore().collection(USERS_KEY).doc(id).get()

  if (ref.exists) {
    ref.ref.update({ ...user })
  }
}
