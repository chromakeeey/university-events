import { DatePicker, Form, Input, Modal, Select } from 'antd'
import { createTeacherEvent } from 'api/user'
import { TEACHER_EVENT_NAMES } from 'constants/events'
import type { TeacherEventType } from 'Events'
import { useTeachers } from 'hooks'
import type { BaseModalProps } from 'Modals'
import moment from 'moment'
import { useState } from 'react'
// @ts-ignore
import uuid from 'react-uuid'
import './styles.css'

// interface TeacherEvent {
//   type: TeacherEventType
//   duration: Duration
//   description: string
//   comment: string
// }

const { RangePicker } = DatePicker

interface FormProps {
  type: TeacherEventType
  duration: moment.Moment[]
  description: string
  comment: string
}

interface ModalProps extends BaseModalProps {
  teacherId: string
}

const AddTeacherEventModal = (props: ModalProps) => {
  const { refetch: refetchTeachers } = useTeachers()

  const [form] = Form.useForm<FormProps>()
  const [loading, setLoading] = useState<boolean>(false)

  const onOk = async () => {
    const response = await form.validateFields()

    // if (response.)

    const fields = form.getFieldsValue()
    setLoading(true)

    await createTeacherEvent(props.teacherId, {
      id: uuid(),
      ...fields,
      duration: {
        startDate: fields.duration[0].toDate(),
        endDate: fields.duration[1].toDate(),
      },
    })

    await refetchTeachers()

    setLoading(false)
    form.resetFields()

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
        <Form.Item
          label="Тип події"
          name="type"
          rules={[{ required: true, message: 'Ви не заповнили поле!' }]}
        >
          <Select>
            {Object.entries(TEACHER_EVENT_NAMES).map(([key, value]) => (
              <Select.Option value={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Тривалість події"
          name="duration"
          rules={[{ required: true, message: 'Ви не заповнили поле!' }]}
        >
          {/* 
          // @ts-ignore */}
          <RangePicker />
        </Form.Item>
        <Form.Item
          label="Коментар"
          name="comment"
          rules={[{ required: true, message: 'Ви не заповнили поле!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Опис"
          name="description"
          rules={[{ required: true, message: 'Ви не заповнили поле!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddTeacherEventModal
