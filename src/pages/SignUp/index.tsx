import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import useStores from 'stores'
import './styles.css'

const { Title } = Typography

interface SignUpForm {
  email: string
  password: string
  rePassword: string
}

const SignUpPage = () => {
  const { userStore } = useStores()

  const onFinish = (values: SignUpForm) => {
    if (values.password !== values.rePassword) {
      message.error('Паролі не співпадають!')
      return
    }

    userStore.signUp({ email: values.email }, values.password)
  }

  const onFinishFailed = (errorInfo: any) => {}

  return (
    <div className="auth-main-container">
      <div className="auth-main-form-container">
        <Title level={5}>Реєстрація</Title>

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

          <Form.Item
            name="rePassword"
            rules={[{ required: true, message: 'Ви не заповнили поле!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Повторіть пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              loading={userStore.processAuth}
              style={{ marginBottom: 12 }}
            >
              Зареєструватись
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default observer(SignUpPage)
