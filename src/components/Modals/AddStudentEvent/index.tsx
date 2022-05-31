import { DatePicker, Form, Input, Modal, Select } from 'antd'
import { createStudentEvent } from 'api/user'
import { STUDENT_EVENT_NAMES } from 'constants/events'
import type { StudentEventType } from 'Events'
import { useStudents } from 'hooks'
import type { BaseModalProps } from 'Modals'
import moment from 'moment'
import { useState } from 'react'
// @ts-ignore
import uuid from 'react-uuid'
import './styles.css'

const { RangePicker } = DatePicker

interface FormProps {
  type: StudentEventType
  duration: moment.Moment[]
  description: string
  comment: string
  mark: string
}

interface ModalProps extends BaseModalProps {
  studentId: string
}

const AddStudentEventModal = (props: ModalProps) => {
  const { refetch: refetchStudents } = useStudents()

  const [form] = Form.useForm<FormProps>()
  const [loading, setLoading] = useState<boolean>(false)

  const onOk = async () => {
    const response = await form.validateFields()

    const fields = form.getFieldsValue()
    setLoading(true)

    await createStudentEvent(props.studentId, {
      id: uuid(),
      ...fields,
      duration: {
        startDate: fields.duration[0].toDate(),
        endDate: fields.duration[1].toDate(),
      },
    })

    await refetchStudents()

    setLoading(false)

    if (props.onSuccess) {
      props.onSuccess()
    }
  }

  return (
    <Modal
      visible={props.visible}
      onOk={onOk}
      onCancel={() => {
        if (props.onCancel) {
          props.onCancel()
        }
      }}
      confirmLoading={loading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Тип події"
          name="type"
          rules={[{ required: true, message: 'Ви не заповнили поле!' }]}
        >
          <Select>
            {Object.entries(STUDENT_EVENT_NAMES).map(([key, value]) => (
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
        <Form.Item
          label="Оцінка"
          name="mark"
          rules={[{ required: true, message: 'Ви не заповнили поле!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddStudentEventModal
