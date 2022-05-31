import {
  ExclamationCircleOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Layout, Menu, Modal, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useStore from 'stores'
import './styles.css'

const { Header, Content, Sider } = Layout
const { Title } = Typography

const Sidebar: FC<object> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { userStore } = useStore()

  const [collapsed, setCollapsed] = useState<boolean>(false)

  const onCollapse = (state: boolean) => {
    setCollapsed(state)
  }

  const onClickMenuItem = (key: string) => {
    navigate(key)
  }

  const onClickSignOut = () => {
    Modal.confirm({
      title: 'Пітвердження',
      icon: <ExclamationCircleOutlined />,
      content: 'Ви дійсно хочете вийти з аккаунту?',
      okText: 'Так',
      cancelText: 'Ні',
      onOk: () => userStore.signOut(),
    })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, paddingLeft: 15 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Avatar>
            {userStore.user?.email[0]?.toLocaleUpperCase() ?? 'E'}
          </Avatar>
          <div style={{ color: 'white', marginLeft: 7 }}>
            {userStore.user?.email}
          </div>

          <div style={{ marginLeft: 'auto', marginRight: 5 }}>
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={<LogoutOutlined style={{ color: 'white' }} />}
              onClick={onClickSignOut}
            />
          </div>
        </div>
      </Header>
      <Layout>
        <Sider theme="light" collapsible {...{ collapsed, onCollapse }}>
          <Menu
            theme="light"
            selectedKeys={[location.pathname.split('/')[1]]}
            mode="inline"
            onClick={props => onClickMenuItem(props.key)}
          >
            <Menu.Item key="home" icon={<PieChartOutlined />}>
              Дашборд
            </Menu.Item>
            <Menu.Item key="students" icon={<UserOutlined />}>
              Студенти
            </Menu.Item>
            <Menu.Item key="teachers" icon={<TeamOutlined />}>
              Працівники
            </Menu.Item>
            {userStore.user?.role === 'ADMIN' && (
              <Menu.Item key="admin" icon={<SettingOutlined />}>
                Адміністрування
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(Sidebar)
