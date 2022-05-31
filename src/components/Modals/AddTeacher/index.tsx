import { Form, Input, Modal } from 'antd'
import { createTeacher } from 'api/user'
import { useTeachers } from 'hooks'
import type { BaseModalProps } from 'Modals'
import { useState } from 'react'
import './styles.css'

interface FormProps {
  surname: string
  name: string
  fathername: string
}

const AddTeacherModal = (props: BaseModalProps) => {
  const { refetch: refetchTeachers } = useTeachers()

  const [form] = Form.useForm<FormProps>()
  const [loading, setLoading] = useState<boolean>(false)

  const onOk = async () => {
    const fields = form.getFieldsValue()
    setLoading(true)

    await createTeacher({ ...fields })
    await refetchTeachers()

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
      </Form>
    </Modal>
  )
}

export default AddTeacherModal
