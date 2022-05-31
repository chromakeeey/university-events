import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import useStores from 'stores'
import './styles.css'

const { Title } = Typography

interface AuthForm {
  email: string
  password: string
}

const AuthPage = () => {
  const { userStore } = useStores()

  const navigate = useNavigate()

  const onFinish = (values: AuthForm) => {
    userStore.signIn(values.email, values.password)
  }

  const onFinishFailed = (errorInfo: any) => {}

  return (
    <div className="auth-main-container">
      <div className="auth-main-form-container">
        <Title level={5}>Авторизація</Title>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Ви не заповнили поле!' }]}
          >
            <Input
              type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Пошта"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Ви не заповнили поле!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{ marginBottom: 12 }}
              loading={userStore.processAuth}
            >
              Авторизуватись
            </Button>

            <Button
              type="dashed"
              block
              loading={userStore.processAuth}
              onClick={() => navigate('/sign-up')}
            >
              Зареєструватись
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default observer(AuthPage)
