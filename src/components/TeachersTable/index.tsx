import { Button, Input, Table, TableColumnsType, Tag } from 'antd'
import { TEACHER_EVENT_COLORS } from 'constants/colors'
import { TEACHER_EVENT_NAMES } from 'constants/events'
import type { TeacherEvent } from 'Events'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { search as chromeSearch } from 'tools/search'
import type { Teacher } from 'Users'

const { Search } = Input

interface TeachersTableProps {
  teachers: Teacher[]
}

const TeachersTable = ({ teachers }: TeachersTableProps) => {
  const navigate = useNavigate()

  const [search, setSearch] = useState<string>('')

  const onSearch = (text: string) => {
    setSearch(text)
  }

  const processTeachers = useMemo(() => {
    if (!search.length) {
      return teachers
    }

    return teachers.filter(teacher => {
      const name = `${teacher.fathername} ${teacher.name} ${teacher.fathername}`
      return chromeSearch(name.toLocaleLowerCase(), search.toLocaleLowerCase())
    })
  }, [search, teachers, teachers.length, JSON.stringify(teachers)])

  const tableColumns: TableColumnsType<Teacher> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Прізвище',
      dataIndex: 'surname',
      key: 'surname',
    },
    { title: 'Імʼя', dataIndex: 'name', key: 'name' },
    { title: 'По-батькові', dataIndex: 'fathername', key: 'fathername' },
    {
      title: 'Події',
      dataIndex: 'events',
      key: 'events',
      render: (events: TeacherEvent[]) =>
        events.map(event => (
          <Tag color={TEACHER_EVENT_COLORS[event.type]}>
            {TEACHER_EVENT_NAMES[event.type]}
          </Tag>
        )),
    },
    {
      title: 'Дії',
      dataIndex: 'id',
      key: 'actions',
      render: (id: string) => (
        <Button type="primary" onClick={() => navigate(`/teachers/${id}`)}>
          Детальніше
        </Button>
      ),
    },
  ]

  return (
    <div>
      <Search style={{ width: '30%', marginBottom: 8 }} onSearch={onSearch} />

      <Table dataSource={processTeachers} columns={tableColumns} />
    </div>
  )
}

export default TeachersTable
