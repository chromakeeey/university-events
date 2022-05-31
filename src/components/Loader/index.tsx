import { LoadingOutlined } from '@ant-design/icons'

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <LoadingOutlined style={{ fontSize: 100, color: 'blue' }} />
    </div>
  )
}

export default Loader
