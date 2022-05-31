import React, { createContext, FC, useContext } from 'react'
import UserStore from './UserStore'

export class RootStore {
  userStore: UserStore

  constructor() {
    this.userStore = new UserStore(this)
  }
}

export const StoreContext = createContext(new RootStore())

const store = new RootStore()

export const StoreProvider: FC = ({ children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
export default useStore
