import firebase from 'api'
import type { Student, Teacher } from 'Users'

const STUDENTS_KEY = 'students'

const TEACHERS_KEY = 'teachers'

export const saveStudent = async (id: string, student: Partial<Student>) => {
  const ref = await firebase.firestore().collection(STUDENTS_KEY).doc(id).get()

  if (ref.exists) {
    ref.ref.update({ ...student })
  }
}

export const saveTeacher = async (id: string, teacher: Partial<Teacher>) => {
  const ref = await firebase.firestore().collection(TEACHERS_KEY).doc(id).get()

  if (ref.exists) {
    ref.ref.update({ ...teacher })
  }
}
