import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Col, Row, Statistic, Typography } from 'antd'
import { isAfter } from 'date-fns'
import { StudentEvent, TeacherEvent } from 'Events'
import { useStudents, useTeachers } from 'hooks'
import { useMemo } from 'react'
import { normalizeFirebaseDate } from 'tools/date'
import './styles.css'

const { Title } = Typography

interface EventsStats {
  doneCount: number
  undoneCount: number
  studentsEvents: number
  teacherEvents: number
}

const HomePage = () => {
  const { data: teachers } = useTeachers()
  const { data: students } = useStudents()

  const eventsStats: EventsStats = useMemo(() => {
    const teacherEvents: TeacherEvent[] = []
    teachers.map(teacher => teacherEvents.push(...teacher.events))

    const studentEvents: StudentEvent[] = []
    students.map(student => studentEvents.push(...student.events))

    const counts = {
      done: 0,
      undone: 0,
    }

    teacherEvents.map(event => {
      const done = isAfter(
        new Date(),
        normalizeFirebaseDate(event.duration.endDate),
      )

      if (done) {
        counts.done += 1
      }

      if (!done) {
        counts.undone += 1
      }
    })

    studentEvents.map(event => {
      const done = isAfter(
        new Date(),
        normalizeFirebaseDate(event.duration.endDate),
      )

      if (done) {
        counts.done += 1
      }

      if (!done) {
        counts.undone += 1
      }
    })

    return {
      doneCount: counts.done,
      undoneCount: counts.undone,
      studentsEvents: studentEvents.length,
      teacherEvents: teacherEvents.length,
    }
  }, [
    JSON.stringify(teachers),
    JSON.stringify(students),
    students.length,
    teachers.length,
    students,
    teachers,
  ])

  return (
    <div className="home-page-main-container">
      <Title>Дашборд</Title>

      <Title level={5}>Викладачі і студенти</Title>
      <Row style={{ padding: 15, backgroundColor: 'white' }}>
        <Col span={3}>
          <Statistic title="Студентів" value={students.length} />
        </Col>
        <Col span={3}>
          <Statistic title="Викладачів" value={teachers.length} />
        </Col>
        <Col span={3}>
          <Statistic title="Всього" value={students.length + teachers.length} />
        </Col>
      </Row>

      <Title level={5} style={{ marginTop: 25 }}>
        Події
      </Title>
      <Row style={{ padding: 15, backgroundColor: 'white' }}>
        <Col span={3}>
          <Statistic
            title="Активні"
            value={eventsStats.undoneCount}
            valueStyle={{ color: '#f5222d' }}
            prefix={<ClockCircleOutlined style={{ color: '#f5222d' }} />}
          />
        </Col>
        <Col span={3}>
          <Statistic
            title="Закриті"
            value={eventsStats.doneCount}
            valueStyle={{ color: 'green' }}
            prefix={<CheckCircleOutlined style={{ color: 'green' }} />}
          />
        </Col>
        <Col span={3}>
          <Statistic
            title="Всього"
            value={eventsStats.doneCount + eventsStats.undoneCount}
          />
        </Col>
      </Row>
    </div>
  )
}

export default HomePage
