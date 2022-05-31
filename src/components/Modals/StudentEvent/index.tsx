import { Button, Drawer, Typography } from 'antd'
import type { TextProps } from 'antd/lib/typography/Text'
import { saveStudent } from 'api/event'
import { STUDENT_EVENT_NAMES } from 'constants/events'
import { format } from 'date-fns'
import { StudentEvent } from 'Events'
import { useStudents } from 'hooks'
import { observer } from 'mobx-react-lite'
import type { BaseModalProps } from 'Modals'
import { useState } from 'react'
import useStore from 'stores'
import { normalizeFirebaseDate } from 'tools/date'
import { Student } from 'Users'

const { Text } = Typography

export interface StudentEventDrawerProps extends BaseModalProps {
  student: Student
  event: StudentEvent
  index: number
}

interface EditableRowProps extends TextProps {
  title: string
  value: string
  key: keyof Pick<StudentEvent, 'comment' | 'description' | 'mark'>
}

interface TextRowProps extends TextProps {
  title: string
  value: string
}

const StudentEventDrawer = ({
  student,
  event,
  index,
  visible,
  onCancel,
  onSuccess,
}: StudentEventDrawerProps) => {
  const { userStore } = useStore()

  const { refetch: refetchStudents } = useStudents()

  const [editableEvent, setEditableEvent] = useState<
    Pick<StudentEvent, 'comment' | 'description' | 'mark'>
  >({
    comment: event.comment,
    description: event.description,
    mark: event.mark,
  })
  const [saving, setSaving] = useState<boolean>(false)

  const onChangeRow = (
    key: keyof Pick<StudentEvent, 'comment' | 'description' | 'mark'>,
    text: string,
  ) => {
    const ref = { ...editableEvent }
    ref[key] = text

    setEditableEvent(ref)
  }

  const onSave = async () => {
    setSaving(true)

    const events = student.events.filter(e => e.id !== event.id)
    events.push({ ...event, ...editableEvent })

    await saveStudent(student.id, { events })
    await refetchStudents()

    setSaving(false)

    if (onSuccess) {
      onSuccess()
    }
  }

  const onDelete = async () => {
    setSaving(true)
    const events = student.events.filter(e => e.id !== event.id)

    await saveStudent(student.id, { events })
    await refetchStudents()

    setSaving(false)

    if (onSuccess) {
      onSuccess()
    }
  }

  const editableRows: EditableRowProps[] = [
    { title: 'Коментар', key: 'comment', value: editableEvent.comment },
    { title: 'Опис', key: 'description', value: editableEvent.description },
    { title: 'Оцінка', key: 'mark', value: editableEvent.mark },
  ]

  const textRows: TextRowProps[] = [
    {
      title: 'Дата початку',
      value: format(
        normalizeFirebaseDate(event.duration.startDate),
        'HH:mm:ss dd/MM/yyyy',
      ),
    },
    {
      title: 'Дата кінця',
      value: format(
        normalizeFirebaseDate(event.duration.endDate),
        'HH:mm:ss dd/MM/yyyy',
      ),
    },
  ]

  return (
    <Drawer
      title={STUDENT_EVENT_NAMES[event.type]}
      visible={visible}
      onClose={onCancel}
    >
      {editableRows.map(row => (
        <div style={{ marginBottom: 15 }}>
          <Text type="secondary">{row.title}</Text>
          <br />
          <Text
            editable={
              userStore.user?.role === 'ADMIN'
                ? {
                    onChange: text => onChangeRow(row.key, text),
                  }
                : undefined
            }
          >
            {row.value}
          </Text>
        </div>
      ))}

      {textRows.map(row => (
        <div style={{ marginBottom: 15 }}>
          <Text type="secondary">{row.title}</Text>
          <br />
          <Text>{row.value}</Text>
        </div>
      ))}

      {userStore.user?.role === 'ADMIN' && (
        <Button
          type="primary"
          style={{ marginRight: 15 }}
          disabled={JSON.stringify(event) === JSON.stringify(editableEvent)}
          loading={saving}
          onClick={onSave}
        >
          Зберегти
        </Button>
      )}
      {userStore.user?.role === 'ADMIN' && (
        <Button
          danger
          style={{ marginTop: 'auto' }}
          loading={saving}
          onClick={onDelete}
        >
          Видалити подію
        </Button>
      )}
    </Drawer>
  )
}

export default observer(StudentEventDrawer)
