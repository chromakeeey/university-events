import { EditOutlined } from '@ant-design/icons'
import { Button, PageHeader } from 'antd'
import { StudentEvent } from 'components'
import { EditStudentDrawer } from 'components/Modals'
import { STUDENT_EVENT_NAMES } from 'constants/events'
import { format } from 'date-fns'
import { useExcel, useStudents } from 'hooks'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useStores from 'stores'
import { normalizeFirebaseDate } from 'tools/date'
import './styles.css'

const StudentPage = () => {
  const navigate = useNavigate()

  const { userStore } = useStores()

  const { data: students } = useStudents()
  const { id } = useParams()

  const { exportCSV } = useExcel()

  const [drawer, setDrawer] = useState<boolean>(false)

  const student = useMemo(
    () => students.find(student => student.id === id),
    [id, students, students.length, JSON.stringify(students)],
  )

  if (!student) {
    return null
  }

  const onClickExport = () => {
    const events = student.events.map(event => ({
      type: STUDENT_EVENT_NAMES[event.type],
      startedAt: format(
        normalizeFirebaseDate(event.duration.startDate),
        'HH:mm:ss dd/MM/yyyy',
      ),
      endAt: format(
        normalizeFirebaseDate(event.duration.endDate),
        'HH:mm:ss dd/MM/yyyy',
      ),
      comment: event.comment,
      description: event.description,
      mark: event.mark,
    }))

    exportCSV(events, `${student.surname} ${student.name}`, [
      'Тип',
      'Дата початку',
      'Дата кінця',
      'Коментар',
      'Опис',
      'Оцінка',
    ])
  }

  return (
    <div className="teacher-page-container">
      <div className="teacher-page-content-container">
        <PageHeader
          className="teacher-page-header"
          onBack={() => navigate(-1)}
          title="Студент"
          subTitle={`${student.surname} ${student.name} ${student.fathername}`}
          extra={
            userStore.user?.role === 'ADMIN'
              ? [
                  <Button
                    type="dashed"
                    shape="round"
                    icon={<EditOutlined />}
                    size="large"
                    onClick={() => setDrawer(true)}
                  />,
                ]
              : undefined
          }
        />

        <div className="teacher-page-events-container">
          {student.events.map((event, index) => (
            <StudentEvent
              key={index}
              event={event}
              studentId={student.id}
              mode="default"
            />
          ))}
        </div>

        {userStore.user?.role === 'ADMIN' && (
          <StudentEvent mode="add" studentId={student.id} />
        )}

        <Button
          onClick={onClickExport}
          style={{ marginLeft: 'auto' }}
          shape="round"
          type="ghost"
        >
          Export to Excel
        </Button>

        {userStore.user?.role === 'ADMIN' && (
          <EditStudentDrawer
            student={student}
            visible={drawer}
            onCancel={() => setDrawer(false)}
            onSuccess={() => setDrawer(false)}
          />
        )}
      </div>
    </div>
  )
}

export default StudentPage
