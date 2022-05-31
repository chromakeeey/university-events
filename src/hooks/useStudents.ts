import { getStudents } from 'api/user'
import { useQuery } from 'react-query'
import type { Student } from 'Users'

const key = '@students'

const useStudents = () => {
  const query = useQuery<Student[]>(key, getStudents, {
    staleTime: Infinity,
  })

  return { ...query, data: query.data ?? [] }
}

export default useStudents
