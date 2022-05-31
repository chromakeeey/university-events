import { EditOutlined } from '@ant-design/icons'
import { Button, PageHeader } from 'antd'
import { TeacherEvent } from 'components'
import { EditTeacherDrawer } from 'components/Modals'
import { TEACHER_EVENT_NAMES } from 'constants/events'
import { format } from 'date-fns'
import { useExcel, useTeachers } from 'hooks'
import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useStore from 'stores'
import { normalizeFirebaseDate } from 'tools/date'
import './styles.css'

const TeacherPage = () => {
  const navigate = useNavigate()

  const { userStore } = useStore()

  const { data: teachers } = useTeachers()
  const { id } = useParams()

  const { exportCSV } = useExcel()

  const [drawer, setDrawer] = useState<boolean>(false)

  const teacher = useMemo(
    () => teachers.find(teacher => teacher.id === id),
    [id, teachers, teachers.length, JSON.stringify(teachers)],
  )

  if (!teacher) {
    return null
  }

  const onClickExport = () => {
    const events = teacher.events.map(event => ({
      type: TEACHER_EVENT_NAMES[event.type],
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
    }))

    exportCSV(events, `${teacher.surname} ${teacher.name}`, [
      'Тип',
      'Дата початку',
      'Дата кінця',
      'Коментар',
      'Опис',
    ])
  }

  return (
    <div className="teacher-page-container">
      <div className="teacher-page-content-container">
        <PageHeader
          className="teacher-page-header"
          onBack={() => navigate(-1)}
          title="Викладач"
          subTitle={`${teacher.surname} ${teacher.name} ${teacher.fathername}`}
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
          {teacher.events.map((event, index) => (
            <TeacherEvent
              key={index}
              index={index}
              event={event}
              teacherId={teacher.id}
              mode="default"
            />
          ))}
        </div>

        {userStore.user?.role === 'ADMIN' && (
          <TeacherEvent mode="add" teacherId={teacher.id} />
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
          <EditTeacherDrawer
            teacher={teacher}
            visible={drawer}
            onCancel={() => setDrawer(false)}
            onSuccess={() => setDrawer(false)}
          />
        )}
      </div>
    </div>
  )
}

export default observer(TeacherPage)
