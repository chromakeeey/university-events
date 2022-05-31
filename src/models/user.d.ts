declare module 'Users' {
  import type { StudentEvent, TeacherEvent } from 'Events'

  type Role = 'ADMIN' | 'DEFAULT'

  interface BaseUser {
    id: string
    name: string
    fathername: string
    surname: string
  }

  interface Student extends BaseUser {
    type: 'STUDENT'
    group: string
    events: StudentEvent[]
  }

  interface Teacher extends BaseUser {
    type: 'TEACHER'
    events: TeacherEvent[]
  }

  interface User {
    id: string
    email: string
    role: Role
  }
}
