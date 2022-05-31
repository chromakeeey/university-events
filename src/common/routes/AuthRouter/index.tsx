import { Loader } from 'components'
import { observer } from 'mobx-react-lite'
import { Auth, SignUp } from 'pages'
import { Navigate, Route, Routes } from 'react-router-dom'
import useStore from 'stores'

const AuthRouter = () => {
  const { userStore } = useStore()

  if (userStore.loading) {
    return <Loader />
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  )
}

export default observer(AuthRouter)
