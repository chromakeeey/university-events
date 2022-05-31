import { message } from 'antd'
import firebase, { auth } from 'api'
import { getUserCreatedState } from 'api/auth'
import { makeAutoObservable } from 'mobx'
import type { RootStore } from 'stores/RootStore'
import { User } from 'Users'

type SignInResponse =
  | 'SUCCESS'
  | 'USER_NOT_FOUND'
  | 'WRONG_PASSWORD'
  | 'OTHER_MESSAGE'

type SignUpResponse = 'SUCCESS' | 'USER_ALREADY_EXISTS' | 'OTHER_MESSAGE'

export default class UserStore {
  rootStore: RootStore
  user: User | null
  loading: boolean
  processAuth: boolean

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.user = null
    this.loading = true
    this.processAuth = false
    makeAutoObservable(this)
  }

  setUser = (user: User | null) => {
    this.user = user
  }

  signOut = async () => {
    auth.signOut()
  }

  signIn = async (email: string, password: string): Promise<SignInResponse> => {
    try {
      this.processAuth = true

      const state = await getUserCreatedState(email)

      if (!state) {
        message.error('Користувач не знайдений!')

        return 'USER_NOT_FOUND'
      }

      await auth.signInWithEmailAndPassword(email, password)

      return 'SUCCESS'
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        message.error('Неправильний пароль!')

        return 'WRONG_PASSWORD'
      }

      message.error('Неправильний пароль!')
      return 'OTHER_MESSAGE'
    } finally {
      this.processAuth = false
    }
  }

  signUp = async (
    user: Omit<User, 'id' | 'role'>,
    password: string,
  ): Promise<SignUpResponse> => {
    try {
      this.processAuth = true

      const state = await getUserCreatedState(user.email)

      if (state) {
        return 'USER_ALREADY_EXISTS'
      }

      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, password)

      if (!response.user) {
        await auth.signOut()
        return 'OTHER_MESSAGE'
      }

      return 'SUCCESS'
    } catch (error: any) {
      return 'OTHER_MESSAGE'
    } finally {
      this.processAuth = false
    }
  }

  setLoading = (state: boolean) => {
    this.loading = state
  }
}
