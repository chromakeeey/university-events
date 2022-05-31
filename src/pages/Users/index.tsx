import { Typography } from 'antd'
import { UsersTable } from 'components'
import { useUsers } from 'hooks'
import { observer } from 'mobx-react-lite'
import './styles.css'

const { Title } = Typography

const UsersPage = () => {
  const { data: users } = useUsers()

  return (
    <div className="teachers-page-container">
      <div className="teachers-page-header">
        <Title>Адміністрування</Title>
      </div>

      <UsersTable users={users} />
    </div>
  )
}

export default observer(UsersPage)
