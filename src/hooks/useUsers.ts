import { getUsers } from 'api/admin'
import { useQuery } from 'react-query'
import type { User } from 'Users'

const key = '@users'

const useUsers = () => {
  const query = useQuery<User[]>(key, getUsers, {
    staleTime: Infinity,
  })

  return { ...query, data: query.data ?? [] }
}

export default useUsers
