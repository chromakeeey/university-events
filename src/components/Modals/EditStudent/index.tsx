import { Button, Drawer, Typography } from 'antd'
import type { TextProps } from 'antd/lib/typography/Text'
import { saveStudent } from 'api/event'
import { deleteStudent } from 'api/user'
import { useStudents } from 'hooks'
import { observer } from 'mobx-react-lite'
import type { BaseModalProps } from 'Modals'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from 'stores'
import { Student } from 'Users'

const { Text } = Typography

export type StudentFields = keyof Pick<
  Student,
  'name' | 'surname' | 'fathername' | 'group'
>

export interface EditStudentDrawerProps extends BaseModalProps {
  student: Student
}

interface EditableRowProps extends TextProps {
  title: string
  value: string
  key: StudentFields
}

const EditStudentDrawer = ({
  student,
  visible,
  onCancel,
  onSuccess,
}: EditStudentDrawerProps) => {
  const { userStore } = useStore()

  const navigate = useNavigate()

  const { refetch: refetchStudents } = useStudents()

  const [editableStudent, setEditableStudent] = useState<
    Pick<Student, 'name' | 'surname' | 'fathername' | 'group'>
  >({
    ...student,
  })
  const [saving, setSaving] = useState<boolean>(false)

  const onChangeRow = (key: StudentFields, text: string) => {
    const ref = { ...editableStudent }
    ref[key] = text

    setEditableStudent(ref)
  }

  const onSave = async () => {
    setSaving(true)

    await saveStudent(student.id, { ...editableStudent })
    await refetchStudents()

    navigate('/students')

    setSaving(false)

    if (onSuccess) {
      onSuccess()
    }
  }

  const onDelete = async () => {
    setSaving(true)
    // const events = student.events.filter(e => e.id !== event.id)

    await deleteStudent(student.id)
    await refetchStudents()

    setSaving(false)

    if (onSuccess) {
      onSuccess()
    }
  }

  const editableRows: EditableRowProps[] = [
    { title: 'Імʼя', key: 'name', value: editableStudent.name },
    {
      title: 'По-батькові',
      key: 'fathername',
      value: editableStudent.fathername,
    },
    { title: 'Прізвище', key: 'surname', value: editableStudent.surname },
    { title: 'Група', key: 'group', value: editableStudent.group },
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
          disabled={JSON.stringify(event) === JSON.stringify(editableStudent)}
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

export default observer(EditStudentDrawer)
