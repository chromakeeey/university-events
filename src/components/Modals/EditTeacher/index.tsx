import { Button, Drawer, Typography } from 'antd'
import type { TextProps } from 'antd/lib/typography/Text'
import { saveStudent } from 'api/event'
import { deleteTeacher } from 'api/user'
import { useTeachers } from 'hooks'
import { observer } from 'mobx-react-lite'
import type { BaseModalProps } from 'Modals'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from 'stores'
import { Teacher } from 'Users'

const { Text } = Typography

export type TeacherFields = keyof Pick<
  Teacher,
  'name' | 'surname' | 'fathername'
>

export interface EditTeacherDrawerProps extends BaseModalProps {
  teacher: Teacher
}

interface EditableRowProps extends TextProps {
  title: string
  value: string
  key: TeacherFields
}

const EditTeacherDrawer = ({
  teacher,
  visible,
  onCancel,
  onSuccess,
}: EditTeacherDrawerProps) => {
  const { userStore } = useStore()

  const navigate = useNavigate()

  const { refetch: refetchTeachers } = useTeachers()

  const [editableTeacher, setEditableTeacher] = useState<
    Pick<Teacher, 'name' | 'surname' | 'fathername'>
  >({
    ...teacher,
  })
  const [saving, setSaving] = useState<boolean>(false)

  const onChangeRow = (key: TeacherFields, text: string) => {
    const ref = { ...editableTeacher }
    ref[key] = text

    setEditableTeacher(ref)
  }

  const onSave = async () => {
    setSaving(true)

    await saveStudent(teacher.id, { ...editableTeacher })
    await refetchTeachers()

    setSaving(false)

    if (onSuccess) {
      onSuccess()
    }
  }

  const onDelete = async () => {
    setSaving(true)
    // const events = student.events.filter(e => e.id !== event.id)

    await deleteTeacher(teacher.id)
    await refetchTeachers()

    navigate('/teachers')

    setSaving(false)

    if (onSuccess) {
      onSuccess()
    }
  }

  const editableRows: EditableRowProps[] = [
    { title: 'Імʼя', key: 'name', value: editableTeacher.name },
    {
      title: 'По-батькові',
      key: 'fathername',
      value: editableTeacher.fathername,
    },
    { title: 'Прізвище', key: 'surname', value: editableTeacher.surname },
  ]

  return (
    <Drawer visible={visible} onClose={onCancel}>
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

      {userStore.user?.role === 'ADMIN' && (
        <Button
          type="primary"
          style={{ marginRight: 15 }}
          disabled={JSON.stringify(event) === JSON.stringify(editableTeacher)}
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
          Видалити
        </Button>
      )}
    </Drawer>
  )
}

export default observer(EditTeacherDrawer)
