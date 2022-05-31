import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Badge, Button, Card } from 'antd'
import { AddStudentEventModal, StudentEventDrawer } from 'components/Modals'
import { STUDENT_EVENT_NAMES } from 'constants/events'
import { isAfter } from 'date-fns'
import type { StudentEvent as StudentEventType } from 'Events'
import { useStudents } from 'hooks'
import { useMemo, useState } from 'react'
import { normalizeFirebaseDate } from 'tools/date'
import './styles.css'

interface StudentEventDefaultProps {
  mode?: 'default'
  event: StudentEventType
  studentId: string
}

interface StudentEventAddProps {
  mode: 'add'
  studentId: string
}

type TeacherEventProps = StudentEventDefaultProps | StudentEventAddProps

const StudentEvent = (props: TeacherEventProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [drawer, setDrawer] = useState<boolean>(false)

  const { data: students } = useStudents()

  const onClickAdd = () => {
    setModalVisible(true)
  }

  const onClickClose = () => {
    setModalVisible(false)
  }

  const onClickDrawer = () => {
    setDrawer(true)
  }

  const onCloseDrawer = () => {
    setDrawer(false)
  }

  const done = useMemo(() => {
    if (props.mode === 'add') {
      return false
    }

    return isAfter(
      new Date(),
      normalizeFirebaseDate(props.event.duration.endDate),
    )
  }, [JSON.stringify(props)])

  const student = useMemo(
    () => students.find(student => student.id === props.studentId),
    [props.studentId],
  )

  if (props.mode === 'add') {
    return (
      <div>
        <Button
          type="dashed"
          shape="round"
          icon={<UserAddOutlined />}
          size="large"
          onClick={onClickAdd}
        />

        <AddStudentEventModal
          visible={modalVisible}
          onCancel={onClickClose}
          onSuccess={onClickClose}
          studentId={props.studentId}
        />
      </div>
    )
  }

  return (
    <div style={{ marginRight: 25, marginBottom: 25 }}>
      <Badge
        count={
          !done ? (
            <ClockCircleOutlined style={{ color: '#f5222d' }} />
          ) : (
            <CheckCircleOutlined style={{ color: 'green' }} />
          )
        }
      >
        <Card
          title={STUDENT_EVENT_NAMES[props.event.type]}
          size="small"
          style={{ minWidth: 200, cursor: 'pointer' }}
          onClick={onClickDrawer}
        >
          {props.event.description}
        </Card>
      </Badge>

      {!!student && (
        <StudentEventDrawer
          visible={drawer}
          event={props.event}
          student={student}
          onCancel={onCloseDrawer}
          onSuccess={onCloseDrawer}
          index={0}
        />
      )}
    </div>
  )
}

export default StudentEvent
