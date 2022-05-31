import type { StudentEventType, TeacherEventType } from 'Events'

export const TEACHER_EVENT_NAMES: Record<TeacherEventType, string> = {
  SCIENCE_POSTS: 'Наукометричні публікації',
  TRAINEE_OR_QUALIFIER_HIGHER: 'Стажування, підвищення кваліфікації',
  CONFERENCES_OR_APPROBATION: 'Конференції, апробації',
  STUDENT_CONTEST_OR_OLYMPIAD: 'Студентські конкурси, олімпіади',
  SCHOOLBOY_CONTEST_OR_OLYMPIAD: 'Учнівські конкурси, олімпіади',
  METHODICAL_DEVELOPMENT: 'Методичні розробки',
  BOOKS: 'Підручники',
  DEFENSE_OR_SCIENCE_LEADERSHIP: 'Захисти, наукове керівництво',
  PARTICIPATION_ON_COUNCILS: 'Опонування, участь у радаї',
  MANAGMENT_PROJECTS_AND_ETC:
    'Керування проектом, участь у грантах, член редколегії',
  PARTICIPATION_ON_EXPERT_COMMISIONS: 'Членство в експертних комісіях',
  SCIENFIC_CONSULTING: 'Наукове консультування',
  TEACHING_OTHER_LANGUAGE: 'Викладання іноземною мовою',
  PARTICIPATION_ON_PEOPLE_AND_PROFF_ASSOCIATIONS:
    'Членство в професійних та громадських обʼєднаннях',
}

export const STUDENT_EVENT_NAMES: Record<StudentEventType, string> = {
  SCIENCE: 'Наукова',
  SPORT: 'Спортивна',
  CULTURE: 'Культурна',
  PUBLIC: 'Громадська',
}
