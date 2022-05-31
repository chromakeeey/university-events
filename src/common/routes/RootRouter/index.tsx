import { Loader, Sidebar } from 'components'
import { observer } from 'mobx-react-lite'
import { Home, Student, Students, Teacher, Teachers, Users } from 'pages'
import { Navigate, Route, Routes } from 'react-router-dom'
import useStore from 'stores'

const RootRouter = () => {
  const { userStore } = useStore()

  if (userStore.loading) {
    return <Loader />
  }

  return (
    <Sidebar>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/:id" element={<Teacher />} />
        <Route path="/students/:id" element={<Student />} />
        {userStore.user?.role === 'ADMIN' && (
          <Route path="/admin" element={<Users />} />
        )}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Sidebar>
  )
}

export default observer(RootRouter)
