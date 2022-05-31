import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { StudentsTable } from 'components'
import { AddStudentModal } from 'components/Modals'
import { useExcel, useStudents } from 'hooks'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import useStore from 'stores'
import { Student } from 'Users'
import './styles.css'

const { Title } = Typography

const StudentsPage = () => {
  const { data: students } = useStudents()

  const { userStore } = useStore()

  const [studentModal, setStudentModal] = useState<boolean>(false)

  const onClickAddStudent = () => {
    setStudentModal(true)
  }

  const onCloseStudentModal = () => {
    setStudentModal(false)
  }

  const { exportCSV } = useExcel()

  const onClickExport = () => {
    const bufferTeachers: Omit<Student, 'events' | 'type'>[] = []

    students.map(student => {
      const { type, ...rest } = student

      const complete = {
        id: rest.id,
        name: rest.name,
        fathername: rest.fathername,
        surname: rest.surname,
        group: rest.group,
        countEvents: `${rest.events.length}`,
      }

      bufferTeachers.push(complete)
    })

    exportCSV(bufferTeachers, 'Студенти', [
      'ІД',
      'Імʼя',
      'По-батькові',
      'Прізвище',
      'Номер групи',
      'Кількість подій',
    ])
  }

  return (
    <div className="students-page-container">
      <div className="teachers-page-header">
        <Title>Список студентів</Title>

        {userStore.user?.role === 'ADMIN' && (
          <Button
            className="teachers-page-header-button"
            type="default"
            shape="circle"
            icon={<PlusCircleOutlined />}
            onClick={onClickAddStudent}
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

      <StudentsTable students={students} />

      <AddStudentModal
        visible={studentModal}
        onCancel={onCloseStudentModal}
        onSuccess={onCloseStudentModal}
      />
    </div>
  )
}

export default observer(StudentsPage)
