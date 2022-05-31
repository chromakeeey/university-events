import { Button, Input, Modal, Table, TableColumnsType } from 'antd'
import { updateUser } from 'api/admin'
import { useUsers } from 'hooks'
import { useMemo, useState } from 'react'
import { search as chromeSearch } from 'tools/search'
import type { Role, User } from 'Users'

const { Search } = Input

interface UsersTableProps {
  users: User[]
}

const TeachersTable = ({ users }: UsersTableProps) => {
  const [search, setSearch] = useState<string>('')

  const { refetch: refetchUsers } = useUsers()

  const onSearch = (text: string) => {
    setSearch(text)
  }

  const processUsers = useMemo(() => {
    if (!search.length) {
      return users
    }

    return users.filter(user =>
      chromeSearch(user.email.toLocaleLowerCase(), search.toLocaleLowerCase()),
    )
  }, [search, users, users.length, JSON.stringify(users)])

  const onChangeRole = (id: string, role: Role) => {
    if (role === 'ADMIN') {
      Modal.confirm({
        title: 'Роль',
        content: 'Ви дійсно хочете видати роль адміністратора?',
        okText: 'Так',
        cancelText: 'Ні',
        onOk: async () => {
          await updateUser(id, { role })
          await refetchUsers()
        },
      })

      return
    }

    Modal.confirm({
      title: 'Роль',
      content: 'Ви дійсно хочете забрати роль адміністратора?',
      okText: 'Так',
      cancelText: 'Ні',
      onOk: async () => {
        await updateUser(id, { role })
        await refetchUsers()
      },
    })
  }

  const tableColumns: TableColumnsType<User> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Пошта',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Адміністратор',
      key: 'role',
      render: (user: User) => {
        if (user.role === 'ADMIN') {
          return (
            <Button danger onClick={() => onChangeRole(user.id, 'DEFAULT')}>
              Забрати роль адміністратора
            </Button>
          )
        }

        return (
          <Button type="primary" onClick={() => onChangeRole(user.id, 'ADMIN')}>
            Видати роль адміністратора
          </Button>
        )
      },
    },
  ]

  return (
    <div>
      <Search style={{ width: '30%', marginBottom: 8 }} onSearch={onSearch} />

      <Table dataSource={processUsers} columns={tableColumns} />
    </div>
  )
}

export default TeachersTable
