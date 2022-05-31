import { Form, Input, Modal } from 'antd'
import { createStudent } from 'api/user'
import { useStudents } from 'hooks'
import type { BaseModalProps } from 'Modals'
import { useState } from 'react'
import './styles.css'

interface FormProps {
  surname: string
  name: string
  fathername: string
  group: string
}

const AddStudentModal = (props: BaseModalProps) => {
  const { refetch: refetchtudents } = useStudents()

  const [form] = Form.useForm<FormProps>()
  const [loading, setLoading] = useState<boolean>(false)

  const onOk = async () => {
    const fields = form.getFieldsValue()
    setLoading(true)

    await createStudent({ ...fields })
    await refetchtudents()

    setLoading(false)

    if (props.onSuccess) {
      props.onSuccess()
    }
  }

  return (
    <Modal
      visible={props.visible}
      onOk={onOk}
      onCancel={props.onCancel}
      confirmLoading={loading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Прізвище" name="surname">
          <Input />
        </Form.Item>
        <Form.Item label="Імʼя" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="По-батькові" name="fathername">
          <Input />
        </Form.Item>
        <Form.Item label="Номер групи" name="group">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddStudentModal
