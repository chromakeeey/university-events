import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { TeachersTable } from 'components'
import { AddTeacherModal } from 'components/Modals'
import { useExcel, useTeachers } from 'hooks'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import useStore from 'stores'
import { Teacher } from 'Users'
import './styles.css'

const { Title } = Typography

const TeachersPage = () => {
  const { userStore } = useStore()

  const [teacherModal, setTeacherModal] = useState<boolean>(false)

  const onClickAddTeacher = () => {
    setTeacherModal(true)
  }

  const onCloseTeacherModal = () => {
    setTeacherModal(false)
  }

  const { data: teachers } = useTeachers()

  const { exportCSV } = useExcel()

  const onClickExport = () => {
    const bufferTeachers: Omit<Teacher, 'events' | 'type'>[] = []

    teachers.map(teacher => {
      const { type, ...rest } = teacher

      const complete = {
        id: rest.id,
        name: rest.name,
        fathername: rest.fathername,
        surname: rest.surname,
        countEvents: `${rest.events.length}`,
      }

      bufferTeachers.push(complete)
    })

    exportCSV(bufferTeachers, 'Викладачі', [
      'Ід',
      'Імʼя',
      'По-батькові',
      'Прізвище',
      'Кількість подій',
    ])
  }

  return (
    <div className="teachers-page-container">
      <div className="teachers-page-header">
        <Title>Список викладачів</Title>

        {userStore.user?.role === 'ADMIN' && (
          <Button
            className="teachers-page-header-button"
            type="default"
            shape="circle"
            icon={<PlusCircleOutlined />}
            onClick={onClickAddTeacher}
          />
        )}

        <Button
          onClick={onClickExport}
          style={{ marginLeft: 7 }}
          shape="round"
          type="ghost"
        >
          Export to Excel
        </Button>
      </div>

      <TeachersTable teachers={teachers} />

      <AddTeacherModal
        visible={teacherModal}
        onCancel={onCloseTeacherModal}
        onSuccess={onCloseTeacherModal}
      />
    </div>
  )
}

export default observer(TeachersPage)
