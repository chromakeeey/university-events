import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Badge, Button, Card } from 'antd'
import { AddTeacherEventModal, TeacherEventDrawer } from 'components/Modals'
import { TEACHER_EVENT_NAMES } from 'constants/events'
import { isAfter } from 'date-fns'
import type { TeacherEvent as TeacherEventType } from 'Events'
import { useTeachers } from 'hooks'
import { useMemo, useState } from 'react'
import { normalizeFirebaseDate } from 'tools/date'
import './styles.css'

interface TeacherEventDefaultProps {
  mode?: 'default'
  event: TeacherEventType
  teacherId: string
  index: number
}

interface TeacherEventAddProps {
  mode: 'add'
  teacherId: string
}

type TeacherEventProps = TeacherEventDefaultProps | TeacherEventAddProps

const TeacherEvent = (props: TeacherEventProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [drawer, setDrawer] = useState<boolean>(false)

  const { data: teachers } = useTeachers()

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

  const teacher = useMemo(
    () => teachers.find(teacher => teacher.id === props.teacherId),
    [props.teacherId],
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

        <AddTeacherEventModal
          visible={modalVisible}
          onCancel={onClickClose}
          onSuccess={onClickClose}
          teacherId={props.teacherId}
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
          title={TEACHER_EVENT_NAMES[props.event.type]}
          size="small"
          style={{ minWidth: 200, cursor: 'pointer' }}
          onClick={onClickDrawer}
        >
          {props.event.description}
        </Card>
      </Badge>

      {!!teacher && (
        <TeacherEventDrawer
          visible={drawer}
          event={props.event}
          teacher={teacher}
          onCancel={onCloseDrawer}
          onSuccess={onCloseDrawer}
          index={props.index}
        />
      )}
    </div>
  )
}

export default TeacherEvent
