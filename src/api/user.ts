import firebase from 'api'
import type { StudentEvent, TeacherEvent } from 'Events'
import type { Student, Teacher } from 'Users'

const STUDENTS_KEY = 'students'

const TEACHERS_KEY = 'teachers'

export const deleteStudent = async (id: string) => {
  await firebase.firestore().collection(STUDENTS_KEY).doc(id).delete()
}

export const deleteTeacher = async (id: string) => {
  await firebase.firestore().collection(TEACHERS_KEY).doc(id).delete()
}

export const getStudents = async (): Promise<Student[]> => {
  const ref = await firebase.firestore().collection(STUDENTS_KEY).get()

  return ref.docs.map(doc => doc.data() as Student)
}

export const getTeachers = async (): Promise<Teacher[]> => {
  const ref = await firebase.firestore().collection(TEACHERS_KEY).get()

  return ref.docs.map(doc => doc.data() as Teacher)
}

export const createStudent = async (
  student: Omit<Student, 'id' | 'events' | 'type'>,
) => {
  const ref = firebase.firestore().collection(STUDENTS_KEY).doc()

  await firebase
    .firestore()
    .collection(STUDENTS_KEY)
    .doc(ref.id)
    .set({ id: ref.id, ...student, events: [], type: 'STUDENT' } as Student)
}

export const createTeacher = async (
  student: Omit<Teacher, 'id' | 'events' | 'type'>,
) => {
  const ref = firebase.firestore().collection(TEACHERS_KEY).doc()

  await firebase
    .firestore()
    .collection(TEACHERS_KEY)
    .doc(ref.id)
    .set({ id: ref.id, ...student, events: [], type: 'TEACHER' } as Teacher)
}

export const createTeacherEvent = async (id: string, event: TeacherEvent) => {
  const ref = await firebase.firestore().collection(TEACHERS_KEY).doc(id).get()
  const teacher = ref.data() as Teacher | undefined

  if (teacher && ref.exists) {
    ref.ref.update({
      events: [...teacher.events, event],
    })
  }
}

export const createStudentEvent = async (id: string, event: StudentEvent) => {
  const ref = await firebase.firestore().collection(STUDENTS_KEY).doc(id).get()
  const teacher = ref.data() as Student | undefined

  if (teacher && ref.exists) {
    ref.ref.update({
      events: [...teacher.events, event],
    })
  }
}
