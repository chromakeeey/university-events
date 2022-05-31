import { AuthRouter, RootRouter } from 'common/routes'
import { useAuth } from 'hooks'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import useStores from 'stores'
import { StoreProvider } from 'stores/RootStore'
import './App.css'

const queryClient = new QueryClient()

const Root = observer(() => {
  const { userStore } = useStores()

  useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      {userStore.user ? <RootRouter /> : <AuthRouter />}
    </QueryClientProvider>
  )
})

const App = () => {
  return (
    <StoreProvider>
      <Root />
    </StoreProvider>
  )
}

export default App
