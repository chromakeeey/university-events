import { getTeachers } from 'api/user'
import { useQuery } from 'react-query'
import type { Teacher } from 'Users'

const key = '@teachers'

const useTeachers = () => {
  const query = useQuery<Teacher[]>(key, getTeachers, {
    staleTime: Infinity,
  })

  return { ...query, data: query.data ?? [] }
}

export default useTeachers
