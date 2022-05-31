import { Button, Input, Table, TableColumnsType, Tag } from 'antd'
import { STUDENT_EVENT_COLORS } from 'constants/colors'
import { STUDENT_EVENT_NAMES } from 'constants/events'
import type { StudentEvent } from 'Events'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { search as chromeSearch } from 'tools/search'
import type { Student } from 'Users'

const { Search } = Input

interface StudentsTableProps {
  students: Student[]
}

const StudentsTable = ({ students }: StudentsTableProps) => {
  const navigate = useNavigate()

  const [search, setSearch] = useState<string>('')

  const onSearch = (text: string) => {
    setSearch(text)
  }

  const processStudents = useMemo(() => {
    if (!search.length) {
      return students
    }

    return students.filter(student => {
      const name = `${student.fathername} ${student.name} ${student.fathername}`
      return chromeSearch(name.toLocaleLowerCase(), search.toLocaleLowerCase())
    })
  }, [search, students, students.length, JSON.stringify(students)])

  const tableColumns: TableColumnsType<Student> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Прізвище', dataIndex: 'surname', key: 'surname' },
    { title: 'Імʼя', dataIndex: 'name', key: 'name' },
    { title: 'По-батькові', dataIndex: 'fathername', key: 'fathername' },
    { title: 'Номер групи', dataIndex: 'group', key: 'group' },
    {
      title: 'Події',
      dataIndex: 'events',
      key: 'events',
      render: (events: StudentEvent[]) =>
        events.map(event => (
          <Tag color={STUDENT_EVENT_COLORS[event.type]}>
            {STUDENT_EVENT_NAMES[event.type]}
          </Tag>
        )),
    },
    {
      title: 'Дії',
      dataIndex: 'id',
      key: 'actions',
      render: (id: string) => (
        <Button type="primary" onClick={() => navigate(`/students/${id}`)}>
          Детальніше
        </Button>
      ),
    },
  ]

  return (
    <div>
      <Search style={{ width: '30%', marginBottom: 8 }} onSearch={onSearch} />

      <Table dataSource={processStudents} columns={tableColumns} />
    </div>
  )
}

export default StudentsTable
